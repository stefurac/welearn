const express = require('express');
const router = express.Router();
const log = console.log

// Middleware and Helpers
const { handleMongoError } = require('./helpers/errorHandling')
const { authenticate } = require('./helpers/authentication')
const { updateFields, canUserModifyCourse, canUserReadCourse } = require('./helpers/utils')

// Mongo and Mongoose
const { ObjectID } = require('mongodb')
const { mongoose } = require('../database/mongoose');
const { Course, CourseSection } = require('../models/course')

/*
Reference: CSC309 Week 8 lecture sample code.
*/

// Get all courses
router.get('/courses', async (req, res) => {
    const publishedOnly = req.query.publishedOnly === 'true'

    try {
        let courses = []
        if (publishedOnly) {
            courses = await Course.find({ isPublished: true });
        }
        else {
            courses = await Course.find();
        }
        res.send({ courses });
    } catch (error) {
        log(error);
        res.status(500).send("Internal server error");
    }
});


// Get all courses by owner ID
router.get('/courses/owner/:ownerId', async (req, res) => {
    const ownerId = req.params.ownerId;

    try {
        const courses = await Course.find({ ownerId });
        res.send({ courses });
    } catch (error) {
        log(error);
        res.status(500).send("Internal server error");
    }
});


// Get course by ID
router.get('/courses/:id', authenticate, async (req, res) => {
    const id = req.params.id;
    const populateSections = req.query.populateSections === 'true'

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    try {
        let courseQuery = Course.findById(id);
        if (populateSections) courseQuery = courseQuery.populate('sections')
        const course = await courseQuery

        if (!course) {
            res.status(404).send(`course with ID=${id} not found.`);
        } else {
            // Make sure the user can access the course if they want to read the sections
            if (populateSections && !canUserReadCourse(req.user, course)) {
                log('Forbidden')
                res.status(403).send('Request Forbidden')
                return
            }

            res.send(course);
        }
    } catch (error) {
        log(error);
        res.status(500).send('Internal server error');
    }
});


// Create new course
router.post('/courses', authenticate, async (req, res) => {
    const course = new Course({
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        learningObjective: req.body.learningObjective,
        cost: req.body.cost,
        // Backend calculated fields
        ownerId: req.user._id,
        author: `${req.user.firstName} ${req.user.lastName}`,
        lastModified: (new Date()).toLocaleString('en-US'),
    });

    if (req.body.sections) {
        try {
            const sections = await Promise.all(
                req.body.sections.map(({ title, courseMaterials }) =>
                    new CourseSection({ title, courseMaterials }).save()))
            course.sections = sections.map(section => section._id)
        } catch (err) {
            console.log(err);
            res.status(400).send('Bad request');
            return
        }
    }

    try {
        const addNewCourseResult = await course.save();
        res.status(200).send(addNewCourseResult);
    } catch (error) {
        log(error);
        res.status(400).send('Bad request');
    }
});

// Modify course by ID

// Can just grab the course, copy current obj, replace it then put it back in
router.patch('/courses/:id', authenticate, async (req, res) => {
    const id = req.params.id
    const { sections } = req.body;

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
        return;
    }

    // Handle when CourseSections are being updated
    if (sections) {
        try {
            // Load the course object
            const course = await Course.findById(id).populate('sections')

            // Make sure course is found
            if (!course) {
                res.status(404).send(`course with ID=${id} not found.`);
                return
            }

            // Make sure user can modify course
            if (!canUserModifyCourse(req.user, course)) {
                log('Forbidden')
                res.status(403).send('Request Forbidden')
                return
            }

            // Update it's sections
            const updatedSections = await Promise.all(
                sections.map(section => CourseSection.findOneAndUpdate(
                    { _id: section._id || new mongoose.mongo.ObjectID() },
                    {
                        title: section.title,
                        courseMaterials: section.courseMaterials,
                    },
                    {
                        new: true,
                        upsert: true,
                        useFindAndModify: false,
                    })))
            const updatedSectionIds = updatedSections.map(section => section._id)

            // Delete any removed sections from DB
            const updatedSectionIdMap = Object.fromEntries(updatedSectionIds.map(id => [id.toString(), true]))
            course.sections.forEach(section => {
                const sectionId = section._id.toString()
                if (!updatedSectionIdMap[sectionId]) {
                    section.remove()
                }
            })

            // Update courses list of section IDs
            course.sections = updatedSectionIds
            await course.save()
        } catch (error) {
            log(error)
            res.status(400).send('Bad Request')
            return
        }
    }

    try {
        const course = await Course.findById(id)

        if (!course) {
            res.status(404).send('Resource not found')
        } else {
            // Make sure user can modify course
            if (!canUserModifyCourse(req.user, course)) {
                log('Forbidden')
                res.status(403).send('Request Forbidden')
                return
            }

            // Update fields and save
            updateFields(course, req.body, [
                'title', 'image', 'description', 'learningObjective', 'cost', 'isPublished'
            ])
            course.lastModified = (new Date()).toLocaleString('en-US')
            await course.save()

            // send updated course
            res.send(course)
        }
    } catch (error) {
        if (!handleMongoError(error)) {
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
});


// Delete course by ID
router.delete('/courses/:id', authenticate, async (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send(`course with ID=${id} not found.`);
        return;
    }

    try {
        const course = await Course.findById(id)

        // Make sure course exists
        if (!course) {
            res.status(404).send();
            return
        }

        // Make sure user can modify course
        if (!canUserModifyCourse(req.user, course)) {
            log('Forbidden')
            res.status(403).send('Request Forbidden')
            return
        }

        // Delete course
        const deletedCourse = await Course.findByIdAndRemove(id);

        // Send result
        res.send(deletedCourse);
    } catch (error) {
        log(error)
        res.status(500).send() // server error, could not delete.
    }

});

module.exports = router;