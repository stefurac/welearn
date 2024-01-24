import React, { useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getActiveCourseData, getActiveSectionIndex } from '../../store/selectors'
import { setActiveCourseSectionIndex, setSectionCompletedAsync } from '../../store/actions'
import { Button } from '../../components/Common/Inputs'
import Underline from '../../components/Common/Underline/Underline'
import { ReactComponent as LeftChevronSVG } from '../../assets/icons/left-chevron.svg'
import { ReactComponent as RightChevronSVG } from '../../assets/icons/right-chevron.svg'

const withIconStyle = component => styled(component)`
    stroke-width: 3;
    margin: 0;
    width: 1rem;
    height: 1rem;
`
const LeftChevronIcon = withIconStyle(LeftChevronSVG)
const RightChevronIcon = withIconStyle(RightChevronSVG)

const FlexWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const CourseTitle = styled.h1`
    font-weight: 700;
`

export const SectionTitle = styled.h2`
    color: ${({ theme }) => theme.palette.text.regular}
`
// Helper styling wrap for course study pages
const StudyHeader = props => {
    const dispatch = useDispatch()
    const activeSectionIndex = useSelector(getActiveSectionIndex)
    const { title, sections } = useSelector(getActiveCourseData)

    const sectionProgressMap = props.sectionProgressMap
    const activeSectionId = useMemo(() => sections[activeSectionIndex]?._id, [sections, activeSectionIndex])

    const LeftButton = <Button
        margin={'0 1px 0 0'}
        borderRadius={'8px 0 0 8px'}
        disabled={activeSectionIndex === 0}
        onClick={() => dispatch(setActiveCourseSectionIndex(activeSectionIndex - 1))}
        filled>
        <LeftChevronIcon />
    </Button>
    const RightButton = <Button
        borderRadius={'0 8px 8px 0'}
        disabled={activeSectionIndex >= sections.length - 1}
        onClick={() => dispatch(setActiveCourseSectionIndex(activeSectionIndex + 1))}
        filled>
        <RightChevronIcon />
    </Button>
    const DoneButton = <Button
        label={sectionProgressMap[activeSectionId]?.completed ? 'Done' : 'Mark Section Done'}
        filled={sectionProgressMap[activeSectionId]?.completed}
        width={'190px'}
        fontSize={'1.18rem'}
        margin={'0 1px 0 0'}
        borderRadius={'0'}
        onClick={() => dispatch(setSectionCompletedAsync(activeSectionId, !sectionProgressMap[activeSectionId]?.completed))}>
        <LeftChevronIcon />
    </Button>

    return (
        <div>
            <CourseTitle>{title}</CourseTitle>
            <FlexWrapper>
                <div>
                    <SectionTitle>
                        {sections[activeSectionIndex].title}
                    </SectionTitle>
                    <Underline />
                </div>
                <div>
                    {LeftButton}{DoneButton}{RightButton}
                </div>
            </FlexWrapper>

        </div>
    )
}

StudyHeader.propTypes = {
    sectionProgressMap: PropTypes.object.isRequired,
}

export default StudyHeader
