import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const LabelText = styled.span`
    color: ${({ theme }) => theme.palette.text.heavy};
    font-family: ${({ theme }) => theme.typography.h3.fontFamily};
    font-size: 0.9rem;
    line-height: 1rem;
`

const ErrorText = styled(LabelText)`
    color: ${({ theme }) => theme.palette.warning};
`

// Styling wrap for input label
const InputLabel = ({ label, error }) => {
    return (
        <Wrapper>
            <LabelText>
                {label}
            </LabelText>

            {error &&
                <ErrorText>
                    {error}
                </ErrorText>}
        </Wrapper>
    )
}

InputLabel.propTypes = {
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
}

export default InputLabel
