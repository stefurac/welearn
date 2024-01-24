import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding-bottom: 16px;
`
// Styling wrap for toolbar
const Toolbar = props => {
    return (
        <Wrapper>
            {props.children}
        </Wrapper>
    )
}

Toolbar.propTypes = {
    children: PropTypes.array.isRequired,
}

export default Toolbar
