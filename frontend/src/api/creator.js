/**
 * A collection of functions which make API calls that deal with the creator functionality.
 */
import axios from 'axios'
import { BASE_URL } from '.'

/**
 * Get all courses that the user has created
 */
function getCreatedCourses(userId) {
    return axios.get(`${BASE_URL}/api/courses/owner/${userId}`)
        .then(result => result.data.courses)
        .catch(error => console.log(error))
}

/**
 * Get the user's recent analytics data for their created courses.
 */
function getAnalytics() {
    return axios.get(`${BASE_URL}/api/study-record/creator-statistics`)
        .then(res => res.data)
        .catch(error => console.log(error))
}

const CreatorApi = {
    getCreatedCourses,
    getAnalytics
}

export default CreatorApi