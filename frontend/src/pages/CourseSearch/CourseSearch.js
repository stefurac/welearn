import { React, useState, useEffect } from 'react';
import { CourseThumbnail, CourseDescription } from '../../components/Common/CourseThumbnail';
import UnderlinedHeader from '../../components/Common/UnderlinedHeader/UnderlinedHeader'
import './CourseSearch.css';
import styled from 'styled-components';
import Api from '../../api/index'

const SearchBoxWrapper = styled.form
    `  
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
`

const Input = styled.textarea
    `   
    margin-top: 1px;
    height: 40px;
    padding: 8px; 
    font-family: sans-serif;
    font-size: 1.1rem;
    letter-spacing: 0.2px;
    resize: none;
    &:focus {
        outline: none;
    }
`

const SearchButton = styled.button
    `
    height: 42px;
    width: 70px;
    font-weight: 600;
    font-family: sans-serif;
    font-size 1rem;
    color: ${({ theme }) => theme.palette.primary};;
    background-color: white;
    border: 2.2px solid ${({ theme }) => theme.palette.primary};
    border-radius: 7px 7px;
    padding: 1.2px 5px;
    margin-left: 17px;
    &:hover {
        background-color: ${({ theme }) => theme.palette.primary};
        color: white;
        cursor: pointer;
    }
    &:focus {
        outline: none;
    }
`

const UnderlinedHeaderWrapper = styled.div
    `
`
const CardWrapper = styled.div
    `   transition: transform .5s ease;
        &: hover {
            transform: scale(1.05);
        }   
    `

// Course Search page
export const CourseSearch = () => {
    const [courses, setCourses] = useState([]);
    const [searchFilter, setSearchFilter] = useState('');

    // Used for the initial render of courses
    useEffect(() => {
        Api.Course.getAllCourses({ publishedOnly: true })
            .then(courses => setCourses(courses))
    }, []);

    // Used to re-render page when the user types a search filter in the search box
    useEffect(() => {
    }, [courses]);


    // References for search filter: 
    // https://dev.to/asimdahall/simple-search-form-in-react-using-hooks-42pg
    // https://www.youtube.com/watch?v=Q8JyF3wpsHc&ab_channel=D%27Coders
    const handleButtonSubmit = (e) => {
        e.preventDefault();
        let searchFilter = e.target[0].value;
        setSearchFilter(searchFilter)
    }

    const handleEnterKeySubmit = (searchFilter) => {
        setSearchFilter(searchFilter)
    }

    return (
        <div className='course-search'>
            <SearchBoxWrapper onSubmit={handleButtonSubmit}>
                <Input className="search" type="text" placeholder="Search for Courses..." onChange={e => handleEnterKeySubmit(e.target.value)} />
                <SearchButton type="submit">
                    Search
                </SearchButton>
            </SearchBoxWrapper>

            <br></br>
            <br></br>
            <UnderlinedHeaderWrapper>
                <UnderlinedHeader>
                    Results
                </UnderlinedHeader>
            </UnderlinedHeaderWrapper>
            <div className="displayedCourses">
                {
                    courses ? courses
                        .filter(course => course.title.toLowerCase().includes(searchFilter))
                        .map(course =>
                            <CardWrapper>
                                <CourseThumbnail key={course._id + course.title}
                                    id={course._id}
                                    title={course.title}
                                    courseAuthor={course.author}
                                    image={course.image}
                                >
                                    <CourseDescription
                                        courseCost={course.cost}
                                        courseRating={course.averageRating}
                                    />
                                </CourseThumbnail>
                            </CardWrapper>
                        ) : null
                }
            </div>
        </div>
    );
};

