const express = require('express');
const router = express.Router();
const log = console.log

// Middleware and Helpers
const { v4: uuidv4 } = require('uuid');
const { currentDate, canUserReadCourse } = require('./helpers/utils');

// Mongo and Mongoose
const { ObjectID } = require('mongodb')
const { User } = require('../models/user');
const { Course } = require('../models/course');
const { Ledger } = require('../models/ledger');

// Percentage of how much the owner of a course when it is bought
const EARNINGS_RATE = 0.2

// Records the transaction in a ledger in database
async function addTransactionToLedger(userId, points) {
    const ledgerEntry = new Ledger({
        userId,
        points,
        date: currentDate()
    })
    await ledgerEntry.save()
}

// Wishlist a course
router.post('/toggle-wishlist-course', async (req, res) => {
    const { courseId } = req.body;

    if (!ObjectID.isValid(courseId)) {
        res.status(404).send('Course not found.');
        return;
    }

    try {
        const course = await Course.findById(courseId);

        // Make sure that course is found
        if (!course) {
            res.status(404).send(`Course not found.`);
            return
        }
        // Make sure user doesn't already own the course
        const boughtCoursesMap = Object.fromEntries(req.user.boughtCourses.map(id => [id.toString(), true]))
        if (boughtCoursesMap[courseId]) {
            res.send({ success: false, message: 'You already purchased this course' })
            return
        }

        // If user has already wishlisted, then remove it from wishlist. Otherwise add it
        const wishlistedCoursesMap = Object.fromEntries(req.user.wishlistedCourses.map(id => [id.toString(), true]))
        if (wishlistedCoursesMap[courseId]) {
            req.user.wishlistedCourses = req.user.wishlistedCourses.filter(id => id.toString() !== courseId)
        } else {
            req.user.wishlistedCourses.push(courseId)
        }
        await req.user.save()

        res.send({
            success: true,
            user: req.user,
        })
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
})

// Purchasing a course
router.post('/purchase-course', async (req, res) => {
    const { courseId } = req.body;

    if (!ObjectID.isValid(courseId)) {
        res.status(404).send('Course not found.');
        return;
    }

    try {
        const course = await Course.findById(courseId);

        // Make sure that course is found
        if (!course) {
            res.status(404).send(`Course not found.`);
            return
        }
        // Make sure user can afford the course
        if (req.user.balance < course.cost) {
            res.send({ success: false, message: 'You do not have enough points' })
            return
        }
        // Make sure user doesn't already own the course
        const boughtCoursesMap = Object.fromEntries(req.user.boughtCourses.map(id => [id.toString(), true]))
        if (boughtCoursesMap[courseId]) {
            res.send({ success: false, message: 'You already purchased this course' })
            return
        }

        // Handle finances
        const owner = await User.findById(course.ownerId);
        if (owner) {
            const earnings = Math.ceil(course.cost * EARNINGS_RATE)
            addTransactionToLedger(owner._id, earnings)
            owner.balance += earnings
            course.collectiveRevenue += earnings
            await owner.save()
        }
        addTransactionToLedger(req.user._id, -course.cost)
        req.user.balance -= course.cost

        // Add course to user
        req.user.boughtCourses.push(courseId)
        req.user.wishlistedCourses = req.user.wishlistedCourses.filter(id => id.toString() !== courseId)
        course.numStudents += 1

        await req.user.save()
        await course.save()

        res.send({
            success: true,
            user: req.user,
        })
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});


// Review (post comment) a course
router.post('/review-course', async (req, res) => {
    let courseId = req.body.courseId;
    let userId = req.body.userId;
    let comment = req.body.comment;
    let username = req.body.username;
    let rating = req.body.rating;

    if (!courseId || !userId || !comment || !username) {
        res.status(400).send(`courseId, userId, username and comment must be present.`);
        return;
    }

    try {
        const user = await User.findById(userId);
        const course = await Course.findById(courseId);

        if (!user) {
            res.status(404).send(`User not found.`);
        } else if (!course) {
            res.status(404).send(`Course not found.`);
        } else {
            // Makes sure user is who they say they are
            if (req.user._id.toString() !== userId) {
                log('Forbidden')
                res.status(403).send('Request Forbidden')
                return
            }

            // Only allow reviews if user owns course
            if (!canUserReadCourse(req.user, course)) {
                res.send({
                    success: false,
                    message: 'You cannot review a course you do not own'
                })
                return
            }

            let userHasCommented = false;

            // Check if user already commented on the course
            course.reviews.forEach(review => {
                if (review.userID === userId)
                    userHasCommented = true;
            });

            if (userHasCommented === true) {
                res.send({
                    success: false,
                    message: 'You have already reviewed this course'
                })
            } else {//user had not commented on this course previously

                let courseReviewsClone = [...course.reviews];
                courseReviewsClone.push({
                    id: uuidv4(),
                    userID: userId,
                    username: username,
                    rating: rating,
                    comment: comment
                })

                //update course with new review
                const updatedCourse = await Course.updateOne({ _id: courseId },
                    {
                        $set: { reviews: courseReviewsClone } // Append userId and comment to the course.reviews
                    },
                    {
                        new: true,
                        useFindAndModify: false
                    })

                //send errors
                if (!updatedCourse) {
                    res.status(404).send('Error occured while trying to comment on this course.');
                } else {
                    res.status(200).send({
                        courseId: courseId,
                        userId: userId,
                        username: username,
                        comment: comment
                    })
                }
            }
        }

    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});


// Delete a course review
router.delete('/delete-course-review', async (req, res) => {
    let { userId, courseId } = req.body
    if (!courseId || !userId) {
        res.status(404).send(`courseId, userId, username and comment must be present.`);
        return;
    }

    try {
        const user = await User.findById(userId);
        const course = await Course.findById(courseId);

        if (!user) {
            res.status(404).send(`User not found.`);
        } else if (!course) {
            res.status(404).send(`Course not found.`);
        } else {
            // Makes sure user is who they say they are, or is an Admin
            if (!req.user.isAdmin && req.user._id.toString() !== userId) {
                log('Forbidden')
                res.status(403).send('Request Forbidden')
                return
            }

            let userHasCommented = false;
            let commentToBeDeleted = null;

            // Check if user commented on the course
            course.reviews.forEach(review => {
                if (review.userID === userId) {
                    userHasCommented = true;
                    commentToBeDeleted = review;
                }
            });

            if (userHasCommented === true) {
                let courseReviewsClone = [...course.reviews];

                // Find the user review and delete it
                let index = courseReviewsClone.indexOf(commentToBeDeleted);
                courseReviewsClone.splice(index, 1);

                // Update the database
                const updatedCourse = await Course.updateOne({ _id: courseId },
                    {
                        $set: { reviews: courseReviewsClone }
                    },
                    {
                        new: true,
                        useFindAndModify: false
                    })

                if (!updatedCourse) {
                    res.status(404).send('Error occured while trying to comment on this course.');
                } else {
                    res.status(200).send({
                        courseId: courseId,
                        userId: userId,
                    })
                }
            } else {
                res.status(400).send(`The user has not commented on this course yet.`);
            }
        }

    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});


// Rate a course out of 5 stars.
router.post('/rate-course', async (req, res) => {
    let courseId = req.body.courseId;
    let userId = req.body.userId;
    let rating = req.body.rating;

    if (!courseId || !userId) {
        res.status(404).send(`courseId, userId and rating must be present.`);
        return;
    }

    if (rating < 0 || rating > 5) {
        res.status(404).send(`rating must be between 0 and 5.`);
        return;
    }

    try {
        const user = await User.findById(userId);
        const course = await Course.findById(courseId);

        if (!user) {
            res.status(404).send(`User not found.`);
        } else if (!course) {
            res.status(404).send(`Course not found.`);
        } else {
            // Makes sure user is who they say they are
            if (req.user._id.toString() !== userId) {
                log('Forbidden')
                res.status(403).send('Request Forbidden')
                return
            }

            // Only allow rateing if user owns course
            if (!canUserReadCourse(req.user, course)) {
                res.send({
                    success: false,
                    message: 'You cannot rate a course you do not own'
                })
                return
            }

            let updatedAverageRating = course.averageRating;
            let updatedNumOfRatings = course.numOfRatings + 1;

            // Re-calculate the average rating
            updatedAverageRating = ((course.averageRating * course.numOfRatings) + rating) / (course.numOfRatings + 1);

            const updatedCourse = await Course.updateOne({ _id: courseId },
                {
                    $set:
                    {
                        averageRating: updatedAverageRating,
                        numOfRatings: updatedNumOfRatings
                    }
                },
                {
                    new: true,
                    useFindAndModify: false
                })

            if (!updatedCourse) {
                res.status(404).send('Error occured while trying to rate this course.');
            } else {
                res.status(200).send({
                    courseId: courseId,
                    userId: userId,
                    rating: rating,
                    success: true
                })
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});


module.exports = router;