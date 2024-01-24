const mongoose = require('mongoose')

//Study schema
const StudyRecordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    studyTimeMins: {
        type: Number,
        required: true,
    }
})

StudyRecordSchema.pre('save', function (next) {
    const record = this
    // ensure date object has no time associated with it
    if (record.isModified('date')) {
        record.date.setHours(0, 0, 0, 0)
        next()
    } else {
        next()
    }
})

const StudyRecord = mongoose.model('StudyRecord', StudyRecordSchema)

module.exports = { StudyRecord }