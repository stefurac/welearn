import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Button from './Button'
import { ReactComponent as ChevronSVG } from '../../../assets/icons/down-chevron.svg'
import Dropdown from './Dropdown'

const InnerWrapper = styled.div`
    position: relative;
    display: flex;
`

const ChevronIcon = styled(ChevronSVG)`
    stroke-width: 2;
    margin: 0;
    width: 1rem;
    height: 1rem;
`
// Helper dropdown button component
const DropdownButton = props => {
    const anchorRef = useRef()
    const { buttonOptions } = props
    const [activeDropdownIndex, setActiveDropdownIndex] = useState(0)
    const [isDropdownVisible, setDropdownVisibility] = useState(false)

    return (
        <InnerWrapper ref={anchorRef}>
            <Button
                filled={props.filled}
                borderRadius={'8px 0 0 8px'}
                margin={'0 1px 0 0'}
                onClick={buttonOptions[activeDropdownIndex].onClick}>
                {buttonOptions[activeDropdownIndex].label}
            </Button>
            <Button
                filled={props.filled}
                padding={'8px'}
                borderRadius={'0 8px 8px 0'}
                onClick={() => setDropdownVisibility(!isDropdownVisible)}>
                <ChevronIcon />
            </Button>

            <Dropdown
                align='right'
                textAlign='right'
                anchorRef={anchorRef}
                dropdownOptions={buttonOptions.map(({ label }) => label)}
                onOptionClick={i => setActiveDropdownIndex(i)}
                visible={isDropdownVisible}
                setVisible={setDropdownVisibility} />
        </InnerWrapper>
    )
}

DropdownButton.propTypes = {
    buttonOptions: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    })).isRequired,
    filled: PropTypes.bool,
}

export default DropdownButton
