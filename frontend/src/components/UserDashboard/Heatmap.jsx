import React from 'react'
import styled, { withTheme } from 'styled-components'
import PropTypes from 'prop-types'
import Tooltip from '../Common/Tooltip/Tooltip'
import AspectRatio from '../Common/AspectRatio/AspectRatio'
import { interpolateColor, darkenColor } from '../../utils'

const repeat = (str, n) => Array(n)
    .fill()
    .map(_ => str)
    .join(' ')

const Wrapper = styled.div`
    width: 100%;
    padding: 16px;
    background-color: ${({ theme }) => theme.palette.sideNavBackground};
    border-radius: 16px;

    display: grid;
    grid-template-rows: ${repeat('1fr', 8)};
    grid-auto-flow: column dense;
    column-gap: 2px;
    row-gap: 2px;
`

const Cell = styled.div`
    width: 100%;
    padding-top: calc(100% - 2px);

    background-color: ${props => props.color};
    border: 1px solid ${props => darkenColor(props.color, 0.25)};
    border-radius: 4px;
    box-sizing: border-box;
`

const CellSpacer = styled.div`
    grid-column-end: span ${props => props.colSpan ? props.colSpan : 1};
    grid-row-end: span ${props => props.rowSpan ? props.rowSpan : 1};
`

const WeekText = styled.div`
    margin-left: -4px;
    margin-right: -8px;
    align-self: center;

    font-size: .7rem;
    line-height: 100%;
    color: ${({ theme }) => theme.palette.text.regular};
`

const MonthText = styled.div`
    width: 1px;
    align-self: center;

    font-size: .7rem;
    line-height: 100%;
    color: ${({ theme }) => theme.palette.text.regular};
`

/**
 * Turn an amount of time studied into a color.
 * 
 * @param {number} time amount of time studied on a given day
 * @param {number} minTime the minimum non-zero amount of time studied in teh given time-frame
 * @param {number} maxTime the maximum amount of time studied in teh given time-frame
 * @param {*} theme StyledComponents theme object
 */
const studyTimeToColor = (time, minTime, maxTime, theme) => {
    if (time === 0) return theme.palette.heatmap.none
    const studyRange = maxTime === minTime ? 1 : maxTime - minTime
    const step = (time - minTime) / studyRange
    return interpolateColor(
        theme.palette.heatmap.min,
        theme.palette.heatmap.max,
        step)
}

/**
 * Given the user's activity, add month labels at the start of each month.
 *
 * @param {object} activity the user's daily activity
 */
const addMonthLabels = activity => {
    let curMonth = -1
    const activityAndMonths = []
    for (let i = 0; i < activity.length; i++) {
        if (i % 7 === 0) {
            const date = activity[i].date
            if (date.getMonth() !== curMonth) {
                curMonth = date.getMonth()
                activityAndMonths.push({ isLabel: true, label: date.toLocaleDateString('en-US', { month: 'short' }) })
            } else {
                activityAndMonths.push({ isLabel: true })
            }
        }
        activityAndMonths.push(activity[i])
    }
    return activityAndMonths
}

// Helper styling wrap of heatmap for User Dasboard page
const Heatmap = props => {
    const studyTimes = props.activity.map(({ studyTime }) => studyTime)
    const nonZeroStudyTimes = studyTimes.filter(t => t !== 0)
    const minStudyTime = nonZeroStudyTimes.length > 0 ? Math.min(...nonZeroStudyTimes) : 0
    const maxStudyTime = Math.max(...studyTimes)

    const activityAndMonths = addMonthLabels(props.activity)
    const dateFormatOptions = { weekday: 'short', month: 'long', day: 'numeric' }

    return (
        <AspectRatio widthRatio={26} heightRatio={7}>
            <Wrapper>
                <CellSpacer rowSpan={2} />
                <WeekText>Mon</WeekText>
                <CellSpacer />
                <WeekText>Wed</WeekText>
                <CellSpacer />
                <WeekText>Fri</WeekText>
                <CellSpacer />

                {activityAndMonths.map((activity, i) => {
                    if (activity.isLabel && activity.label) {
                        return <MonthText key={i}>{activity.label}</MonthText>
                    }
                    else if (activity.isLabel) {
                        return <CellSpacer key={i} />
                    }
                    else {
                        return (
                            <Tooltip
                                key={activity.date}
                                title={`${activity.studyTime} hours on ${activity.date.toLocaleDateString('en-US', dateFormatOptions)}`}
                                placement="top"
                                arrow>
                                <Cell
                                    color={studyTimeToColor(activity.studyTime, minStudyTime, maxStudyTime, props.theme)} />
                            </Tooltip>
                        )
                    }
                })}
            </Wrapper>
        </AspectRatio>
    )
}

Heatmap.propTypes = {
    activity: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default withTheme(Heatmap)
