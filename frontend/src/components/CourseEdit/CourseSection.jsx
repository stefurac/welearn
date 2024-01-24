import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import LabelledSection from '../Common/LabelledSection/LabelledSection'
import { TextBox, Button, DropdownButton } from '../Common/Inputs'
import { BASE_VALUE } from '../Common/Inputs/RichTextBox/RichTextBox'
import CourseMaterial from './CourseMaterial'
import { generateUuid } from '../../utils'

const ButtonGroup = styled.div`
    display: flex;
`

const SectionWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: top;
    padding-top: 16px;
`

const Expander = styled.div`
    flex-basis: 0;
    flex-grow: 1;
`
// Helper sections component for course edit page
const CourseSection = props => {
    const { section, handleSectionChange, deleteSection, error } = props

    // handles input change in section info
    const handleInfoChange = (value, path) => {
        const temp = { ...section, [path]: value };
        handleSectionChange(temp);
    }

    // handles input change in materials
    const handleMaterialChange = (updatedMaterial) => {
        let copySection = Object.assign({}, section);
        const index = section.courseMaterials.findIndex(material => material.id === updatedMaterial.id);
        if (index != -1) {
            section.courseMaterials[index] = updatedMaterial;
        } else {
            section.courseMaterials.push(updatedMaterial);
        }
        handleSectionChange(copySection)
    }

    // adds new material to section
    const addMaterial = (type) => {
        const newMaterial = {
            id: generateUuid(),
            type: type,
            content: ""
        }

        // Rich text requires a specific structure to be followed, even for the empty string
        if (type === 'text') {
            newMaterial.content = BASE_VALUE
        }

        handleMaterialChange(newMaterial);
    }
    
    // deletes material from section
    const deleteMaterial = (id) => {
        const newMaterials = section.courseMaterials.filter(material => material.id !== id);
        handleSectionChange({ ...section, courseMaterials: newMaterials });
    }

    const sectionDropdownOptions = [
        { label: 'Add Text', onClick: () => addMaterial('text') },
        { label: 'Add Image', onClick: () => addMaterial('image') },
        { label: 'Add Video', onClick: () => addMaterial('video') },
    ]

    return (
        <LabelledSection
            label={`Section ${props.index + 1}`}
            topPadding={props.index > 0}
            padded
            filled
            sidecarComponent={
                <ButtonGroup>
                    <DropdownButton buttonOptions={sectionDropdownOptions} />
                    <Button
                        label={'Remove'}
                        height={'38px'}
                        width={'118px'}
                        margin={'0 16px 0 8px'}
                        warning
                        onClick={() => deleteSection(section.id)} />
                </ButtonGroup>
            }>
            <TextBox
                label={'Section Title'}
                value={section.title}
                error={error && error.title}
                onChange={e => handleInfoChange(e.target.value, "title")} />
            {section.courseMaterials.map((courseMaterial, i) =>
                <SectionWrapper key={courseMaterial.id}>
                    <Expander>
                        <CourseMaterial
                            courseMaterial={courseMaterial}
                            handleMaterialChange={handleMaterialChange}
                            error={error} />
                    </Expander>
                    <Button
                        label={'Remove'}
                        height={'38px'}
                        width={'118px'}
                        margin={'16px 0 0 8px'}
                        warning
                        onClick={() => deleteMaterial(courseMaterial.id)} />
                </SectionWrapper>
            )}
        </LabelledSection>
    )
}

CourseSection.propTypes = {
    section: PropTypes.object.isRequired,
    handleSectionChange: PropTypes.func.isRequired,
    deleteSection: PropTypes.func.isRequired,
    error: PropTypes.object,
}

export default CourseSection
