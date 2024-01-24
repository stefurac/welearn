import React from 'react';
import UserComment from './UserComment';
import UnderlinedHeader from '../Common/UnderlinedHeader/UnderlinedHeader';
import styled from 'styled-components';

import Api from '../../api';
import { errorToast } from '../../../src/utils';

const UserCommentWrapper = styled.div`
    width: 95%;
    min-height: 50px;
    padding: 1px 10px;
    margin: 17px 1px;
    border: 1px solid ${({ theme }) => theme.palette.background};
    border-radius 10px 10px; 
    background-color: ${({ theme }) => theme.palette.background};
    word-wrap: break-word;
    position: relative;
`

const DeleteCommentButton = styled.div
    `
    position: absolute;
    top: 16px;
    right: 14px;
    color: #6848db;
    &:hover {
        color: #9e8cde;
        cursor: pointer;
    }
`

// Helper comments component for course details page
const CourseComments = (props) => {
    // let courseReviews = props.courseReviews;

    let course = props.course
    let user = props.user
    // const user = Api.User.getUser();
    // Use hooks to keep track of reviews
    // When posting a new review, add it to hooks and render

    // delete comment from the course
    const deleteComment = (course) => {
        const toDelete = {courseId:course._id,userId:user.id}
        Api.Course.deleteComment(toDelete)
        .then(comment => {
            console.log(comment);
          if (comment.message) 
              {errorToast(comment.message);}
              props.setLastUpdate(Date.now())
        })
        
    }
    return (
        <div>
            <UnderlinedHeader>
                Reviews
            </UnderlinedHeader>

            {
                course.reviews ? course.reviews.map(courseReview => (
                    <UserCommentWrapper key={courseReview.id}>
                        <UserComment
                            // reviewId={courseReview.id}
                            userId={courseReview.id}
                            username={courseReview.username}
                            rating={courseReview.rating}
                            comment={courseReview.comment}
                        />
                        {
                            user.id === courseReview.userID ?
                                <DeleteCommentButton onClick={() => deleteComment(props.course, courseReview)}>
                                    Delete
                        </DeleteCommentButton> : null
                        }
                    </UserCommentWrapper>
                )) : ''}
        </div>
    );
};

export default CourseComments;
