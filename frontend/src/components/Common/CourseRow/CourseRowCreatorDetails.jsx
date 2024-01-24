import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { formatStudyTimeMins } from '../../../utils'

const CourseDetails = styled.span`
    display: inline-block;
    min-width: 10rem;
    color: ${({ theme }) => theme.palette.text.regular};
    font-size: .9rem;
    line-height: 1.2rem;
`
// Styling wrap for creator details
const CourseRowCreatorDetails = props => {
    return (
        <>
            <div>
                <CourseDetails>
                    <strong>Cost:</strong> {props.courseCost} points
                </CourseDetails>
                <CourseDetails>
                    <strong>Generated Revenue:</strong> {props.revenue} points
                </CourseDetails>
            </div>

            <div>
                <CourseDetails>
                    <strong>Students: </strong> {props.numStudents}
                </CourseDetails>
                <CourseDetails>
                    <strong>Collective Study Time: </strong> {formatStudyTimeMins(props.collectiveStudyTime)}
                </CourseDetails>
            </div>

            <div>
                <CourseDetails>
                    <strong>Last Modified:</strong> {props.lastModified}
                </CourseDetails>
            </div>
        </>
    )
}

CourseRowCreatorDetails.propTypes = {
    lastModified: PropTypes.string.isRequired,
    courseCost: PropTypes.number.isRequired,
    revenue: PropTypes.number.isRequired,
    numStudents: PropTypes.number.isRequired,
    collectiveStudyTime: PropTypes.string.isRequired,
}

export default CourseRowCreatorDetails
