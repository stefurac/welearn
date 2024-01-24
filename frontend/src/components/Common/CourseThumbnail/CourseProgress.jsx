import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;
`

const DescriptionWrapper = styled.div`
    width: 100%;
    margin-bottom: 8px;

    flex-basis: 0;
    flex-grow: 1;

    color: ${({ theme }) => theme.palette.text.regular};
    font-size: .85rem;
    line-height: 1rem;
    overflow-y: auto;
`

const ProgressBarBackground = styled.div`
    width: 100%;
    height: 8px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.palette.text.feather};
`

const ProgressBarInlay = styled.div`
    width: ${props => props.width};
    height: 8px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.palette.primary};
    transition: width 400ms ease;
`
const ProgressTextWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    padding-top: 8px;
`
const ProgressText = styled.span`
    color: ${({ theme }) => theme.palette.text.regular};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: .85rem;
    font-weight: 500;
    line-height: 1rem;
    color: ${({ theme }) => theme.palette.text.regular};
`
// Styling wrap for course progress
const CourseProgress = props => {
    return (
        <Wrapper>
            <DescriptionWrapper>
                {props.description}
            </DescriptionWrapper>

            <ProgressBarBackground>
                <ProgressBarInlay width={`${props.progressPercent}%`} />
            </ProgressBarBackground>

            <ProgressTextWrapper>
                <ProgressText><strong>Progress:</strong> {`${props.progressPercent}%`}</ProgressText>
                <ProgressText><strong>Study Time:</strong> {props.studyTime}</ProgressText>
            </ProgressTextWrapper>
        </Wrapper>
    );
};

CourseProgress.propTypes = {
    description: PropTypes.string.isRequired,
    progressPercent: PropTypes.number,
    studyTime: PropTypes.string,
}

export default CourseProgress