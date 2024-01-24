const { User } = require('../../models/user')
const bcrypt = require('bcryptjs')

// Compare a raw text password with it's hash asynchronously
const comparePasswordAsync = (raw, hash) =>
    new Promise((resolve, reject) => {
        bcrypt.compare(raw, hash, (err, res) => {
            err ? reject(err) : resolve(res)
        })
    })

// Reference: express_authentication lecture code
// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    const userId = req.session.user
    if (userId) {
        User.findById(userId).then(user => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch(() => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Expired Session")
    }
}

module.exports = {
    comparePasswordAsync,
    authenticate,
}