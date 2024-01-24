const express = require('express')
const router = express.Router()
const log = console.log

// Middleware and Helpers
const { comparePasswordAsync } = require('./helpers/authentication')
const { mongoConnectionCheck, handleMongoError } = require('./helpers/errorHandling')

// Mongo and Mongoose
const { User } = require('../models/user')

// Login, creating a new session
router.post('/auth/login', mongoConnectionCheck, async (req, res) => {
    try {
        // Ensure required fields are passed in
        const { username, password } = req.body
        if (!username || !password) {
            res.status(400).send('Bad Request')
            return
        }

        // Load in user by username
        const user = await User.findOne({ username })
        if (!user) {
            res.status(401).send('Unauthorized')
            return
        }

        // Compare passwords
        const isPasswordCorrect = await comparePasswordAsync(password, user.password)
        if (!isPasswordCorrect) {
            res.status(401).send('Unauthorized')
            return
        }

        // The user was successfully authenticated, return the user model
        req.session.user = user._id
        res.send(user)
    } catch (error) {
        if (!handleMongoError(error)) {
            log(error)
            res.status(401).send('Bad request')
        }
    }
})

// Logout, destroy session
router.post('/auth/logout', async (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.send("Success")
        }
    })
})

router.get('/auth/username-exists/:username', async (req, res) => {  
    const username = req.params.username;
    try {
        const user = await User.findOne({username});
        if (user) {
            res.send({exists:true})
        } else {
            res.send({exists:false})
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});


module.exports = router