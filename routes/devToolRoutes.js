const express = require('express')
const router = express.Router()
const log = console.log

// Middleware and Helpers

// Mongo and Mongoose
const { Course, CourseSection } = require('../models/course')

// Create new course
router.post('/dev-tools/upload-course', async (req, res) => {
    const course = new Course({
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        learningObjective: req.body.learningObjective,
        ownerId: req.body.ownerId,
        author: req.body.author,
        lastModified: req.body.lastModified,
        cost: req.body.cost,
        numStudents: 0,
        collectiveStudyTime: 0,
        isPublished: true,
        sections: [],
        reviews: [],
    });

    //Save sections individually
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

module.exports = router