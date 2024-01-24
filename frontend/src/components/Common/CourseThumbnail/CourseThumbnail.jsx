import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import defaultCourseImage from './course-image.png';
import styled from 'styled-components'

// Wrapper for the card display
const Wrapper = styled.div`
    width: 300px;
    height: 350px;
    margin-top: ${props => props.margin};
    margin-right: ${props => props.margin};
    border: 1px solid #f4f6f8;
    border-radius: 16px;
    background-color: white;    
    overflow: hidden;
`

// Link to the course details page. Doubles as a flexbox wrapper use to dynamically size description section
const CourseLink = styled(Link)`
    display: flex;
    flex-direction: column;
    height: 100%;
    color: #222222;
    text-decoration: none;
`

const CourseImage = styled.img`
    width: 100%;
    height: 210px;
    object-fit: cover;
`

const CourseTitleText = styled.div`
    text-align: left;
    text-decoration: none;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 1.3rem;
    font-weight: 500;
    line-height: 1.3rem;
    color: ${({ theme }) => theme.palette.text.heavy};
`

// Wrapper for the description section of the course card
const CourseDetailsWrapper = styled.div`
    display: flex; 
    flex-direction: column;
    flex-grow: 1; 

    padding: 10px 12px;
`

// Expanding component uses up any remaining space
const ExpandingDescriptionWrapper = styled.div`
    padding-top: 4px;
    flex-grow: 1;
`

// Styling wrap for course thumbnail
const CourseThumbnail = (props) => {
    return (
        <Wrapper margin={props.margin}>
            <CourseLink key={props.id} to={`${props.linkBaseEndpoint}/${props.id}`} className='link'>
                <CourseImage src={props.image} alt='courseImg' />

                <CourseDetailsWrapper>
                    <CourseTitleText>
                        {props.title}
                    </CourseTitleText>

                    <ExpandingDescriptionWrapper>
                        {props.children}
                    </ExpandingDescriptionWrapper>
                </CourseDetailsWrapper>
            </CourseLink>
        </Wrapper>
    );
};

CourseThumbnail.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.node,
    title: PropTypes.string.isRequired,
    margin: PropTypes.string,
    children: PropTypes.node,
    linkBaseEndpoint: PropTypes.string,
}

CourseThumbnail.defaultProps = {
    margin: '20px',
    image: defaultCourseImage,
    linkBaseEndpoint: 'course-search'
}


export default CourseThumbnail;