// Action Types
export const FETCH_USER_WISHLIST_ASYNC = 'FETCH_USER_WISHLIST_ASYNC'
export const SET_USER_WISHLIST = 'SET_WISHLIST'
export const ADD_COURSE_TO_USER_WISHLIST = 'ADD_COURSE_TO_USER_WISHLIST'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER'
export const SET_ACTIVE_COURSE_DATA = 'SET_ACTIVE_COURSE_DATA'
export const SET_ACTIVE_COURSE_SECTION_INDEX = 'SET_ACTIVE_COURSE_SECTION_INDEX'
export const UPDATE_ACTIVE_COURSE_PROGRESS = 'UPDATE_ACTIVE_COURSE_PROGRESS'
export const FETCH_ACTIVE_COURSE_DATA_ASYNC = 'FETCH_ACTIVE_COURSE_DATA_ASYNC'
export const SAVE_COURSE_PROGRESS_ASYNC = 'SAVE_COURSE_PROGRESS_ASYNC'
export const SET_SECTION_COMPLETED_ASYNC = 'SET_SECTION_COMPLETED_ASYNC'
export const INCREMENT_STUDY_TIME_MINS_ASYNC = 'INCREMENT_STUDY_TIME_MINS_ASYNC'
export const FETCH_DASHBOARD_DATA_ASYNC = 'FETCH_DASHBOARD_DATA_ASYNC'
export const UPDATE_DASHBOARD_DATA = 'UPDATE_DASHBOARD_DATA'

// Sagas
export const fetchUserWishlistAsync = userID => ({
	type: FETCH_USER_WISHLIST_ASYNC,
	payload: userID
})

export const fetchActiveCourseDataAsync = (courseId, history) => ({
	type: FETCH_ACTIVE_COURSE_DATA_ASYNC,
	payload: {
		courseId,
		history,
	}
})

export const fetchDashboardDataAsync = () => ({
	type: FETCH_DASHBOARD_DATA_ASYNC,
})

export const saveCourseProgressAsync = courseProgress => ({
	type: SAVE_COURSE_PROGRESS_ASYNC,
	payload: courseProgress
})

export const setSectionCompletedAsync = (sectionId, completed) => ({
	type: SET_SECTION_COMPLETED_ASYNC,
	payload: {
		sectionId,
		completed
	}
})

export const incrementStudyTimeMinsAsync = incrementMins => ({
	type: INCREMENT_STUDY_TIME_MINS_ASYNC,
	payload: incrementMins
})

// Actions
export const setUserWishlist = wishlist => ({
	type: SET_USER_WISHLIST,
	payload: wishlist
})

export const addCourseToUserWishlist = course => ({
	type: ADD_COURSE_TO_USER_WISHLIST,
	payload: course
})

export const login = user => ({
	type: LOGIN,
	payload: user
})

export const logout = id => ({
	type: LOGOUT,
	payload: id
})

export const updateCurrentUser = (updatedUser) => ({
	type: UPDATE_CURRENT_USER,
	payload: updatedUser
})

export const setActiveCourseData = activeCourseData => ({
	type: SET_ACTIVE_COURSE_DATA,
	payload: activeCourseData
})

export const setActiveCourseSectionIndex = index => ({
	type: SET_ACTIVE_COURSE_SECTION_INDEX,
	payload: index
})

export const updateActiveCourseProgress = courseProgress => ({
	type: UPDATE_ACTIVE_COURSE_PROGRESS,
	payload: courseProgress,
})

export const updateDashboardData = dashboardData => ({
	type: UPDATE_DASHBOARD_DATA,
	payload: dashboardData,
})