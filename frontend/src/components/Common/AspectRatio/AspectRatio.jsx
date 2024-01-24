import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const AspectRatioWrapper = styled.div`
    width: 100%;
    padding-top: ${props => props.aspectPercentage}%;
    margin-top: ${props => -props.aspectPercentage}%;
`
// Styling wrap for aspect ratio 
const AspectRatio = props => {
    const aspectPercentage = props.heightRatio / props.widthRatio * 100

    return (
        <AspectRatioWrapper aspectPercentage={aspectPercentage}>
            {props.children}
        </AspectRatioWrapper>
    )
}

AspectRatio.propTypes = {
    widthRatio: PropTypes.number.isRequired,
    heightRatio: PropTypes.number.isRequired,
}

export default AspectRatio
