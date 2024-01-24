import React from 'react'
import PropTypes from 'prop-types'
import { CourseRow } from '../Common/CourseRow'
import { Button } from '../Common/Inputs'
import Api from '../../api';

const AllComments = props => {

    // Calls API to delete comment
    const deleteComment = (comment, course) => {
        const toDelete = { courseId: course._id, userId: comment.userID }
        Api.Course.deleteComment(toDelete)
            .then(res => {
                // updates page
                props.setLastUpdate(Date.now())
            })

    }
    return (
        <>
            {
                props.allCourses.map(course =>
                    <div key={course.id}>
                        {course.reviews.map(review =>
                            <CourseRow
                                key={review.comment + course.id}
                                title={review.comment}
                                image={course.image}
                                sidecarComponent={
                                    <Button label={'Delete Comment'} onClick={() => { deleteComment(review, course) }} warning />
                                }
                            />)}
                    </div>
                )
            }
        </>
    )
}

AllComments.propTypes = {
    allCourses: PropTypes.arrayOf(PropTypes.object,).isRequired,
}

export default AllComments
