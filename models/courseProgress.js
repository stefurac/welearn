const mongoose = require('mongoose')

//Course progress schema
const CourseProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    lastUsedSectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseSection',
    },
    lastUsed: {
        type: String,
        default: 'N/A',
    },
    studyTimeMins: {
        type: Number,
        default: 0,
    },
    progress: {
        type: Number,
        default: 0,
    },
    sectionProgress: {
        type: [
            new mongoose.Schema({
                sectionId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'CourseSection',
                },
                completed: {
                    type: Boolean,
                },
            })
        ],
        default: [],
    }
})

const CourseProgress = mongoose.model('CourseProgress', CourseProgressSchema)

module.exports = {
    CourseProgress
}