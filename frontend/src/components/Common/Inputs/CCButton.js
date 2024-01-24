import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "#CD5C5C" : "white"};
  color: ${props => props.primary ? "white" : ({ theme }) => theme.palette.primary}};

  font-size: 1em;
  margin: ${props => props.margin};
  padding: 0.25em 1em;
  border: 2px solid ${props => props.primary ? "#CD5C5C" : ({ theme }) => theme.palette.primary}};;
  border-radius: 6px;
  cursor: pointer;
  outline: none;

  ${props => !props.primary && css`
    &:hover {
      background: ${({ theme }) => theme.palette.primary};
      color: white;
    }  
  `}
`;

// Styling wrap for course create button
export const CCButton = props => {
  return (
    <div>
      <Button
        onClick={props.onClick}
        primary={props.primary ? true : false}
        disabled={props.disabled ? true : false}
        margin={props.margin}
      > {props.label} </Button>
    </div>

  );
};

CCButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
  margin: PropTypes.string,
};

CCButton.defaultProps = {
  margin: '1em',
}

export default CCButton;