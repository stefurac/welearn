import React from 'react'
import PropTypes from 'prop-types'
import { CourseRow } from '../Common/CourseRow'
import { Button } from '../Common/Inputs'
import Api from '../../api'

const AllCourses = props => {

    // Calls API to delete comment
    const deleteCourse = course => {
        Api.Course.deleteCourse(course._id)
            .then(res => {
                //updates page
                props.setLastUpdate(Date.now())
            })
    }
    return (
        <>
            {props.allCourses.map(course =>
                <CourseRow
                    key={course.id}
                    title={course.title}
                    image={course.image}
                    sidecarComponent={<Button label={'Delete Course'} onClick={() => { deleteCourse(course) }} warning />}
                >
                </CourseRow>
            )}
        </>
    )
}

AllCourses.propTypes = {
    allCourses: PropTypes.arrayOf(PropTypes.object,).isRequired,
}

export default AllCourses
