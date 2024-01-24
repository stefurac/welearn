// Action Types
export const ADD_USER = 'ADD_USER'
export const ADD_COURSE = 'ADD_COURSE'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_COURSE = 'UPDATE_COURSE'
export const DELETE_USER = 'DELETE_USER'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DELETE_COURSE = 'DELETE_COURSE'

// Actions
export const addUser = (user) => ({
	type: ADD_USER,
	payload: user
})

export const addCourse = course => ({
	type: ADD_COURSE,
	payload: course
})

export const updateUser = (updatedUser) => ({
	type: UPDATE_USER,
	payload: updatedUser
})

export const updateCourse = (updatedCourse) => ({
	type: UPDATE_COURSE,
	payload: updatedCourse
})

export const deleteUser = id => ({
    type: DELETE_USER,
    payload: id
})

export const deleteCourse = id => ({
    type: DELETE_COURSE,
    payload: id
})

export const deleteComment = (userID, courseID) => ({
    type: DELETE_COMMENT,
    payload: {
        userID: userID,
        courseID: courseID
    }
})
