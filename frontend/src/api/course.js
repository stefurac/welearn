import axios from 'axios'
import { BASE_URL } from '.'

// Translates course section between section object(frontend) and section document(database)
function _mapCourseMaterial(course, func) {
    if (!course.sections) {
        return course
    }

    const clone = JSON.parse(JSON.stringify(course))
    clone.sections = clone.sections.map(section => {
        section.courseMaterials = section.courseMaterials.map(materials => {
            if (materials.type === 'text') {
                materials.content = func(materials.content)
            }
            return materials
        })
        return section
    })
    return clone
}

// Helper for _mapCourseMaterial, stringifies section document(database)
function _stringifyRichText(course) {
    return _mapCourseMaterial(course, JSON.stringify)
}
// Helper for _mapCourseMaterial, parses section object(frontend)
function _parseRichText(course) {
    const clone = _mapCourseMaterial(course, JSON.parse)
    if (!clone.sections) {
        return clone
    }

    clone.sections = clone.sections.map(section => {
        section.courseMaterials = section.courseMaterials.map(material => ({ ...material, id: material._id }))
        return { ...section, id: section._id }
    })
    return clone
}

//Gets all courses; param: the course is published (publishedOnly=false for admin only)
function getAllCourses({ publishedOnly }) {
    const params = {}
    if (publishedOnly) {
        params.publishedOnly = true
    }
    return axios.get(BASE_URL + '/api/courses', { params })
        .then(result => result.data.courses)
        .catch(error => console.log(error))
}

// Gets course heads (excluding sections) by id
function getCoursesHeadsById(id) {
    return axios.get(BASE_URL + '/api/courses/' + id, {
        params: {
            populateSections: false
        }
    })
        .then(result => result.data)
        .catch(error => console.log(error))
}

// Gets full course by id
function getCoursesById(id) {
    return axios.get(BASE_URL + '/api/courses/' + id, {
        params: {
            populateSections: true
        }
    })
        .then(result => _parseRichText(result.data))
        .catch(error => console.log(error))
}

// Create course document in database
function createCourse(course) {
    const formattedCourse = _stringifyRichText(course)
    return axios.post(BASE_URL + '/api/courses', formattedCourse)
        .then(result => result.data)
        .catch(error => console.log(error))
}

// Update course document in database
function updateCourse(id, course) {
    const formattedCourse = _stringifyRichText(course)
    return axios.patch(BASE_URL + '/api/courses/' + id, formattedCourse)
        .then(result => result.data)
        .catch(error => console.log(error))
}

// Delete course document in database
function deleteCourse(id) {
    return axios.delete(BASE_URL + '/api/courses/' + id)
        .then(result => result.data)
        .catch(error => console.log(error))
}

// Create a course comment in course
function addComment(comment) {
    return axios.post(BASE_URL + '/api/review-course', comment)
        .then(result => result.data)
        .catch(error => { return { message: error } })
}

// Delete a course comment from course
function deleteComment(comment) {
    return axios.delete(BASE_URL + '/api/delete-course-review', { data: comment })
        .then(result => result.data)
        .catch(error => { return { message: error } })
}
const CourseApi = {
    addComment,
    deleteComment,
    getAllCourses,
    getCoursesHeadsById,
    getCoursesById,
    createCourse,
    updateCourse,
    deleteCourse,
    getCoursesHeadsById
}

export default CourseApi