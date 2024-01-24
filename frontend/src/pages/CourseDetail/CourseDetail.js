import { React, useState, useEffect } from 'react';
import CourseHeader from '../../components/CourseDetail/CourseHeader';
import CourseDescription from '../../components/CourseDetail/CourseDescription';
import CourseLearning from '../../components/CourseDetail/CourseLearning';
import CourseComments from '../../components/CourseDetail/CourseComments';
import styled from 'styled-components';
import UnderlinedHeader from '../../components/Common/UnderlinedHeader/UnderlinedHeader'
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import { getUser } from '../../store/selectors'
import Api from '../../api'
import { Button } from '../../components/Common/Inputs'
import { errorToast } from '../../utils'
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';


const BackLink = styled(Link)`
    text-decoration: none;
    color: black;
`

const CourseHeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;

    width: 95%;
    min-height: 250px;
    padding: 20px 20px;
    margin: 10px;
    margin-top: 60px;
    border: 1px solid white;
    border-radius 20px 20px; 

    background-color: ${({ theme }) => theme.palette.sideNavBackground};
`

const CourseDescriptionAndCourseLearningWrapper = styled.div`
    width: 96%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
`

const CourseDescriptionWrapper = styled.div`
    width: 70%;
    margin: 10px;
    padding: 20px 20px;
    border: 1px solid white;
    border-radius 20px 20px; 

    background-color: ${({ theme }) => theme.palette.sideNavBackground};
`

const CourseLearningWrapper = styled.div`
    width: 30%;
    margin: 10px;
    padding: 20px 20px;
    border: 1px solid white;
    border-radius 20px 20px; 

    background-color: ${({ theme }) => theme.palette.sideNavBackground};
`

const CourseCommentsWrapper = styled.div`
    width: 65%;
    min-height: 200px;
    margin: 10px;
    padding: 20px 20px;
    border: 1px solid white;
    border-radius 20px 20px; 

    background-color: ${({ theme }) => theme.palette.sideNavBackground};
`

const CommentWrapper = styled.form
    `
    margin-top: 20px;
`

/*
References: 
https://stackoverflow.com/questions/46981931/cursor-in-textbox-located-in-the-middle-instead-of-the-top
https://stackoverflow.com/questions/16156594/how-to-change-border-color-of-textarea-on-focus
*/
const Input = styled.textarea
    `
    display: block;
    resize: none;
    margin: 3px;
    width: 95%;
    min-height: 100px;
    margin-bottom: 10px;
    font-family: sans-serif;
    font-size: 0.9rem;
    letter-spacing: 0.2px;
    &:focus {
        outline: none;
    }
`
const useStyles = makeStyles((theme) => ({
    userRating: {
        color: '#6848db'
    },
}));

// Course summary page
export const CourseDetail = (props) => {
    const classes = useStyles();
    let { id } = useParams();
    const [course, setCourse] = useState({});
    const user = useSelector(getUser);
    const [lastUpdate, setLastUpdate] = useState(Date.now())
    const [review, setReview] = useState({
        rating: parseFloat(course.averageRating) || null,
        comment: ''
    })

    useEffect(() => {
        // gets summary of all published courses
        Api.Course.getCoursesHeadsById(id)
            .then(course => {
                setCourse(course)
                course.reviews.forEach(comment => {
                    if(comment.userID === user.id) {
                        setReview({...review, rating: parseFloat(comment.rating)})
                    }
                });

            })
    }, [lastUpdate]);

    // handles a rating made by user to course
    const handleRating = (newValue) => {
        Api.Main.rateCourse(course._id, user.id, newValue)
            .then(res => {
                if (res.success) {
                    setLastUpdate(Date.now())
                }
            })

    }

    // submits the rating and comment made by user to database
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const comment = {
            courseId: course._id,
            userId: user.id,
            username: user.username,
            comment: `Rating: ${review.rating} 
             Review: ${review.comment}`,
            rating: review.rating
        }
        Api.Course.addComment(comment)
            .then(comment => {
                setLastUpdate(Date.now())
                if (comment.message) { errorToast(comment.message); }
            })
            .then(handleRating(review.rating))
            .finally(
                setLastUpdate(Date.now())
            )
        e.target.reset(); // Reference: https://stackoverflow.com/questions/997774/how-do-you-clear-a-plain-html-form-after-onsubmit
    }




    return (
        <div className='course-detail'>
            {/* <PointsDisplay/> */}

            <BackLink key={id} to={`/course-search`} className='link'>
                <UnderlinedHeader>
                    Back to Search
                </UnderlinedHeader>
            </BackLink>

            <CourseHeaderWrapper>
                <CourseHeader
                    course={course}
                    user={user}
                    setLastUpdate={setLastUpdate}
                />
            </CourseHeaderWrapper>
            <CourseDescriptionAndCourseLearningWrapper>
                <CourseDescriptionWrapper>
                    <CourseDescription
                        description={course.description}
                    />
                </CourseDescriptionWrapper>
                <CourseLearningWrapper>
                    <CourseLearning
                        courseLearning={course.learningObjective}
                    />
                </CourseLearningWrapper>
            </CourseDescriptionAndCourseLearningWrapper>
            <CourseCommentsWrapper onSubmit={handleCommentSubmit}>
                <CourseComments
                    course={course}
                    user={user}
                    setLastUpdate={setLastUpdate}
                // courseReviews={course.reviews}
                />
                <CommentWrapper>
                    <Rating
                        className={classes.userRating}
                        value={review.rating}
                        precision={0.5}
                        name="size-medium"
                        size="medium"
                        onChange={(event, newValue) => setReview({ ...review, rating: newValue })}
                    />
                    <Input placeholder="Tell us what you think!"
                        onChange={(event) => { setReview({ ...review, comment: event.target.value }) }} />
                    <Button label={'Comment'} />
                </CommentWrapper>
            </CourseCommentsWrapper>
        </div>
    );
};

