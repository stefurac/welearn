import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import { Button, DropdownButton } from '../../components/Common/Inputs'
import LabelledSection from '../../components/Common/LabelledSection/LabelledSection'
import EmptyPlaceholder from '../../components/Common/EmptyPlaceholder/EmptyPlaceholder'
import { CourseRow, CourseRowCreatorDetails } from '../../components/Common/CourseRow'
import LineGraph from './LineGraph'
import Api from '../../api'
import { useDispatch, useSelector } from 'react-redux'
import { addCourse, updateUser } from '../../store/actions'
import { getUser } from '../../store/selectors'

// Setup a CSS grid
const GridContainer = styled.div`
    display: inline-grid;
    width: 100%;
    height: 100%;

    grid-template-columns: 66% 1fr;
    grid-template-rows: 1fr;
    column-gap: 24px;
    row-gap: 24px;

    justify-items: stretch;
    align-items: stretch;
`

// CSS grid items
const Col1 = styled.div`
    grid-row: 1 / span 1;
    grid-column: 1 / span 1; 
`
const Col2 = styled.div`
    grid-row: 1 / span 1;
    grid-column: 2 / span 1; 
`

const EmptyPlaceholderWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 128px;
`

const HiddenInput = styled.input`
    display: none;
`

// Create course page
export const CourseCreate = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const hiddenInputRef = useRef()
    const user = useSelector(getUser);
    const [lastUpdate, setLastUpdate] = useState(Date.now())
    const [createdCourses, setCreatedCourses] = useState([])
    const [creatorAnalytics, setCreatorAnalytics] = useState({})

    useEffect(() => {
        // gets courses and analytics created by user
        Api.Creator.getCreatedCourses(user.id)
            .then(courses => {
                setCreatedCourses(courses)
            })
        Api.Creator.getAnalytics()
            .then(analytics => setCreatorAnalytics(analytics))
    }, [lastUpdate])

    const DropdownOptions = [
        { label: 'Create Course', onClick: () => fromScratch() },
        { label: 'Create Course From File', onClick: () => hiddenInputRef.current.click() },
    ]

    // redirect to edit page
    const redirectEdit = (course) => {
        setLastUpdate(Date.now())
        history.push(`/creator/course-edit/${course._id}`);
    }

    // create course from scratch
    const fromScratch = () => {
        Api.Course.createCourse({})
            .then(course => {
                dispatch(addCourse(course))
                const c = user.createdCourses
                c.push(course._id)
                dispatch(updateUser({ ...user, createdCourses: c }))
                redirectEdit(course);
            })
    }

    // create course from template
    const fromTemplate = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = (e) => {
            console.log(e.target.result)
            Api.Course.createCourse(e.target.result)
                .then(course => {
                    dispatch(addCourse(course))
                    redirectEdit(course);
                })
        };
    };

    // Publishes/unpulishes a course
    const togglePublishedState = (course) => {
        Api.Course.updateCourse(course._id, { isPublished: !course.isPublished })
            .then(res => {
                setLastUpdate(Date.now())
            })
    }

    //deletes a course owned by user
    const deleteCourse = course => {
        Api.Course.deleteCourse(course._id)
            .then(res => {
                setLastUpdate(Date.now())
            })
    }

    // renders place holder for created courses
    const renderEmptyPlaceholder = () => (
        <EmptyPlaceholderWrapper>
            <EmptyPlaceholder
                maxHeight={'500px'}
                imageName={'teacher'}
                imageTitle={'Nothing to see'}
                headerComponent={<span>You haven't created a course yet!</span>}
                bodyComponent={<span>Courses you create will show up here where you can<br />then edit and preview them</span>} />
        </EmptyPlaceholderWrapper>
    )

    // renders for created courses
    const renderCreatedCourses = () => (
        createdCourses.map(course =>
            <CourseRow
                key={course._id}
                title={course.title}
                image={course.image}
                sidecarComponent={
                    <>
                        <Button label={'Edit'} margin={'0 8px 0 0'} onClick={() => redirectEdit(course)} />
                        <Button label={'Preview'} margin={'0 8px 0 0'} onClick={() => history.push(`course/${course._id}`)} />
                        <Button label={course.isPublished ? "Unpublish" : "Publish"}
                            width={'107px'} margin={'0 8px 0 0'}
                            onClick={() => togglePublishedState(course)}
                            filled={course.isPublished} />
                        <Button label={'Delete'} warning onClick={() => deleteCourse(course)} />
                    </>
                }>
                <CourseRowCreatorDetails
                    key={course._id}
                    lastModified={course.lastModified}
                    courseCost={course.cost}
                    revenue={course.collectiveRevenue || 0}
                    numStudents={course.numStudents}
                    collectiveStudyTime={course.collectiveStudyTime} />
            </CourseRow>)
    )

    return (
        <GridContainer>
            <Col1>
                <LabelledSection
                    label={'Created Courses'}
                    sidecarComponent={<DropdownButton buttonOptions={DropdownOptions} />}
                    expandHeight
                    scrollable>
                    {createdCourses.length === 0
                        ? renderEmptyPlaceholder()
                        : renderCreatedCourses()}
                </LabelledSection>
            </Col1>

            <Col2>
                <LabelledSection label={'Creator Analytics'} filled expandHeight>
                    <LineGraph timeSeries={creatorAnalytics.timeSeries} data={creatorAnalytics.newStudents} label={'New Students'} />
                    <LineGraph timeSeries={creatorAnalytics.timeSeries} data={creatorAnalytics.collectiveStudyTime} label={'Collective Study Time (mins)'} />
                    <LineGraph timeSeries={creatorAnalytics.timeSeries} data={creatorAnalytics.pointsRevenue} label={'Points Revenue'} />
                </LabelledSection>
            </Col2>
            <HiddenInput ref={hiddenInputRef} type="file" onChange={fromTemplate} />
        </GridContainer>
    );
};

export default CourseCreate