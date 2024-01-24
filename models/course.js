const mongoose = require('mongoose');

const COURSE_MATERIAL_TYPES = ['text', 'image', 'video']
const COURSE_DEFAULT_IMAGE = 'https://t4.ftcdn.net/jpg/02/07/87/79/360_F_207877921_BtG6ZKAVvtLyc5GWpBNEIlIxsffTtWkv.jpg'

//Course schema
const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        default: 'New Course'
    },
    image: {
        type: String,
        default: COURSE_DEFAULT_IMAGE
    },
    description: {
        type: String,
        default: ''
    },
    learningObjective: {
        type: String,
        default: ''
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    author: {
        type: String,
        required: true
    },
    lastModified: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true,
        default: 1
    },
    numStudents: {
        type: Number,
        required: true,
        default: 0
    },
    collectiveRevenue: {
        type: Number,
        required: true,
        default: 0
    },
    collectiveStudyTime: {
        type: Number,
        required: true,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: false,
        required: true
    },
    sections: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CourseSection'
        }],
        default: [],
    },
    reviews: {
        type: [Object],
        default: [],
    },

    /*
    Everytime this course receives a new user rating, we re-calculate the course's average rating using 
    the following formula:

    [(averageRating * numOfRatings) + newRating ] / [numOfRatings + 1]
    
    */
    averageRating: {
        type: Number,
        default: 0
    },
    numOfRatings: {
        type: Number,
        default: 0
    },
});

//Section schema
const CourseSectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    courseMaterials: {
        type: [
            new mongoose.Schema({
                type: {
                    type: String,
                    enum: COURSE_MATERIAL_TYPES,
                    required: true,
                },
                content: {
                    type: String,
                    required: true,
                }
            })
        ],
        default: [],
    }
});


const Course = mongoose.model('Course', CourseSchema);
const CourseSection = mongoose.model('CourseSection', CourseSectionSchema);

module.exports = {
    Course,
    CourseSection,
};
