import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Line = styled.div`
    width: 1px;
    height: 16px;
    margin-left: ${props => props.marginLeft};
    margin-right: ${props => props.marginRight};
    background-color: ${({ theme }) => theme.palette.text.light};
`
// Styling wrap for toolbar divider
const ToolbarDivider = (props) => {
    return (
        <Line {...props} />
    )
}

ToolbarDivider.propTypes = {
    marginLeft: PropTypes.string,
    marginRight: PropTypes.string,
}

ToolbarDivider.defaultProps = {
    marginLeft: '24px',
    marginRight: '24px',
}

export default ToolbarDivider