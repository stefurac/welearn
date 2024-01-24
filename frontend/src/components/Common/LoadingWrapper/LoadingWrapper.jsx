import React from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'

const OuterWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LoadingAnimation = keyframes`
    0% {
        height: 0%;
    }

    30% {
        height: 100%;
    }

    60% {
        height: 0%;
    }
`

const LoadingBar = styled.div`
    width: 6px;
    margin: 0 4px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.palette.primary};
    animation: ${LoadingAnimation} 1500ms infinite;
`

const LoadingBarWrapper = styled.div`
    height: 52px;
    display: flex;
    align-items: center;

    ${LoadingBar} {
        &:nth-child(1) {
            animation-delay: 0ms;
        }
        &:nth-child(2) {
            animation-delay: 100ms;
        }
        &:nth-child(3) {
            animation-delay: 200ms;
        }
        &:nth-child(4) {
            animation-delay: 300ms;
        }
        &:nth-child(5) {
            animation-delay: 400ms;
        }
    }
`


const LoadingWrapper = props => {
    return (
        <OuterWrapper>
            <LoadingBarWrapper>
                <LoadingBar/>
                <LoadingBar/>
                <LoadingBar/>
                <LoadingBar/>
                <LoadingBar/>
            </LoadingBarWrapper>
        </OuterWrapper>
    )
}

LoadingWrapper.propTypes = {

}

export default LoadingWrapper
