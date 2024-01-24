import store from '../store'
import axios from 'axios'
import { BASE_URL } from '.'

// Wishlist/unwishilist a course by user
function toggleWishlistCourse(courseId) {
    return axios.post(`${BASE_URL}/api/toggle-wishlist-course`, {
        courseId
    })
        .then(res => res.data)
        .catch(error => console.log(error))
}

// Rates a course by user
function rateCourse(courseId, userId, rating) {
    const rateObject = {
        courseId: courseId,
        userId: userId,
        rating: rating
    }
    return axios.post(`${BASE_URL}/api/rate-course`, rateObject)
        .then(res => res.data)
        .catch(error => console.log(error))
}

//Purchase a course by user
function purchaseCourse(courseId) {
    return axios.post(`${BASE_URL}/api/purchase-course`, {
        courseId
    })
        .then(res => res.data)
        .catch(error => console.log(error))
}

// Get course by id
function getCourse(id) {
    return axios.get(`${BASE_URL}/api/courses/${id}`, {
        params: {
            populateSections: true,
        }
    })
        .then(res => res.data)
}

const MainApi = {
    toggleWishlistCourse,
    rateCourse,
    purchaseCourse,
    getCourse,
}
export default MainApi