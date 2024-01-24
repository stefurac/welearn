import axios from "axios"
import { BASE_URL } from "."
import { samplarCourses } from "../samplars/courses"

// Stringifies rich text of sections
function stringifyRichText(course) {
    const deepClone = JSON.parse(JSON.stringify(course))
    deepClone.sections = deepClone.sections.map(section => {
        section.courseMaterials = section.courseMaterials.map(materials => {
            if (materials.type === 'text') {
                materials.content = JSON.stringify(materials.content)
            }
            return materials
        })
        return section
    })
    return deepClone
}

// Populates database with samplars
function uploadSamplarCoursesToDb(ownerId, author) {
    const courses = samplarCourses.map(course =>  stringifyRichText(course))
    courses.forEach(course => {
        course.ownerId = ownerId
        course.author = author
        axios.post(`${BASE_URL}/api/dev-tools/upload-course`, course)
        .then(res =>  alert('Uploaded Samplar Courses to DB'))
        .catch(error => alert('Failed to uploaded Samplar Courses to DB'))
    })
}

const DevToolsApi = {
    uploadSamplarCoursesToDb
}

export default DevToolsApi