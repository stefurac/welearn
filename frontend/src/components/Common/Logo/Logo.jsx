import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { ReactComponent as LogoSVG } from '../../../assets/icons/logo.svg'

const LogoIcon = styled(LogoSVG)`
    width: ${props => props.fontSize};
    height: ${props => props.fontSize};
    margin-right: 8px;
`

// Styling for the logo as seen at the top of the side bar
const LogoText = styled(Link)`
    margin: ${props => props.margin};
    text-align: left;

    color: ${({ theme }) => theme.palette.text.heavy};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${props => props.fontSize};
    font-weight: 700;
    line-height: 1.2rem;
    text-decoration: none; 
`
// Styling wrap for logo
const Logo = props => {
    return (
        <LogoText margin={props.margin} fontSize={props.fontSize} to='/home'>
            <LogoIcon fontSize={props.fontSize} />
            WeLearn
        </LogoText>
    )
}

Logo.propTypes = {
    fontSize: PropTypes.string,
    margin: PropTypes.string,
}

Logo.defaultProps = {
    fontSize: '1.6rem',
    margin: '0',
}

export default Logo
