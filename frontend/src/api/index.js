/**
 * A convenient collection of all APIs exported together as a single object
 */
import axios from 'axios'
import UserApi from './user'
import CourseApi from './course'
import CreatorApi from './creator'
import MainApi from './main'
import AuthApi from './auth'
import DevToolsApi from './devTools'
import { errorToast } from '../utils'

// Configure API base URL based on environment
export const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://peaceful-mesa-23508.herokuapp.com'
    : 'http://localhost:8000'

// Axios global config
axios.defaults.withCredentials = true
axios.defaults.timeout = 5 * 1000
axios.interceptors.response.use(undefined, error => {
    if (error.response.status === 401 && error.response.data === 'Expired Session') {
        window.location.href = '/login?expired'
    }
    else if (error.response.status === 401) {
        window.location.href = '/login-prompt'
    }
    else if (error.response.status === 403) {
        errorToast("You do not have permission to do that")
    }
    else {
        errorToast("Oops, something went wrong, please try again")
    }
    return Promise.reject(error)
})

const Api = {
    User: UserApi,
    Course: CourseApi,
    Creator: CreatorApi,
    Auth: AuthApi,
    Main: MainApi,
    DevTools: DevToolsApi,
}
export default Api