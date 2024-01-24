import React, { useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { RichTextBox, InputLabel } from '../Common/Inputs'
import defaultImage from '../../assets/images/default-image.jpg'
import defaultVideo from '../../assets/images/default-video.png'

const MediaMaterialWrapper = styled.div`
    width: 100%;
    padding: 6px 8px;
    display: flex;
    justify-content: center;
    border-radius: 4px;
    border: 1px solid ${props => props.error ? props.theme.palette.warning : props.theme.palette.primary};
`

const ImageMaterial = styled.img`
    width: auto;
    height: 210px;
    border-radius: 16px;
    cursor: pointer;
`

const VideoMaterial = styled.video`
    width: auto;
    height: 210px;
    border-radius: 16px;
    cursor: pointer;
    outline: none;
`

const HiddenInput = styled.input`
    display: none;
`
// Helper materials (part of sections) component for course edit page
const CourseMaterial = (props) => {
    const hiddenInputRef = useRef()
    const { courseMaterial, handleMaterialChange, error } = props

    // loads data (image/text/video) from user uploads
    const loadDataFromFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => handleMaterialChange({ ...courseMaterial, content: reader.result })
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    switch (courseMaterial.type) {
        case 'text': {
            return (<>
                <InputLabel
                    label={'Text Material'}
                    error={error && error[courseMaterial.id]} />
                <RichTextBox
                    padding={'6px 8px'}
                    withBorder
                    value={courseMaterial.content}
                    error={error && error[courseMaterial.id]}
                    onChange={newValue => handleMaterialChange({ ...courseMaterial, content: newValue })} />
            </>)
        }
        case 'image': {
            return (<>
                <InputLabel
                    label={'Image Material'}
                    error={error && error[courseMaterial.id]} />
                <MediaMaterialWrapper error={error && error[courseMaterial.id]}>
                    <ImageMaterial
                        src={courseMaterial.content || defaultImage}
                        onClick={() => hiddenInputRef.current.click()} />
                    <HiddenInput
                        ref={hiddenInputRef}
                        type="file"
                        accept="image/*"
                        onChange={loadDataFromFile} />
                </MediaMaterialWrapper>
            </>)
        }
        case 'video': {
            return (<>
                <InputLabel
                    label={'Video Material'}
                    error={error && error[courseMaterial.id]} />
                <MediaMaterialWrapper error={error && error[courseMaterial.id]}>
                    {courseMaterial.content
                        ? (
                            <VideoMaterial
                                controls
                                onClick={(e) => { hiddenInputRef.current.click(); e.preventDefault(); }}>
                                <source src={courseMaterial.content} type="video/mp4"></source>
                            </VideoMaterial>
                        )
                        : (
                            <ImageMaterial
                                src={defaultVideo}
                                onClick={() => hiddenInputRef.current.click()} />
                        )}

                    <HiddenInput
                        ref={hiddenInputRef}
                        type="file"
                        accept="video/*"
                        onChange={loadDataFromFile} />
                </MediaMaterialWrapper>
            </>)
        }
        default: return <span>UNSUPPORTED CONTENT TYPE</span>
    }
}

CourseMaterial.propTypes = {
    courseMaterial: PropTypes.object.isRequired,
    handleMaterialChange: PropTypes.func.isRequired,
    error: PropTypes.object,
}

export default CourseMaterial
