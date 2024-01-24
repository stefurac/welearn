import { put, call, all, takeLatest, select, takeEvery } from 'redux-saga/effects'
import {
    FETCH_USER_WISHLIST_ASYNC,
    FETCH_ACTIVE_COURSE_DATA_ASYNC,
    SAVE_COURSE_PROGRESS_ASYNC,
    SET_SECTION_COMPLETED_ASYNC,
    FETCH_DASHBOARD_DATA_ASYNC,
    INCREMENT_STUDY_TIME_MINS_ASYNC,
    setUserWishlist,
    setActiveCourseData,
    updateActiveCourseProgress,
    updateDashboardData,
    setActiveCourseSectionIndex,
    saveCourseProgressAsync as saveCourseProgressAsyncAction,
} from '../actions'
import { getUser, getActiveCourseData, getActiveCourseProgress } from '../selectors'
import Api from '../../api'

function* fetchUserWishlistAsync(action) {
    const wishlist = yield call(Api.User.getWishlistCourses)
    yield put(setUserWishlist(wishlist));
}
export function* watchFetchUserWishlistAsync() {
    yield takeLatest(FETCH_USER_WISHLIST_ASYNC, fetchUserWishlistAsync);
}

function* fetchActiveCourseDataAsync(action) {
    const { courseId, history } = action.payload

    // Lookup required fields
    const user = yield call(Api.User.getSessionUser)

    // Make API calls
    const courseData = yield call(Api.Course.getCoursesById, courseId)
    const courseProgress = yield call(Api.User.getCourseProgress, user.id, courseId)

    // If no course data was found, then 404
    if (!courseData) {
        yield call(history.push, '/404')
    }

    // Build object for rendering
    const lastUsedSectionId = courseProgress.lastUsedSectionId
    const sectionIndex = Math.max(0, courseData.sections.findIndex(e => e._id === lastUsedSectionId))

    // Update redux
    yield put(setActiveCourseSectionIndex(sectionIndex))
    yield put(setActiveCourseData(courseData))
    yield put(updateActiveCourseProgress(courseProgress))
}
export function* watchFetchActiveCourseDataAsync() {
    yield takeLatest(FETCH_ACTIVE_COURSE_DATA_ASYNC, fetchActiveCourseDataAsync);
}

function* saveCourseProgressAsync(action) {
    const updatedCourseProgress = action.payload

    // Lookup required fields
    const course = yield select(getActiveCourseData)
    const courseProgress = yield select(getActiveCourseProgress)

    // Merge data
    const mergedCourseProgress = {
        ...courseProgress,
        ...updatedCourseProgress,
    }
    // Merge nested array
    if (updatedCourseProgress.sectionProgress) {
        mergedCourseProgress.sectionProgress = Object.values({
            ...Object.fromEntries(courseProgress.sectionProgress.map(sp => [sp.sectionId, sp])),
            ...Object.fromEntries(updatedCourseProgress.sectionProgress.map(sp => [sp.sectionId, sp])),
        })
    }

    // Update any dependant fields
    mergedCourseProgress.courseId = course._id
    mergedCourseProgress.lastUsed = new Date().toLocaleString("en-US")
    mergedCourseProgress.progress = Math.round(mergedCourseProgress.sectionProgress
        .filter(section => section.completed).length * 100 / Math.max(1, course.sections.length))

    // Make API calls
    yield call(Api.User.saveCourseProgress, mergedCourseProgress)

    // Update redux
    yield put(updateActiveCourseProgress(mergedCourseProgress))
}
export function* watchSaveCourseProgressAsync() {
    yield takeEvery(SAVE_COURSE_PROGRESS_ASYNC, saveCourseProgressAsync);
}

function* setSectionCompletedAsync(action) {
    const { sectionId, completed } = action.payload

    // Lookup required fields
    const user = yield call(Api.User.getSessionUser)
    const course = yield select(getActiveCourseData)

    // Build update object
    const updatedCourseProgress = {
        userId: user.id,
        courseId: course.id,
        sectionProgress: [{ sectionId, completed }],
        lastUsedSectionId: sectionId,
    }

    // Fire off action to save course progress
    yield put(saveCourseProgressAsyncAction(updatedCourseProgress))
}
export function* watchSetSectionCompletedAsync() {
    yield takeEvery(SET_SECTION_COMPLETED_ASYNC, setSectionCompletedAsync);
}

function* incrementStudyTimeMinsAsync(action) {
    const increment = action.payload

    // Lookup fields
    const courseProgress = yield select(getActiveCourseProgress)

    // Build update object
    const updatedCourseProgress = {
        studyTimeMins: courseProgress.studyTimeMins + increment
    }

    // Fire off action to save course progress
    yield put(saveCourseProgressAsyncAction(updatedCourseProgress))
}
export function* watchIncrementStudyTimeMinsAsync() {
    yield takeEvery(INCREMENT_STUDY_TIME_MINS_ASYNC, incrementStudyTimeMinsAsync);
}

function* fetchDashboardData(action) {
    // Lookup required fields
    const user = yield call(Api.User.getSessionUser)

    // Make API calls
    const allCourses = yield call(Api.User.getAllCourses)
    const allCoursesProgress = yield all(allCourses.map(course => call(Api.User.getCourseProgress, user.id, course._id)))
    const wishlistCourses = yield call(Api.User.getWishlistCourses)

    // Merge data
    const allCoursesWithProgress = allCourses.map((course, i) => ({
        ...course,
        courseProgress: allCoursesProgress[i],
    }))
    const recentCoursesWithProgress = allCoursesWithProgress
        .filter(course => course.courseProgress.lastUsed)
        .sort((a, b) => new Date(b.courseProgress.lastUsed) - new Date(a.courseProgress.lastUsed))
        .slice(0, 3)

    // Update redux
    yield put(updateDashboardData({
        allCourses: allCoursesWithProgress,
        recentCourses: recentCoursesWithProgress,
        wishlistCourses: wishlistCourses,
    }))
}
export function* watchFetchDashboardData() {
    yield takeLatest(FETCH_DASHBOARD_DATA_ASYNC, fetchDashboardData)
}