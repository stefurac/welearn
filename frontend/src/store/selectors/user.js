export const getUser = store => store.user.user
export const getUserWishlist = store => store.user.user.wishlistedCourses.filter(course => course.isPublished)
export const getActiveSectionIndex = store => store.user.activeSectionIndex
export const getActiveCourseData = store => store.user.activeCourseData
export const getActiveCourseProgress = store => store.user.activeCourseProgress
export const getDashboardData = store => store.user.dashboardData
