const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const USER_STARTING_BALANCE = 100
const USER_DEFAULT_BIO = "Tell us about yourself."
const USER_DEFAULT_PROFILE_PICTURE = "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"

//User schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    boughtCourses: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }],
        default: [],
    },
    wishlistedCourses: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }],
        default: [],
    },
    balance: {
        type: Number,
        default: USER_STARTING_BALANCE,
    },
    bio: {
        type: String,
        default: USER_DEFAULT_BIO,
    },
    profilePicture: {
        type: String,
        default: USER_DEFAULT_PROFILE_PICTURE,
    }
});

// Reference: express_authentication lecture code
UserSchema.pre('save', function (next) {
    const user = this

    // ensure we don't hash password more than once
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

// Hide certain fields
const hiddenFields = ['password', '_id']
UserSchema.methods.toJSON = function () {
    const userJson = this.toObject()
    userJson.id = userJson._id
    hiddenFields.forEach(field => delete userJson[field])
    return userJson
}

const User = mongoose.model('User', UserSchema);


module.exports = { User };
