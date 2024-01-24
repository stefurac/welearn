import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Dropdown from '../../Dropdown'

const DropDownComponent = styled.div`
    min-width: 100px;
    margin-right: 8px;
    color: ${props => props.theme.palette.text.light};
    cursor: pointer;
`
// Wrap for toolbar dropdown
const ToolBarDropDown = props => {
    const anchorRef = useRef()
    const [isDropdownVisible, setDropdownVisibility] = useState(false)

    return (<>
        <DropDownComponent
            ref={anchorRef}
            onMouseDown={e => { e.preventDefault(); setDropdownVisibility(!isDropdownVisible) }}>
            {props.label}
        </DropDownComponent>

        <Dropdown
            align='left'
            textAlign='left'
            anchorRef={anchorRef}
            dropdownOptions={props.options}
            onOptionClick={i => props.onOptionClick(i)}
            visible={isDropdownVisible}
            setVisible={setDropdownVisibility} />
    </>)
};

ToolBarDropDown.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onOptionClick: PropTypes.func.isRequired,
};

export default ToolBarDropDown;