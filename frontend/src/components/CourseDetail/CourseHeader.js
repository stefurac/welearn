
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux'
import { updateCurrentUser } from '../../store/actions'
import { Button } from '../Common/Inputs'
import { errorToast } from '../../utils'
import Api from '../../api/index'

const CourseHeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin: 15px;
`

const CourseImageWrapper = styled.img`
    object-fit: cover;
    width: 250px;
    height: 200px;
    margin-right: 20px;
    border-radius: 16px;
`

const CourseTextAndUserActionsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const CourseTextWrapper = styled.div`
    flex-grow: 1;
    flex-basis: 0;
`

const UserActionsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    bottom: 0;
`

const CourseAuthorWrapper = styled.div`
    color: ${({ theme }) => theme.palette.text.regular};
    font-weight: 800;
`

const CoursePriceText = styled.h6`
    color: ${({ theme }) => theme.palette.text.regular};
`
// Helper header component for course details page
const CourseHeader = ({ course, user, setLastUpdate }) => {
    const dispatch = useDispatch();
    // Reference: https://www.joshwcomeau.com/snippets/react-hooks/use-toggle/


    const handlePurchase = () => {
        // Update the course DB
        Api.Main.purchaseCourse(course._id)
            .then(res => {
                if (res.success) {
                    dispatch(updateCurrentUser(res.user))
                    setLastUpdate(Date.now())
                }
                // An error occurred
                else {
                    errorToast(res.message)
                }
            })
    }


    const handleWishlist = () => {
        Api.Main.toggleWishlistCourse(course._id)
            .then(res => {
                if (res.success) {
                    dispatch(updateCurrentUser(res.user))
                    setLastUpdate(Date.now())
                }
                // An error occurred
                else {
                    errorToast(res.message)
                }
            })
    }

    return (
        <div>
            <CourseHeaderWrapper>
                <CourseImageWrapper src={course.image} />
                <CourseTextAndUserActionsWrapper>
                    <CourseTextWrapper>
                        <h3>{course.title}</h3>
                        <CourseAuthorWrapper>
                            {/* This should be clickable and lead to the author's profile */}
                            <h5>{course.author}</h5>
                            <CoursePriceText><strong>{course.cost}</strong> WeLearn Points</CoursePriceText>
                        </CourseAuthorWrapper>

                    </CourseTextWrapper>

                    <UserActionsWrapper>
                        <div>
                            <Button
                                width={'110px'}
                                margin={'0 16px 0 0'}
                                label={user.boughtCourses.includes(course._id) ? 'Purchased' : 'Purchase'}
                                disabled={user.boughtCourses.includes(course._id)}
                                onClick={() => handlePurchase()} />
                            <Button
                                width={'110px'}
                                label={user.wishlistedCourses.includes(course._id) ? 'Wishlisted' : 'Wishlist'}
                                filled={user.wishlistedCourses.includes(course._id)}
                                onClick={() => handleWishlist()} />
                        </div>
                    </UserActionsWrapper>
                </CourseTextAndUserActionsWrapper>
            </CourseHeaderWrapper>
        </div>
    );
};

export default CourseHeader;

/*
component1:
-course image


component2:
-text with course title, author, cost, rating


component3:
-course

*/