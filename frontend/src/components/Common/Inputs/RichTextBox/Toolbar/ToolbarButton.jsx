import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ButtonComponent = styled.div`
    width: 24px;
    padding: 2px;
    border-radius: 4px;
    margin-right: 8px;
    cursor: pointer;
    text-align: center;

    color: ${props => props.active
        ? props.theme.palette.text.heavy
        : props.theme.palette.text.light};
    stroke: ${props => props.active
        ? props.theme.palette.text.heavy
        : props.theme.palette.text.light};
    fill: ${props => props.active
        ? props.theme.palette.text.heavy
        : props.theme.palette.text.light};
    background-color: ${props => props.active
        ? props.theme.palette.text.feather
        : 'transparent'};
`
// Styling wrap for toolbar button
const ToolbarButton = props => {
    return (
        <ButtonComponent {...props} onMouseDown={e => { e.preventDefault(); props.onMouseDown(e); }}>
            {props.children}
        </ButtonComponent>
    );
};

ToolbarButton.propTypes = {
    onMouseDown: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default ToolbarButton;