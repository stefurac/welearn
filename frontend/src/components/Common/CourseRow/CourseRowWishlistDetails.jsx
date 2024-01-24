import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const WishlistDetails = styled.span`
    color: ${({ theme }) => theme.palette.text.regular};
    font-size: .9rem;
    line-height: 1.2rem;
`
// Styling wrap for course wishlist
const CourseRowWishlistDetails = props => {
    return (
        <WishlistDetails><strong>Cost:</strong> {props.courseCost} WeLearn points</WishlistDetails>
    )
}

CourseRowWishlistDetails.propTypes = {
    courseCost: PropTypes.number.isRequired,
}

export default CourseRowWishlistDetails
