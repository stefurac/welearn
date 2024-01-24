import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import InputLabel from './InputLabel'

const StyledInput = styled.input`
    font-family: ${({ theme }) => theme.typography.h4.fontFamily};
    width: 100%;
    font-size: 1rem;
    padding: 6px 8px;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    border-color: ${props => props.error ? ({ theme }) => theme.palette.warning : ({ theme }) => theme.palette.primary};
    margin: 0;
    &:focus {
        outline: 1px ${({ theme }) => theme.palette.primary};
        box-shadow: 0px 0px 4px ${props => props.error ? ({ theme }) => theme.palette.warning : ({ theme }) => theme.palette.primary};
    }
`;

// Styling wrap for number input
export const NumberInput = props => {
    return (
        <div>
            <InputLabel label={props.label} error={props.error} />
            <StyledInput
                type="number"
                onChange={props.onChange}
                value={props.value}
                error={props.error}
            />
        </div>

    );
};

NumberInput.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number,
    error: PropTypes.string,
};

export default NumberInput;