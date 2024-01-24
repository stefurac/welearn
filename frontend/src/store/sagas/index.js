import { all } from 'redux-saga/effects'
import {
    watchFetchUserWishlistAsync,
    watchFetchActiveCourseDataAsync,
    watchSaveCourseProgressAsync,
    watchSetSectionCompletedAsync,
    watchFetchDashboardData,
    watchIncrementStudyTimeMinsAsync,
} from './user'

export default function* rootSaga() {
    yield all(
        [
            watchFetchUserWishlistAsync(),
            watchFetchActiveCourseDataAsync(),
            watchSaveCourseProgressAsync(),
            watchSetSectionCompletedAsync(),
            watchFetchDashboardData(),
            watchIncrementStudyTimeMinsAsync(),
        ]
    )
}