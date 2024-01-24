import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useParams, withRouter } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getActiveCourseData, getActiveCourseProgress, getActiveSectionIndex } from '../../store/selectors'
import { setActiveCourseSectionIndex, fetchActiveCourseDataAsync, saveCourseProgressAsync, incrementStudyTimeMinsAsync } from '../../store/actions'
import SideNav from '../SideNav/SideNav'
import SideNavButton from '../SideNav/SideNavButton'
import SectionButton from './SectionButton'
import StudyHeader, { CourseTitle, SectionTitle } from './StudyHeader'
import StudyBody from './StudyBody'
import { ReactComponent as BackArrowSVG } from '../../assets/icons/back-arrow.svg'
import { makeIconComponent } from '../../utils'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const Expander = styled.div`
    flex-basis: 0;
    flex-grow: 1;
`

const STUDY_TIME_HEARTBEAT_SECONDS = 10
const STUDY_TIME_HEARTBEAT_MILLIS = STUDY_TIME_HEARTBEAT_SECONDS * 1000
const STUDY_TIME_HEARTBEAT_MINS = STUDY_TIME_HEARTBEAT_MILLIS / (60 * 1000)

//Course study page
export const CourseStudy = props => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const activeSectionIndex = useSelector(getActiveSectionIndex)
    const { title, sections } = useSelector(getActiveCourseData)
    const courseProgress = useSelector(getActiveCourseProgress)

    // Convert sectionProgress array to object
    const sectionProgressMap = useMemo(() => {
        const dict = Object.fromEntries(sections.map((section, i) => [section._id, { index: i, completed: false }]))
        courseProgress.sectionProgress.forEach(sp => { if (dict[sp.sectionId]) dict[sp.sectionId].completed = sp.completed })
        return dict
    }, [sections, courseProgress])

    // Fetch data on page load
    useEffect(() => {
        // Load the data for the page
        dispatch(fetchActiveCourseDataAsync(id, props.history))
        // Update the course progress, which will automatically set the lastUsed time
        setTimeout(() => dispatch(saveCourseProgressAsync({})), 2000)
    }, [id])

    // Set up a heart-beat to keep track of study time
    useEffect(() => {
        const intervalID = setInterval(() => {
            dispatch(incrementStudyTimeMinsAsync(STUDY_TIME_HEARTBEAT_MINS))
        }, STUDY_TIME_HEARTBEAT_MILLIS)

        return () => clearInterval(intervalID)
    }, [])

    const SectionButtons = sections.map((s, i) =>
        <SectionButton
            key={s._id}
            label={s.title}
            selected={i === activeSectionIndex}
            completed={sectionProgressMap[s._id].completed}
            onClick={() => dispatch(setActiveCourseSectionIndex(i))} />)
    const BackButton = <SideNavButton icon={makeIconComponent(BackArrowSVG)} label={'Back'} path={'/dashboard'} />

    return (
        <SideNav
            mainComponents={SectionButtons}
            endComponent={BackButton}>
            {sections.length === 0
                ? (<Wrapper>
                    <CourseTitle>{title}</CourseTitle>
                    <SectionTitle>This course is empty</SectionTitle>
                </Wrapper>)
                : (<Wrapper>
                    <StudyHeader sectionProgressMap={sectionProgressMap} />
                    <Expander>
                        <StudyBody />
                    </Expander>
                </Wrapper>)
            }
        </SideNav>
    )
}

export default withRouter(CourseStudy)
