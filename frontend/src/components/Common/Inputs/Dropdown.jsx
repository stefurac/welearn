import React, { useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Portal, darkenColor } from '../../../utils'

const DropdownWrapper = styled.div`
    ${props => props.align === 'left' ? `right: auto` : `left: auto`};
    position: absolute;
    margin-top: 2px;
    overflow: hidden;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.palette.text.feather};
    border: 1px solid ${({ theme }) => theme.palette.text.light};

    ${props => !props.visible && css`
        display: none;
    `}
`

const DropdownOption = styled.div`
    cursor: pointer;
    padding: 8px 35px;
    color: ${({ theme }) => theme.palette.text.regular};
    background-color: ${({ theme }) => theme.palette.text.feather};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 600;
    text-align: ${props => props.textAlign};

    &:hover {
        background-color: ${({ theme }) => darkenColor(theme.palette.text.feather, 0.1)};
    }
`

const DropdownDivider = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.palette.text.light};
`

// Helper dropdown component
const Dropdown = (props) => {
    const dropdownRef = useRef()
    const { anchorRef, align, dropdownOptions, onOptionClick, visible, setVisible, textAlign } = props

    //When dropdown changes visibility, determine where the it should appear and set its position.
    useEffect(() => {
        const dropdownWrapper = dropdownRef.current
        const anchorBoundingRect = anchorRef.current.getBoundingClientRect()
        const screenBoundingRect = document.body.getBoundingClientRect()

        dropdownWrapper.style.top = `${anchorBoundingRect.bottom}px`
        if (align === 'left') {
            dropdownWrapper.style.left = `${anchorBoundingRect.left}px`
        } else {
            dropdownWrapper.style.right = `${screenBoundingRect.right - anchorBoundingRect.right}px`
        }
    }, [align, anchorRef, dropdownRef, visible])

    /**
     * Generate an onClick listener for each dropdown option.
     *
     * @param {number} index index of the dropdown option
     */
    const onDropdownOptionClick = index => e => {
        setVisible(false)
        onOptionClick(index)
        // Ensures focus is transferred to this component on click (needed for RichTextBox)
        e.preventDefault()
    }

    return (
        <Portal>
            <DropdownWrapper ref={dropdownRef} visible={visible} align={align}>
                {dropdownOptions.map((label, i) =>
                    <React.Fragment key={label}>
                        <DropdownOption textAlign={textAlign} onMouseDown={onDropdownOptionClick(i)}>
                            {label}
                        </DropdownOption>

                        {/* Add divider below every DropdownOption except for the last one */}
                        {(i < dropdownOptions.length - 1) && <DropdownDivider />}
                    </React.Fragment>)}
            </DropdownWrapper>
        </Portal>
    )
}

Dropdown.propTypes = {
    autoClose: PropTypes.bool,
    align: PropTypes.oneOf(['left', 'right']).isRequired,
    anchorRef: PropTypes.any.isRequired,
    dropdownOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    onOptionClick: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    textAlign: PropTypes.string,
}

Dropdown.defaultProps = {
    textAlign: 'left',
}

export default Dropdown
