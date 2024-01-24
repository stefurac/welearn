import {
    SET_USER_WISHLIST,
    ADD_COURSE_TO_USER_WISHLIST,
    LOGIN,
    LOGOUT,
    UPDATE_ACTIVE_COURSE_PROGRESS,
    SET_ACTIVE_COURSE_SECTION_INDEX,
    SET_ACTIVE_COURSE_DATA,
    UPDATE_CURRENT_USER,
    UPDATE_DASHBOARD_DATA,
} from "../actions";

const initialState = {
    user: {},
    activeSectionIndex: 0,
    activeCourseData: {
        sections: [],
    },
    activeCourseProgress: {
        sectionProgress: []
    },
    dashboardData: {
        allCourses: [],
        recentCourses: [],
        wishlistCourses: [],
    },
    signupErrorMessage: ""
};
export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CURRENT_USER: {
            let tempUser = action.payload;
            return {
                ...state,
                user: {
                    ...state.user,
                    ...tempUser
                }
            }
        }
        case SET_USER_WISHLIST: {
            let tempUser = state.user;
            tempUser.wishlist = action.payload
            return {
                ...state,
                user: tempUser
            }
        }
        case ADD_COURSE_TO_USER_WISHLIST: {
            let tempUser = state.user;
            tempUser.wishlist.push(action.payload)
            return {
                ...state,
                user: tempUser
            }
        }
        case LOGIN: {
            return {
                ...state,
                user: action.payload
            }
        }
        case LOGOUT: {
            return {
                ...state,
                user: {}
            }
        }
        case SET_ACTIVE_COURSE_DATA: {
            return {
                ...state,
                activeCourseData: action.payload
            }
        }
        case SET_ACTIVE_COURSE_SECTION_INDEX: {
            let newIndex = action.payload
            const numSections = state.activeCourseData.sections.length
            if (newIndex >= numSections) newIndex = numSections - 1
            if (newIndex < 0) newIndex = 0
            return {
                ...state,
                activeSectionIndex: newIndex
            }
        }
        case UPDATE_ACTIVE_COURSE_PROGRESS: {
            return {
                ...state,
                activeCourseProgress: {
                    ...state.activeCourseProgress,
                    ...action.payload
                }
            }
        }
        case UPDATE_DASHBOARD_DATA: {
            return {
                ...state,
                dashboardData: {
                    ...action.payload
                }
            }
        }
        default:
            return state;
    }
}
