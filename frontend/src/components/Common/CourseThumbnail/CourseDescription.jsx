import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
    userRating: {
        color: '#6848db',
        pointerEvents: 'none'
    },
}));

const CourseCostText = styled.div`
    text-align: left;
    text-decoration: none;

    font-family: ${({ theme }) => theme.typography.h5.fontFamily};
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1rem;
    color: ${({ theme }) => theme.palette.text.regular};
`

const RatingWrapper = styled.div
    `
    margin-top: 3px;
`

// Styling wrap for course desciption
const CourseDescription = (props) => {
    // Reference: https://www.joshwcomeau.com/snippets/react-hooks/use-toggle/
    const classes = useStyles();

    return (
        <div>
            <CourseCostText>
                <strong>{props.courseCost}</strong>  WeLearn points
            </CourseCostText>
            <RatingWrapper>
                <Rating
                    className={classes.userRating}
                    name="size-medium"
                    value={parseFloat(props.courseRating)}
                    precision={0.5}
                    size="medium"
                />
            </RatingWrapper>
        </div>
    )
}

CourseDescription.propTypes = {
    courseCost: PropTypes.number.isRequired,
}

export default CourseDescription
