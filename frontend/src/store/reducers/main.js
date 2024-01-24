import {
    ADD_USER,
    ADD_COURSE,
    UPDATE_USER,
    UPDATE_COURSE,
    DELETE_USER,
    DELETE_COURSE
} from "../actions";

const initialState = {
    users: [],
    courses: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER: {
            const users = state.users
            const user = action.payload
            let clonedArray = JSON.parse(JSON.stringify(users))
            clonedArray.push(user);
            return {
                ...state,
                users: clonedArray
            }
        }
        case ADD_COURSE: {
            const courses = state.courses
            const course = action.payload
            let clonedArray = JSON.parse(JSON.stringify(courses))
            clonedArray.push(course);
            return {
                ...state,
                courses: clonedArray
            }
        }
        case UPDATE_USER: {
            const updated = action.payload
            const users = state.users
            const index = users.findIndex((el) => el.id == updated.id)
            let clonedArray = JSON.parse(JSON.stringify(users))
            clonedArray[index] = updated
            return {
                ...state,
                users: clonedArray
            }
        }
        case UPDATE_COURSE: {
            const updatedCourse = action.payload
            const courses = state.courses
            const index = courses.findIndex((el) => el.id == updatedCourse.id)
            let clonedArray = JSON.parse(JSON.stringify(courses))
            clonedArray[index] = updatedCourse
            return {
                ...state,
                courses: clonedArray

            }
        }
        case DELETE_USER: {
            const id = action.payload
            const filtered = state.users.filter((el) => { return el.id != id; });
            return {
                ...state,
                users: filtered
            }
        }
        case DELETE_COURSE: {
            const id = action.payload
            const filtered = state.courses.filter((el) => { return el.id != id; });
            return {
                ...state,
                courses: filtered
            }
        }

        default:
            return state;
    }
}
