const express = require('express');
const router = express.Router();
const log = console.log

// Middleware and Helpers
const { handleMongoError } = require('./helpers/errorHandling')
const { updateFields, currentDate } = require('./helpers/utils')

// Mongo and Mongoose
const { ObjectID } = require('mongodb')
const { CourseProgress } = require('../models/courseProgress');
const { StudyRecord } = require('../models/studyRecord');
const { Course } = require('../models/course');

async function upsertStudyRecord(userId, courseId, studyTimeMinsIncrement) {
    const date = currentDate()
    const studyRecord = await StudyRecord.findOne({ userId, courseId, date })

    // If no record exists, create one
    if (!studyRecord) {
        const newStudyRecord = new StudyRecord({
            userId,
            courseId,
            date: new Date(),
            studyTimeMins: studyTimeMinsIncrement,
        })
        await newStudyRecord.save()
    }
    // Otherwise update it
    else {
        studyRecord.studyTimeMins += studyTimeMinsIncrement
        await studyRecord.save()
    }
}

// Update collective study time of course
async function updateCourseCollectiveStudyTime(courseId, studyTimeMinsIncrement) {
    const course = await Course.findById(courseId)
    course.collectiveStudyTime += studyTimeMinsIncrement
    await course.save()
}

router.get('/course-progress/:userId/:courseId', async (req, res) => {
    const { userId, courseId } = req.params

    // Make sure a valid course ID was given
    if (!ObjectID.isValid(userId) || !ObjectID.isValid(courseId)) {
        log('Bad user or course ID')
        res.status(400).send('Bad Request')
        return
    }

    // Make sure session user matched
    if (req.user._id.toString() !== userId) {
        log('Forbidden')
        res.status(403).send('Request Forbidden')
        return
    }

    try {
        // Lookup course progress for the session user
        const courseProgress = await CourseProgress.findOne({ userId, courseId })
        if (!courseProgress) {
            res.send({ noRecord: true })
        } else {
            res.send(courseProgress)
        }
    } catch (error) {
        if (!handleMongoError(error, res)) {
            console.log(error)
            res.status(500).send('Internal Server Error')
        }
    }
})

//Update course progress
router.post('/course-progress/:userId/:courseId', async (req, res) => {
    const { userId, courseId } = req.params

    // Make sure a valid course ID was given
    if (!ObjectID.isValid(userId) || !ObjectID.isValid(courseId)) {
        log('Bad user or course ID')
        res.status(400).send('Bad Request')
        return
    }

    // Make sure session user matched
    if (req.user._id.toString() !== userId) {
        log('Forbidden')
        res.status(403).send('Request Forbidden')
        return
    }

    try {
        // Lookup course progress for the session user
        const courseProgress = await CourseProgress.findOne({ userId, courseId })

        // No record exists, so make one
        if (!courseProgress) {
            const newCourseProgress = new CourseProgress({
                userId,
                courseId,
                lastUsed: req.body.lastUsed || Date.now().toLocaleDateString(),
                lastUsedSectionId: req.body.lastUsedSectionId,
                studyTimeMins: req.body.studyTimeMins || 0,
                progress: req.body.progress || 0,
                sectionProgress: req.body.sectionProgress || [],
            })
            newCourseProgress.save()
            await upsertStudyRecord(userId, courseId, newCourseProgress.studyTimeMins)
            await updateCourseCollectiveStudyTime(courseId, newCourseProgress.studyTimeMins)
            res.send(newCourseProgress)
        }
        // Record found, update it
        else {
            const prevStudyTimeMins = courseProgress.studyTimeMins
            courseProgress.lastUsed = req.body.lastUsed || Date.now().toLocaleDateString()
            updateFields(courseProgress, req.body, [
                'lastUsedSectionId',
                'studyTimeMins',
                'progress',
                'sectionProgress',
            ])
            courseProgress.studyTimeMins = Math.max(0, courseProgress.studyTimeMins)
            courseProgress.progress = Math.max(0, Math.min(courseProgress.progress, 100))
            courseProgress.save()
            await upsertStudyRecord(userId, courseId, courseProgress.studyTimeMins - prevStudyTimeMins)
            await updateCourseCollectiveStudyTime(courseId, courseProgress.studyTimeMins - prevStudyTimeMins)
            res.send(courseProgress)
        }
    } catch (error) {
        if (!handleMongoError(error, res)) {
            console.log(error)
            res.status(500).send('Internal Server Error')
        }
    }
})

module.exports = router