import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import EmptyPlaceholder from '../../components/Common/EmptyPlaceholder/EmptyPlaceholder'

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
// Not found pages
export const NotFoundPage = props => {
    return (
        <Wrapper>
            <EmptyPlaceholder
                maxHeight={'500px'}
                margin={'-10% 0 0 0'}
                imageName={'notFound'}
                imageTitle={'No recent courses'}
                largeFontSize={'3rem'}
                smallFontSize={'1.4rem'}
                headerComponent={<span>Whoops! Page not found!</span>}
                bodyComponent={
                    <span>
                        The page you were looking for doesn't exist...
                        <br />
                        Click <Link to={'/home'}>here</Link> to go back home
                </span>} />
        </Wrapper>
    )
}

export default NotFoundPage
