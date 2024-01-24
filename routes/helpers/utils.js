// Helper for update model object
function updateFields(model, body, fields) {
    fields.forEach(field => {
        if (field in body) {
            model[field] = body[field]
        }
    })
}

//Generates date without hours
function currentDate() {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
}

//Format for study time
function formatMins(mins) {
    let hours = Math.floor(mins / 60)
    let minutes = Math.ceil((mins - 60 * hours))
    if (minutes === 60) {
        hours++
        minutes = 0
    }
    return `${hours}h${minutes}m`
}

function hasUserBoughtCourse(user, course) {
    const coursesMap = Object.fromEntries(user.boughtCourses.map(id => [id.toString(), true]))
    if (coursesMap[course._id]) {
        return true
    }
    return false
}

function hasUserCreatedCourse(user, course) {
    return course.ownerId.toString() === user._id.toString()
}

function hasUserWishlistedCourse(user, course) {
    const coursesMap = Object.fromEntries(user.wishlistedCourses.map(id => [id.toString(), true]))
    if (coursesMap[course._id]) {
        return true
    }
    return false
}

function canUserReadCourse(user, course) {
    return user.isAdmin || hasUserCreatedCourse(user, course) || hasUserBoughtCourse(user, course)
}

function canUserModifyCourse(user, course) {
    return user.isAdmin || hasUserCreatedCourse(user, course) 
}

module.exports = {
    updateFields,
    currentDate,
    formatMins,
    hasUserBoughtCourse,
    hasUserCreatedCourse,
    hasUserWishlistedCourse,
    canUserReadCourse,
    canUserModifyCourse,
}