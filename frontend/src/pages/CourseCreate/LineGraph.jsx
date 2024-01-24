import React, { useMemo } from 'react'
import styled, { withTheme } from 'styled-components'
import PropTypes from 'prop-types'
import { Line } from '@reactchartjs/react-chart.js';

const ChartWrapper = styled.div`
    width: 100%;
    height: 33.333%;
    padding: 16px;
    box-sizing: border-box;
`
// helper styling component for course create
const LineGraph = props => {
    const data = useMemo(() => ({
        labels: props.timeSeries,
        datasets: [
            {
                data: props.data,
                fill: false,
                backgroundColor: props.theme.palette.primary,
                borderColor: props.theme.palette.primary,
                pointHoverBorderColor: props.theme.palette.accent,
                pointHoverBackgroundColor: props.theme.palette.accent,
            },
        ],
    }), [props.timeSeries, props.data, props.theme])

    const options = useMemo(() => ({
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                },
            }],
        },
        elements: {
            point: {
                radius: 2,
            },
        },
        title: {
            text: props.label,
            display: true,
            fontFamily: props.theme.typography.fontFamily,
            fontSize: 16,
            fontColor: props.theme.palette.text.heavy,
        },
        legend: {
            display: false,
        },
        tooltips: {
            displayColors: false,
        }
    }), [props.label, props.theme])

    return (
        <ChartWrapper >
            <Line
                data={data}
                options={options} />
        </ChartWrapper>
    )
}

LineGraph.propTypes = {
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    timeSeries: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
}

export default withTheme(LineGraph)