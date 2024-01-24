import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import InputLabel from './InputLabel'

const Wrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
    margin: ${props => props.margin};
    display: flex;
    flex-direction: column;
`

const HeaderText = styled.h3`
    width: 100%;
    font-family: ${({ theme }) => theme.typography.h3.fontFamily};
    font-size: 0.9rem;
    line-height: 1rem;
`

const StyledInput = styled.textarea`
    width: 100%;
    font-family: ${({ theme }) => theme.typography.h4.fontFamily};
    font-size: 1rem;
    padding: 6px 8px;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    border-color: ${props => props.error ? ({theme}) => theme.palette.warning : ({theme}) => theme.palette.primary};
    margin: 0;
    flex-basis: 0;
    flex-grow: 1;
    resize: none;
    &:focus {
        outline: 1px ${({theme}) => theme.palette.primary};
        box-shadow: 0px 0px 4px${props => props.error ? ({theme}) => theme.palette.warning : ({theme}) => theme.palette.primary};
    }
`;

// Styling wrap for text field
export const TextField = props => {
    return (
        <Wrapper width={props.width} height={props.height} margin={props.margin}>
            <InputLabel label={props.label} error={props.error}/>
            <StyledInput
                type="textarea"
                onChange={props.onChange}
                value={props.value}
                error={props.error}
            />
        </Wrapper>

    );
};

TextField.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    margin: PropTypes.string,
    value: PropTypes.string,
};

TextField.defaultProps = {
    width: '100%',
    height: '100%',
    margin: '0',
}

export default TextField;