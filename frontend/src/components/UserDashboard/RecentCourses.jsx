import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { CourseThumbnail, CourseProgress } from '../Common/CourseThumbnail'
import EmptyPlaceholder from '../Common/EmptyPlaceholder/EmptyPlaceholder'
import { formatStudyTimeMins } from '../../utils'


const RecentCoursesWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

// Helper styling wrap of recent courses for User Dasboard page
const RecentCourses = props => {

    // empty place holder for courses
    const renderEmptyPlaceholder = () => (
        <EmptyPlaceholder
            maxHeight={'330px'}
            imageName={'void'}
            imageTitle={'No recent courses'}
            headerComponent={<span>No recent courses</span>}
            bodyComponent={<span>Start studying and your recent<br />courses will be shown here</span>}
            largeFontSize={'1.8rem'}
            smallFontSize={'1rem'} />
    )

    //loads recent course thumbnails
    const renderRecentCourses = () => (
        props.recentCourses.map(course =>
            <CourseThumbnail
                key={course._id}
                id={course._id}
                title={course.title}
                image={course.image}
                courseAuthor={course.author}
                courseCost={course.cost}
                linkBaseEndpoint={'course'}
                margin={'0'}>
                <CourseProgress
                    description={course.description}
                    progressPercent={course.courseProgress.progress || 0}
                    studyTime={formatStudyTimeMins(course.courseProgress.studyTimeMins)} />
            </CourseThumbnail>
        )
    )

    return (
        <RecentCoursesWrapper>
            {props.recentCourses.length === 0
                ? renderEmptyPlaceholder()
                : renderRecentCourses()}
        </RecentCoursesWrapper>
    )
}

RecentCourses.propTypes = {
    recentCourses: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default RecentCourses
