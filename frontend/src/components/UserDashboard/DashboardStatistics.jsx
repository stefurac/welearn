import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    height: 100%;
    padding: 16px;
`

const StatisticsText = styled.div`
    color: ${({ theme }) => theme.palette.text.regular};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 400;
`
// Helper styling wrap of statistics for User Dasboard page
const DashboardStatistics = props => {
    return (
        <Wrapper>
            <StatisticsText><strong>Weekly Study Time:</strong> {props.weeklyStudyTime}</StatisticsText>
            <StatisticsText><strong>Lifetime Study Time:</strong> {props.lifetimeStudyTime}</StatisticsText>
        </Wrapper>
    )
}

DashboardStatistics.propTypes = {
    weeklyStudyTime: PropTypes.string.isRequired,
    lifetimeStudyTime: PropTypes.string.isRequired,
}

export default DashboardStatistics
