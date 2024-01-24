import React from 'react'
import styled from 'styled-components'
import LoadingWrapper from '../../components/Common/LoadingWrapper/LoadingWrapper'

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
`
// Loading page
export const LoadingPage = props => {
    return (
        <Wrapper>
            <LoadingWrapper />
        </Wrapper>
    )
}

export default LoadingPage
