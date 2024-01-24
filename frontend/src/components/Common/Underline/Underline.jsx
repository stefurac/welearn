import styled from 'styled-components'
import PropTypes from 'prop-types'

// Partial text underline
const Underline = styled.div`
    width: 64px;
    height: 2px;
    margin-top: 8px;
    margin-left: 2px;
    background-color: ${props => props.color ? props.color : props.theme.palette.primary};
`

Underline.propTypes = {
    color: PropTypes.string,
}

export default Underline
