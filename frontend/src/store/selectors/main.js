export const getAllUsers = store => store.main.users
export const getPublishedCourses = store => store.main.courses.filter((el) => el.isPublished)