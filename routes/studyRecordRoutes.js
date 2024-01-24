const express = require('express')
const router = express.Router()
const log = console.log

// Middleware and Helpers
const { handleMongoError } = require('./helpers/errorHandling')
const { currentDate, formatMins } = require('./helpers/utils')

// Mongo and Mongoose
const { ObjectID } = require('mongodb')
const { StudyRecord } = require('../models/studyRecord')
const { Course } = require('../models/course')
const { Ledger } = require('../models/ledger')

//Get heatmap
router.get('/study-record/user/heatmap', async (req, res) => {
    const numWeeks = 26
    const dayOfWeekOffset = currentDate().getDay()
    const numEntries = numWeeks * 7 - (6 - dayOfWeekOffset)
    const firstDate = currentDate(); firstDate.setDate(firstDate.getDate() - (numEntries - 1))

    let queryResult;
    try {
        queryResult = await StudyRecord.aggregate([
            {
                $match: {
                    'userId': req.user._id,
                    'date': {
                        '$gte': firstDate,
                    }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
                    date: { $first: '$date' },
                    studyTimeMins: { $sum: '$studyTimeMins' },
                }
            },
            {
                $sort: { date: 1 }
            }
        ])
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: 'StudyRecord aggregate error' });
    }
    var queryIndex = 0
    const activity = Array(numEntries).fill()
        .map((_, i) => {
            const d = currentDate()
            d.setDate(d.getDate() - (numEntries - i - 1))

            if (queryIndex < queryResult.length && queryResult[queryIndex].date.getTime() === d.getTime()) {
                const { studyTimeMins } = queryResult[queryIndex]
                queryIndex += 1
                return {
                    date: d,
                    isFuture: false,
                    studyTime: Math.ceil((studyTimeMins / 60) * 100) / 100,
                }
            }
            return { studyTime: 0, date: d, isFuture: false }
        })

    res.send(activity)
})

// Get summary of user activity
router.get('/study-record/user/summary', async (req, res) => {
    // Calculate lifetime study time
    let lifetimeQueryResult;
    try {
        lifetimeQueryResult = await StudyRecord.aggregate([
            {
                $match: {
                    'userId': req.user._id
                }
            },
            {
                $group: {
                    _id: null,
                    lifetimeStudyMins: { $sum: '$studyTimeMins' },
                }
            }
        ])
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: 'StudyRecord aggregate error' });
    }

    const lifetimeStudyTimeMins = (lifetimeQueryResult[0] && lifetimeQueryResult[0].lifetimeStudyMins) || 0

    // Calculate weekly study time
    const sunday = currentDate()
    sunday.setDate(sunday.getDate() - sunday.getDay())
    let weeklyQueryResult;
    try {
        weeklyQueryResult = await StudyRecord.aggregate([
            {
                $match: {
                    'userId': req.user._id,
                    'date': {
                        '$gte': sunday,
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    weeklyStudyMins: { $sum: '$studyTimeMins' },
                }
            }
        ])
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: 'StudyRecord aggregate error' });
    }

    const weeklyStudyTimeMins = (weeklyQueryResult[0] && weeklyQueryResult[0].weeklyStudyMins) || 0

    // Format dates and send    
    res.send({
        lifetimeStudyTime: formatMins(lifetimeStudyTimeMins),
        weeklyStudyTime: formatMins(weeklyStudyTimeMins),
    })
})

//get creator statistics
router.get('/study-record/creator-statistics', async (req, res) => {
    const numEntries = 30
    const dateFormat = { month: 'short', day: 'numeric' }
    const firstDate = currentDate(); firstDate.setDate(firstDate.getDate() - (numEntries - 1))

    let ownedCourses, dailyQueryResult;
    try {
        ownedCourses = await Course.find({ ownerId: req.user._id });
        dailyQueryResult = await StudyRecord.aggregate([
            {
                $match: {
                    'courseId': {
                        $in: ownedCourses.map(course => ObjectID(course._id))
                    },
                    'date': {
                        '$gte': firstDate,
                    }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
                    date: { $first: '$date' },
                    studyTimeMins: { $sum: '$studyTimeMins' },
                }
            },
            {
                $sort: { date: 1 }
            }
        ])
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ error: 'StudyRecord aggregate error' });
    }
    let queryIndex = 0
    const collectiveStudyTime = Array(numEntries).fill()
        .map((_, i) => {
            const d = currentDate()
            d.setDate(d.getDate() - (numEntries - i - 1))

            if (queryIndex < dailyQueryResult.length && dailyQueryResult[queryIndex].date.getTime() === d.getTime()) {
                const { studyTimeMins } = dailyQueryResult[queryIndex]
                queryIndex += 1
                return Math.ceil(studyTimeMins * 100) / 100
            }
            return 0
        })

    const revenueQuery = await Ledger.aggregate([
        {
            $match: {
                'userId': req.user._id,
                'points': {
                    '$gt': 0,
                },
                'date': {
                    '$gte': firstDate,
                }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
                date: { $first: '$date' },
                newUsers: { $sum: 1 },
                revenue: { $sum: '$points' },
            }
        },
        {
            $sort: { date: 1 }
        }
    ])
    queryIndex = 0
    const newStudents = []
    const pointsRevenue = Array(numEntries).fill()
        .map((_, i) => {
            const d = currentDate()
            d.setDate(d.getDate() - (numEntries - i - 1))

            if (queryIndex < revenueQuery.length && revenueQuery[queryIndex].date.getTime() === d.getTime()) {
                const { revenue, newUsers } = revenueQuery[queryIndex]
                queryIndex += 1
                newStudents.push(newUsers)
                return revenue
            }
            newStudents.push(0)
            return 0
        })

    res.send({
        timeSeries: new Array(numEntries).fill().map((_, i) => {
            const d = currentDate()
            d.setDate(d.getDate() - (numEntries - i - 1))
            return d.toLocaleDateString('en-US', dateFormat)
        }),
        collectiveStudyTime,
        newStudents,
        pointsRevenue,
    })
})

module.exports = router