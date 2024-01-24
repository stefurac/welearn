import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ReactComponent as CheckSVG } from '../../assets/icons/check.svg'

const withIconStyle = component => styled(component)`
    stroke-width: 2;
    margin: 0;
    width: 1rem;
    height: 1rem;
`

const CheckIcon = withIconStyle(CheckSVG)


const SectionWrapper = styled.div`
    display flex;
    justify-content: space-between;

    padding: 8px 16px;
    border-radius: 16px;
    color: ${props => (props.selected || props.completed) ? props.theme.palette.primary : props.theme.palette.text.heavy};
    stroke: ${props => (props.selected || props.completed) ? props.theme.palette.primary : props.theme.palette.text.heavy};
    background-color: ${props => props.selected ? `#E6D8FF` : `transparent`};
    font-family: ${props => props.theme.typography.fontFamily};
    font-weight: 500;
    cursor: pointer;
`

const SectionText = styled.div`
    flex-grow: 1;
    flex-basis: 0;
`
// Helper styling wrap for course study page
const SectionButton = props => {
    return (
        <SectionWrapper
            selected={props.selected}
            completed={props.completed}
            onClick={props.onClick}>
            <SectionText>{props.label}</SectionText>
            {props.completed ? <CheckIcon /> : ''}
        </SectionWrapper>
    )
}

SectionButton.propTypes = {
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    completed: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default SectionButton
