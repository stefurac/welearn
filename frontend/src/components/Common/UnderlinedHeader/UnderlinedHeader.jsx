import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Underline from '../Underline/Underline'

// Styling for the header text
const HeaderText = styled.h2`
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 1.75rem;
`
// Styling wrap for header
const UnderlinedHeader = props => {
    return (
        <div>
            <HeaderText>
                {props.children}
            </HeaderText>
            <Underline color={props.color} />
        </div>

    );
};

UnderlinedHeader.propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.string,
};

export default UnderlinedHeader;