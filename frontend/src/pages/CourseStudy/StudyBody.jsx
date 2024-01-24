import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { getActiveCourseData, getActiveSectionIndex } from '../../store/selectors'
import { RichTextBox } from '../../components/Common/Inputs'

const Wrapper = styled.div`
    margin-top: 24px;
    padding: 16px;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.palette.sideNavBackground};
`

const SectionWrapper = styled.div`
    padding: 8px 0;
`

const MediaWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const ImageSection = styled.img`
    width: 500px;
    height: auto;
    max-height: 400px;
    object-fit: contain;
    border-radius: 16px;
`

const VideoSection = styled.video`
    width: 500px;
    height: auto;
    border-radius: 16px;
`
// Component 'factory' for study body
const generateComponent = courseMaterial => {
    switch (courseMaterial.type) {
        case 'text': return <RichTextBox value={courseMaterial.content} readOnly={true} />
        case 'image': return (
            <MediaWrapper>
                <ImageSection src={courseMaterial.content} />
            </MediaWrapper>
        )
        case 'video': return (
            <MediaWrapper>
                <VideoSection controls>
                    <source src={courseMaterial.content} type="video/mp4"></source>
                </VideoSection>
            </MediaWrapper>
        )
        default: return <></>
    }
}

// Helper styling wrap for course study page
const StudyBody = props => {
    const activeSectionIndex = useSelector(getActiveSectionIndex)
    const { sections } = useSelector(getActiveCourseData)
    return (
        <Wrapper>
            {sections[activeSectionIndex].courseMaterials.map(material =>
                <SectionWrapper key={material.id}>{generateComponent(material)}</SectionWrapper>)}
        </Wrapper>
    )
}

StudyBody.propTypes = {

}

export default StudyBody
