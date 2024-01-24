const express = require('express');
const router = express.Router();
const log = console.log;

// Middleware and Helpers
const { authenticate } = require('./helpers/authentication')
const { handleMongoError } = require('./helpers/errorHandling')
const { updateFields } = require('./helpers/utils')

// Mongo and Mongoose
const { ObjectID } = require('mongodb')
const { mongoose } = require('../database/mongoose');
const { User } = require('../models/user')

/*
Reference: CSC309 Week 8 lecture sample code.
*/

// Get all users
router.get('/users', authenticate, async (req, res) => {
    // Ensure user is an admin
    if (!req.user.isAdmin) {
        log('Forbidden')
        res.status(403).send('Forbidden: You must be an admin to use this request')
        return
    }

    try {
        const users = await User.find();
        res.send({ users });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

// Get the user who owns the current session
router.get('/users/session', authenticate, async (req, res) => {
    const populateCourses = req.query.populateCourses === 'true'

    // Send the shallow user object
    if (!populateCourses) {
        res.send(req.user)
    }
    // Otherwise need to rehydrate courses, so re-query user
    else {
        try {
            const user = await User.findById(req.user._id)
                .populate('boughtCourses')
                .populate('wishlistedCourses')
                .populate('createdCourses')
            res.send(user);
        } catch (err) {
            log(err);
            res.status(500).send('Internal server error');
        }
    }
})

// Get User by ID
router.get('/users/:id', authenticate, async (req, res) => {
    const id = req.params.id;

    // Ensure user is an admin, or that they are looking up their own account
    if (!req.user.isAdmin && req.user._id.toString() !== id) {
        log('Forbidden')
        res.status(403).send('Forbidden: You must be an admin to use this request')
        return
    }

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    try {
        const user = await User.findById(id);

        if (!user) {
            res.status(404).send(`User with ID=${id} not found.`);
        } else {
            res.send(user);
        }
    } catch (err) {
        log(err);
        res.status(500).send('Internal server error');
    }
});

// Create new user
// Note: This route is not protected by auth
router.post('/users', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        email: req.body.email,
    });

    try {
        const addNewUserResult = await user.save();
        res.status(200).send(addNewUserResult);
    } catch (err) {
        if (!handleMongoError(err)) {
            console.log(err);
            res.status(400).send('Bad request');
        }
    }
});

// Give a user admin permissions. Only admins can make other admins.
router.post('/users/promote-to-admin/:id', authenticate, async (req, res) => {
    const id = req.params.id

    // Make sure request was made by an admin - only admins can make other admins.
    if (!req.user.isAdmin) {
        log('Forbidden')
        res.status(403).send('Forbidden: You must be an admin to use this request')
        return
    }

    try {
        const user = await User.findById(id)
        if (!user) {
            res.status(404).send('User not found')
        } else {
            user.isAdmin = true
            await user.save()
            res.send(user)
        }
    } catch (error) {
        if (!handleMongoError(error)) {
            log(error);
            res.status(400).send('Bad request');
        }
    }
})

// Modify User by ID
router.patch('/users/:id', authenticate, async (req, res) => {
    const id = req.params.id

    // Ensure user is an admin, or that they are patching their own account
    if (!req.user.isAdmin && req.user._id.toString() !== id) {
        log('Forbidden')
        res.status(403).send('Forbidden: You must be an admin to use this request')
        return
    }

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
        return;
    }

    try {
        const user = await User.findById(id)
        if (!user) {
            res.status(404).send('Resource not found')
        } else {
            updateFields(user, req.body, ['firstName', 'lastName', 'profilePicture', 'bio',])
            await user.save()
            res.send(user)
        }
    } catch (error) {
        if (!handleMongoError(error)) {
            console.log(error);
            res.status(400).send('Bad request');
        }
    }
});


// Delete User by ID
router.delete('/users/:id', authenticate, async (req, res) => {
    const id = req.params.id;

    // Ensure user is an admin, or that they are patching their own account
    if (!req.user.isAdmin && req.user._id.toString() !== id) {
        log('Forbidden')
        res.status(403).send('Forbidden: You must be an admin to use this request')
        return
    }

    if (!ObjectID.isValid(id)) {
        res.status(404).send(`User with ID=${id} not found.`);
        return;
    }

    try {
        const user = await User.findByIdAndRemove(id);
        if (!user) {
            res.status(404).send();
        } else {
            res.send(user);
        }
    } catch (error) {
        log(error)
        res.status(500).send() // server error, could not delete.
    }

});

module.exports = router;
