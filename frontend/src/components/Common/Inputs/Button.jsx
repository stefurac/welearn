import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { darkenColor } from '../../../utils'

// Returns button color based on props theme
export const getColor = props => {
	if (props.disabled) {
		return props.theme.palette.text.regular
	}
	else if (props.warning) {
		if (props.filled) {
			return 'white'
		}
		else {
			return props.theme.palette.warning
		}
	}
	else {
		if (props.filled) {
			return 'white'
		}
		else {
			return props.theme.palette.primary
		}
	}
}

// Returns background color based on props theme
export const getBackgroundColor = props => {
	if (props.disabled) {
		return 'transparent'
	}
	else if (props.warning) {
		if (props.filled) {
			return props.theme.palette.warning
		}
		else {
			return 'transparent'
		}
	}
	else {
		if (props.filled) {
			return props.theme.palette.primary
		}
		else {
			return 'transparent'
		}
	}
}
// Returns border color based on props theme
export const getBorderColor = props => {
	if (props.disabled) {
		return props.theme.palette.text.regular
	}
	else if (props.warning) {
		return props.theme.palette.warning
	}
	else {
		return props.theme.palette.primary
	}
}

// Returns hover color based on props theme
export const getHoverColor = props => {
	if (props.disabled) {
		return props.theme.palette.text.regular
	}
	return 'white'
}

// Returns hover background color based on props theme
export const getHoverBackgroundColor = props => {
	if (props.disabled) {
		return 'transparent'
	}
	else if (props.filled) {
		return darkenColor(getBackgroundColor(props), -0.15)
	}
	else {
		if (props.warning) {
			return props.theme.palette.warning
		}
		else {
			return props.theme.palette.primary
		}
	}
}

const ButtonComponent = styled.button`
	color: ${props => getColor(props)};
	stroke: ${props => getColor(props)};
	background: ${props => getBackgroundColor(props)};
  	
	width: ${props => props.width};
	height: ${props => props.height};
	margin: ${props => props.margin};
	padding: ${props => props.padding};
	border: 2px solid ${props => getBorderColor(props)};
	border-radius: ${props => props.borderRadius};
	outline: none;

	font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${props => props.fontSize};
    line-height: ${props => props.fontSize};
    font-weight: 600;
    text-align: center;

	cursor: pointer;
	${props => props.disabled && css`
		cursor: auto;
	`}

	&:hover {
		color:  ${props => getHoverColor(props)};
		stroke: ${props => getHoverColor(props)};
		background-color: ${props => getHoverBackgroundColor(props)};
	}  
`

// Styling wrap for button
const Button = props => {
	const navigateOnButtonClick = () => {
		props.history.push(props.linkTo);
	}

	return (
		<ButtonComponent
			{...props}
			onClick={props.disabled ? null : (props.linkTo ? navigateOnButtonClick : props.onClick)}>
			{props.label || props.children}
		</ButtonComponent>
	)
}

Button.propTypes = {
	label: PropTypes.string,
	fontSize: PropTypes.string,
	children: PropTypes.node,
	linkTo: PropTypes.string,
	onClick: PropTypes.func,
	disabled: PropTypes.any,
	filled: PropTypes.any,
	warning: PropTypes.any,
	padding: PropTypes.string,
	margin: PropTypes.string,
	borderRadius: PropTypes.string,
}

Button.defaultProps = {
	width: 'auto',
	height: 'auto',
	padding: '8px 16px',
	margin: '0',
	borderRadius: '8px',
	fontSize: '1rem',
}

export default withRouter(Button)
