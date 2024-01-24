import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components' 
import { Link, useRouteMatch } from 'react-router-dom'

// Wrapper for the button, with oversized highlight when active
const ButtonWrapper = styled(Link)`
    display: flex;
    align-items: center;

    margin-left: -16px;
    margin-bottom: 8px;
    padding: 8px 16px;

    border-radius: 16px;
    background-color: ${props=> props.selected ? `#E6D8FF` : `transparent`};
    color: ${props => props.selected ? props.theme.palette.primary : props.theme.palette.text.heavy};

    text-decoration: none;
    cursor: pointer;

    &:hover {
        color: ${({theme}) => theme.palette.primary};
    }
`

// Label (text) of the button
const ButtonLabel = styled.span`
    font-weight: ${props => props.selected
        ? props.theme.typography.fontWeightBold
        : props.theme.typography.fontWeightMedium};
`
// Styling wrap for side nav buttons
const SideNavButton = props => {
    // Determine if the button is currently selected based on the current URL path
    const isSelected = useRouteMatch({
        path: props.path,
        exact: props.exactPath,
    })

    return (
        <ButtonWrapper to={props.path} selected={isSelected}>
            <props.icon/>
            <ButtonLabel selected={isSelected}>
                {props.label}
            </ButtonLabel>
        </ButtonWrapper>
    );
};

export const SideNavButtonProps = {
    icon: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    exactPath: PropTypes.bool,
}

SideNavButton.propTypes = SideNavButtonProps;

SideNavButton.defaultProps = {
    exactPath: true,
}


export default SideNavButton;