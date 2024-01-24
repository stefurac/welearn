import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


const CourseDetails = styled.span`
    display: inline-block;
    min-width: 7rem;
    color: ${({ theme }) => theme.palette.text.regular};
    font-size: .9rem;
    line-height: 1.2rem;
`
// Styling wrap for course row info
const CourseRowDetails = props => {
    return (
        <>
            <div>
                <CourseDetails>
                    <strong>Progress:</strong> {props.progressPercent}%
                </CourseDetails>
                <CourseDetails>
                    <strong>Study Time:</strong> {props.studyTime}
                </CourseDetails>
            </div>

            <div>
                <CourseDetails>
                    <strong>Last Used:</strong> {props.lastUsedDate}
                </CourseDetails>
            </div>
        </>
    )
}

CourseRowDetails.propTypes = {
    lastUsedDate: PropTypes.string,
    progressPercent: PropTypes.number,
    studyTime: PropTypes.string,
}

export default CourseRowDetails
