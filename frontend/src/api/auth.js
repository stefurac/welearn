import axios from 'axios'
import { BASE_URL } from '.'
import store from '../store'

//Return  default placeholder for login
function getLoginVerification() {
    return [
        {
            label: "Username:",
            name: "username",
            type: "text",
            placeholder: "Username"
        },
        {
            label: "Password:",
            name: "password",
            type: "password",
            placeholder: "Password"
        }
    ]
};

//Return  default placeholder for signup
function getSignupVerification() {
    return [
        {
            label: "First Name:",
            name: "firstName",
            type: "text",
            placeholder: "First Name"
        },
        {
            label: "Last Name:",
            name: "lastName",
            type: "text",
            placeholder: "Last Name"
        }, {
            label: "Username:",
            name: "username",
            type: "text",
            placeholder: "Username"
        },
        {
            label: "Password:",
            name: "password",
            type: "password",
            placeholder: "Password"
        }, {
            label: "Confirm Password:",
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password"
        },
        {
            label: "Email:",
            name: "email",
            type: "text",
            placeholder: "Email"
        }, {
            label: "Birthdate:",
            name: "dob",
            type: "date",
            placeholder: "yyyy-MM-dd"
        },
    ]
};

//Authenticate with credential
function authenticate(credentials) {
    const uninterceptedAxiosInstance = axios.create();
    return uninterceptedAxiosInstance.post(BASE_URL + '/api/auth/login', credentials)
        .then(result => ({
            success: true,
            user: result.data,
        }))
        .catch(error => {
            switch (error.response.status) {
                case 400: return { message: 'You have an empty field.' }
                case 401: return { message: 'Your username or password is incorrect.' }
                default: return { message: 'Something went wrong, please try again.' }
            }
        })
}
// check if username exists
function checkUsernameExists(username) {
    return axios.get(`${BASE_URL}/api/auth/username-exists/${username}`)
        .then(res => res.data.exists)
        .catch(error => {
            console.log("checkUsernameExists error:", error)
            return true
        })
}
// Log out of session
function logout() {
    return axios.post(BASE_URL + '/api/auth/logout')
}

const VerificationApi = {
    getSignupVerification,
    getLoginVerification,
    authenticate,
    checkUsernameExists,
    logout,
};

export default VerificationApi;