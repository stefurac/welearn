import { React, useState, useEffect } from 'react';
import HomeBody from '../../components/Home/HomeBody';
import styled from 'styled-components';
import image from '../../assets/images/landing-page-background.png';
import { Link } from 'react-router-dom';
import LabelledSection from '../../components/Common/LabelledSection/LabelledSection';
import Api from '../../api'

const HomeText = styled.h2`
    font-family: ${({ theme }) => theme.typography.fontFamily};
    padding-top: 2%;
    margin-bottom: 2rem;
    padding-top: 1%;
`

const HomeContainer = styled.div`
    margin-top: 4%;
    background-image:url(${image});
    background-position: unset;
    background-size: 90%;
    background-repeat: no-repeat;
    height: 100%;
`

const CourseImage = styled.img`
    width: 100%;
    height: 210px;
    width: 250px;
    margin:1rem;
    object-fit: cover;
    border-radius: 16px;
    box-shadow: 1px 5px 10px 1px rgba(0,0,0,0.39);
`

const CourseTitle = styled.div`
    position: absolute;
    color: white;
    font-size: 20px;
    text-align: center;
    width: 100%;
    width: 100%;
    height: 210px;
    width: 250px;
    margin:1rem;
    object-fit: cover;
    opacity: 0;
    transition: .5s ease;
    background-color: #6848db;
`

const TopCoursesWrapper = styled.div
`
    width: 60%;
    height: 30%;
    display: flex;
    flex-direction: row;
`

const ThumbnailWrap = styled.div`
    float: left;
    cursor: pointer;
    transition: transform .5s ease;
    &: hover {
        transform: scale(1.1);
        
    } 
    &: hover ${CourseTitle}{
        opacity: 1;
        
    } 
    max-height: 3rem;
`
const CourseLink = styled(Link)`
    display: flex;
    flex-direction: column;
    height: 100%;
    color: #222222;
    text-decoration: none;
`
// Home page 
export const Home = props => {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        Api.Course.getAllCourses({ publishedOnly: true })
            .then(courses => setCourses(courses))
    }, []);
    const top = courses.slice(0,2)
    return (
        <HomeContainer>
            <HomeText>
                <HomeBody
                    title="Sign up today and start sharing your knowledge."
                    subtitle="The free, online collaborative e-learning platform"
                />
            </HomeText>
            <LabelledSection label={'Top Courses'}>
            
                <TopCoursesWrapper>
                {top.map((course) =>
                    <ThumbnailWrap>
                        <Link to="/login-prompt">
                            <CourseTitle>{course.title}</CourseTitle>
                            <CourseLink key={props.id} to="/login-prompt" className='link'>
                                <CourseImage src={course.image} alt='courseImg' />
                            </CourseLink>
                        </Link>
                    </ThumbnailWrap>
                )}
                </TopCoursesWrapper>
                </LabelledSection>
        </HomeContainer>
    )
};
export default Home;

