
/**
 * A collection of functions which make API calls that deal with the user.
 */
import axios from 'axios'
import { BASE_URL } from '.';
import store from '../store';
import MainApi from './main';

//Get all users (admin function)
function getAllUser() {
    return axios.get(BASE_URL + '/api/users')
        .then(result => result.data.users)
        .catch(error => console.log(error))
}
// Delete user by id
function deleteUser(id) {
    return axios.delete(BASE_URL + '/api/users/' + id)
        .then(result => result.data)
        .catch(error => console.log(error))
}

//Generate empty study progress of course
const generateEmptyCourseProgress = (userId, courseId) => ({
    userId,
    courseId,
    lastUsedSectionId: undefined,
    lastUsed: undefined,
    progress: 0,
    studyTimeMins: 0,
    sectionProgress: []
})

//Get study progress of course
function getCourseProgress(userId, courseId) {
    return axios.get(BASE_URL + `/api/course-progress/${userId}/${courseId}`)
        .then(result => result.data.noRecord ? generateEmptyCourseProgress(userId, courseId) : result.data)
        .catch(error => console.log(error))
}

//Save study progress of course
function saveCourseProgress(courseProgress) {
    const { userId, courseId } = courseProgress
    return axios.post(`${BASE_URL}/api/course-progress/${userId}/${courseId}`, courseProgress)
        .then(res => res.data)
}

// Get array of courses by id
const getArrayCourses = (idArray) => {
    if (!idArray) {
        return []
    }
    return idArray.map((id) => MainApi.getCourse(id))
}

/**
 * Get the user's recently used courses.
 */
function getRecentCourses() {
    const owned = store.getState().user.user.boughtCourses;
    const courses = getArrayCourses(owned)
    const sorted = courses.sort((a, b) => b.date - a.date)
    return sorted.slice(0, 2);
}

/**
 * Get all courses owned by the user.
 */
function getAllCourses() {
    return axios.get(BASE_URL + '/api/users/session', {
        params: {
            populateCourses: true
        }
    })
        .then(result => result.data.boughtCourses)
        .catch(error => console.log(error))
}

/**
 * Get the user's activity over the past 26 weeks.
 */
function getActivity() {
    return axios.get(`${BASE_URL}/api/study-record/user/heatmap`)
        .then(res => res.data.map(entry => ({ ...entry, date: new Date(entry.date), isFuture: false })))
}

/**
 * Get all courses on the user's wishlist
 */
function getWishlistCourses() {
    return axios.get(BASE_URL + '/api/users/session', {
        params: {
            populateCourses: true
        }
    })
        .then(result => result.data.wishlistedCourses)
        .catch(error => console.log(error))
}

function getUser() {
    return store.getState().user.user
}

/**
 * Get the user's statistics which are displayed on their dashboard
 */
function getDashboardStatistics() {
    return axios.get(`${BASE_URL}/api/study-record/user/summary`)
        .then(res => res.data)
}

//Get user session
function getSessionUser() {
    return axios.get(`${BASE_URL}/api/users/session`)
        .then(result => {
            return result.data
        })
        .catch(error => {
            console.log(error)
        })
}

function getSessionUserNoInterceptor() {
    const uninterceptedAxiosInstance = axios.create();
    return uninterceptedAxiosInstance.get(`${BASE_URL}/api/users/session`)
        .then(result => {
            return result.data
        })
}

function signup(user) {
    return axios.post(`${BASE_URL}/api/users`, user)
        .then(res => res.data)
        .catch(error => {
            console.log(error)
            return undefined
        })
}

function updateUser(user) {
    return axios.patch(`${BASE_URL}/api/users/${user.id}`, user)
        .then(res => res.data)
        .catch(error => {
            console.log("PATCHING")
            console.log(error)
        })
}

const UserApi = {
    signup,
    updateUser,
    getAllUser,
    deleteUser,
    getSessionUser,
    getSessionUserNoInterceptor,
    getRecentCourses,
    getAllCourses,
    getActivity,
    getWishlistCourses,
    getDashboardStatistics,
    getUser,
    getCourseProgress,
    saveCourseProgress,
}

export default UserApi
