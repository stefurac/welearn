import React from 'react'
import PropTypes from 'prop-types'
import { CourseRow, CourseRowWishlistDetails } from '../Common/CourseRow'
import { Button } from '../Common/Inputs'

// Helper styling wrap of wishlist for User Dasboard page
const MyWishlist = props => {
    return (
        <>
            {props.wishlistCourses.map(course =>
                <CourseRow
                    key={course._id}
                    title={course.title}
                    image={course.image}
                    sidecarComponent={<Button label={'View'} linkTo={`course-search/${course._id}`} />}>
                    <CourseRowWishlistDetails courseCost={course.cost} />
                </CourseRow>
            )}
        </>
    )
}

MyWishlist.propTypes = {
    wishlistCourses: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default MyWishlist
