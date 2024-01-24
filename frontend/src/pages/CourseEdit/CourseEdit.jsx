import React, { useState, useRef, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";
import styled from 'styled-components'
import { Node } from 'slate'
import LabelledSection from '../../components/Common/LabelledSection/LabelledSection'
import defaultImage from '../../assets/images/default-image.jpg'
import { TextBox, TextField, NumberInput, Button, InputLabel } from '../../components/Common/Inputs'
import CourseSection from '../../components/CourseEdit/CourseSection'
import { generateUuid, errorToast } from '../../utils'
import { useDispatch } from 'react-redux'
import Api from '../../api'

const EditorWrapper = styled.div`
    width: 100%;
    height: calc(100% - 80px);
    overflow-y: auto;
`

const ControlBar = styled.div`
    position: fixed;
    left: ${({ theme }) => theme.constants.sideNav.width};
    bottom: 0;

    width: calc(100% - ${({ theme }) => theme.constants.sideNav.width});
    height: 80px;
    padding: 0 16px;
    margin-top: 16px;
    background-color: ${({ theme }) => theme.palette.sideNavBackground};

    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const OverviewWrapper = styled.div`
    width: 100%;
    display: flex;
`
const LeftButtonWrapper = styled.div`
    position: absolute;
    left: 1rem;
`

const CourseImageWrapper = styled.div`
    width: 210px;
    height: 210px;
    display: flex;
    flex-direction: column;
`

const ImageInnerWrapper = styled.div`
    width: 100%;
    height: 100%;
    flex-grow: 1;
    flex-basis: 0;
    overflow: hidden;
`

const CourseImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
    cursor: pointer;
    border: 1px solid ${props => props.error ? ({ theme }) => theme.palette.warning : 'transparent'};
    autofocus:true;
`

const HiddenInput = styled.input`
    display: none;
`

const OverviewInnerSection = styled.div`
    flex-basis: 0;
    flex-grow: ${props => props.flexGrow};

    padding-left: 16px;
    display: flex;
    flex-direction: column;
`

const CourseMaterialWrapper = styled.div`
    width: 100%;
    padding-left: 64px;
`
// Course edit page
export const CourseEdit = props => {
    // IMPORTANT: With backend, coursedata should be pulled from server using ID
    // currently, the entire data object is passed in params
    let { id } = useParams();
    const hiddenInputRef = useRef()
    const [courseData, setCourseData] = useState({ sections: [] });
    const [errors, setErrors] = useState({});
    const history = useHistory();

    useEffect(() => {
        // Get full course content by id
        Api.Course.getCoursesById(id)
            .then(course => setCourseData(course))
    }, [])

    // handles image upload
    const loadImageFromFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => handleInfoChange(reader.result, "image")
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    // handles info change based on user input
    const handleInfoChange = (value, path) => {
        const temp = { ...courseData, [path]: value };
        setCourseData(temp);

        // Re-validate form if there were previously errors
        if (errors && Object.keys(errors).length > 0) {
            validateCourse(temp)
        }
    }

    // handles a change in sections based on user input
    const handleSectionChange = (updatedSection) => {
        let copyCourse = Object.assign({}, courseData);
        const index = copyCourse.sections.findIndex(section => section.id === updatedSection.id);
        if (index != -1) {
            copyCourse.sections[index] = updatedSection;
        } else {
            copyCourse.sections.push(updatedSection);
        }
        setCourseData(copyCourse);

        // Re-validate form if there were previously errors
        if (errors && Object.keys(errors).length > 0) {
            validateCourse(copyCourse)
        }
    }

    // Adds a section to course
    const addSection = () => {
        const newSection = {
            id: generateUuid(),
            title: "",
            courseMaterials: []
        }
        handleSectionChange(newSection);
    }

    // Deletes the section from course
    const deleteSection = (id) => {
        const newSections = courseData.sections.filter(section => section.id !== id);
        setCourseData({ ...courseData, sections: newSections });
    }

    // validates if course has all neccessary fields
    const validateCourse = courseData => {
        let formIsValid = true;
        let errors = {};

        // Validate Course Overview Fields
        if (!courseData.title || courseData.title.length === 0) {
            formIsValid = false;
            errors.title = "Cannot be empty";
        }
        if (!courseData.description || courseData.description.length === 0) {
            formIsValid = false;
            errors.description = "Cannot be empty";
        }
        if (!courseData.learningObjective || courseData.learningObjective.length === 0) {
            formIsValid = false;
            errors.learningObjective = "Cannot be empty";
        }
        if (!courseData.cost) {
            formIsValid = false;
            errors.cost = "Cannot be empty";
        }
        if (!courseData.image) {
            formIsValid = false;
            errors.image = "Upload an image";
        }

        // Validate Sections
        if (courseData.sections) {
            for (let i = 0; i < courseData.sections.length; i++) {
                const section = courseData.sections[i];
                errors[section.id] = {};

                if (!section.title || section.title.length === 0) {
                    formIsValid = false;
                    errors[section.id].title = "Cannot be empty";
                }

                // Validate Course Materials
                if (section.courseMaterials) {
                    for (let j = 0; j < section.courseMaterials.length; j++) {
                        const courseMaterial = section.courseMaterials[j]
                        if (courseMaterial.type === 'text') {
                            if (!courseMaterial.content || courseMaterial.content.map(n => Node.string(n)).join() === '') {
                                formIsValid = false;
                                errors[section.id][courseMaterial.id] = "Cannot be empty";
                            }
                        }
                        else if (!courseMaterial.content || courseMaterial.content.length === 0) {
                            formIsValid = false;
                            errors[section.id][courseMaterial.id] = `Upload ${courseMaterial.type === 'image' ? 'an image' : 'a video'}`
                        }
                    }
                }
            }
        }

        setErrors(errors);
        return formIsValid;
    }

    // Save user changes to database
    const onSave = () => {
        // handleInfoChange(new Date().toLocaleString("en-US"), "lastModified")
        if (!validateCourse(courseData)) {
            errorToast("Invalid fields", "top-right")
            return;
        }
        Api.Course.updateCourse(courseData._id, courseData)
            .then(res => {
                history.push('/creator')
            })
        //dispatch(updateCourse(courseData));
    }

    // Downloads current course as JSON file
    const onDownload = () => {
        const date = new Date().toLocaleString("en-US");
        setCourseData({ ...courseData, lastModified: date });
        if (!validateCourse(courseData)) {
            errorToast("Invalid fields", "top-right")
            return;
        }
        var data = new Blob([JSON.stringify(courseData, null, '\t')], { type: 'application/json' });
        var csvURL = window.URL.createObjectURL(data);
        var tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'course.json');
        tempLink.click();
    }

    // Cancell all changes
    const onCancel = () => {
        Api.Course.getCoursesById(id)
            .then(course => {
                // If the course is the default invalid skeleton course provided by DB, then delete on cancel
                if (!course.description && !course.learningObjective) {
                    Api.Course.deleteCourse(id)
                        .then(res => history.push('/creator'))
                } else {
                    history.push('/creator')
                }
            })
    }

    return (<EditorWrapper>

        <LabelledSection label={'Overview'} padded filled>
            <OverviewWrapper>
                <CourseImageWrapper>
                    <InputLabel
                        label={'Course Image'}
                        error={errors.image} />
                    <ImageInnerWrapper>
                        <CourseImage
                            src={courseData.image || defaultImage}
                            error={errors.image}
                            onClick={() => hiddenInputRef.current.click()} />
                    </ImageInnerWrapper>
                    <HiddenInput
                        ref={hiddenInputRef}
                        type="file"
                        accept="image/*"
                        onChange={loadImageFromFile} />
                </CourseImageWrapper>

                <OverviewInnerSection flexGrow={2}>
                    <TextBox
                        label={'Course Title'}
                        value={courseData.title}
                        error={errors.title}
                        onChange={e => handleInfoChange(e.target.value, "title")} />
                    <TextField
                        label={'Course Description'}
                        margin={'8px 0 0 0'}
                        value={courseData.description}
                        error={errors.description}
                        onChange={e => handleInfoChange(e.target.value, "description")} />
                </OverviewInnerSection>

                <OverviewInnerSection flexGrow={1}>
                    <NumberInput
                        label={'Course Cost'}
                        value={courseData.cost}
                        error={errors.cost}
                        onChange={e => handleInfoChange(e.target.value >= 0 ? e.target.value : 0, "cost")} />
                    <TextField
                        label={'What Will be Taught'}
                        margin={'8px 0 0 0'}
                        value={courseData.learningObjective}
                        error={errors.learningObjective}
                        onChange={e => handleInfoChange(e.target.value, "learningObjective")} />
                </OverviewInnerSection>
            </OverviewWrapper>
        </LabelledSection>

        <LabelledSection
            label={'Course Material'}
            topPadding
        >
            <CourseMaterialWrapper>
                {courseData.sections.map((section, i) =>
                    <CourseSection
                        key={section.id}
                        section={section}
                        index={i}
                        error={errors[section.id]}
                        handleSectionChange={handleSectionChange}
                        deleteSection={deleteSection} />)}
            </CourseMaterialWrapper>
        </LabelledSection>

        <ControlBar>
            <LeftButtonWrapper>
                <Button label={'Add Section'} margin={'0 16px 0 0'} onClick={addSection} />
            </LeftButtonWrapper>

            <Button label={'Download'} margin={'0 0 0 16px'} onClick={onDownload} filled />
            <Button label={'Save'} margin={'0 0 0 16px'} onClick={onSave} filled />
            <Button label={'Cancel'} margin={'0 0 0 16px'} onClick={onCancel} filled warning />
        </ControlBar>

    </EditorWrapper>)
}

CourseEdit.propTypes = {

}

export default CourseEdit
