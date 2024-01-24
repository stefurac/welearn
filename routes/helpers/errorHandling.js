const mongoose = require('mongoose')
const log = console.log

// Reference: express_authentication lecture code
// middleware for mongo connection error for routes that need it
const mongoConnectionCheck = (req, res, next) => {
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
    } else {
        next()
    }
}
//Handle mongo errors
const handleMongoError = (error, res) => {
    if (typeof error === 'object' && error !== null && error.name === "MongoNetworkError") {
        log(error)
        res.status(500).send("Internal Server Error")
        return true
    }
    return false
}

module.exports = {
    mongoConnectionCheck,
    handleMongoError,
}