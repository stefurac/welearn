import React from 'react'
import PropTypes from 'prop-types'
import { CourseRow, CourseRowDetails } from '../Common/CourseRow'
import { Button } from '../Common/Inputs'
import { formatStudyTimeMins } from '../../utils'

// Helper styling wrap of bought courses for User Dasboard page
const MyCourses = props => {
    return (
        <>
            {props.allCourses.map(course =>
                <CourseRow
                    key={course._id}
                    title={course.title}
                    image={course.image}
                    sidecarComponent={<Button label={'Study'} linkTo={`course/${course._id}`} />}>
                    <CourseRowDetails
                        lastUsedDate={course.courseProgress.lastUsed || 'N/A'}
                        progressPercent={course.courseProgress.progress}
                        studyTime={formatStudyTimeMins(course.courseProgress.studyTimeMins)} />
                </CourseRow>
            )}
        </>
    )
}

MyCourses.propTypes = {
    allCourses: PropTypes.arrayOf(PropTypes.object,).isRequired,
}

export default MyCourses
