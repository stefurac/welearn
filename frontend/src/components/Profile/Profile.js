import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Button from '../Common/Inputs/Button';
import ProfileItem from './ProfileItem';
import Api from '../../api'

const ProfileWrapper = styled.div`
    display: flex;
    flex-display: column;
    border: 1px solid #f4f6f8;
    border-radius: 16px;
    background-color: white;  
    border-color: white;
`
const ProfilePictureWrapper = styled.img`
    border-radius: 16px;
    border-color: white;
    padding-bottom: 16px;
    width: 210px;
    height: 210px;
    display: flex;
    object-fit: cover;
    box-sizing: border-box;
`
const ProfileInfo = styled.ul`
    list-style: none;
`

const StyledInput = styled.textarea`
    font-family: ${({ theme }) => theme.typography.h4.fontFamily};
    height: 150px;
    width: 100%;
    margin-top: 5%;
    margin-bottom: 5%;
    padding: 2%;
    font-size: 14px;
    border-width: 1px;
    border-style: solid;
    resize: none;
    border-color: ${props => props.error ? 'red' : ({ theme }) => theme.palette.primary};
    &:focus {
        outline: 1px ${({ theme }) => theme.palette.primary};
        box-shadow: 0px 0px 8px ${({ theme }) => theme.palette.primary};
    };

`
const OuterButtonsWrapper = styled.div`
    display: flex;
    flex-direction: center;
    align-items: center;
`
const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 0.5;
    justify-content: space-between;
    margin-top: 5%;
`
const ProfileImageWrapper = styled.div`
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

const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    padding-bottom: 16px;
    object-fit: cover;
    border-radius: 16px;
    cursor: pointer;
    border: 1px solid ${props => props.error ? ({ theme }) => theme.palette.warning : 'transparent'};
    autofocus:true;
    box-sizing: border-box;
`

const HiddenInput = styled.input`
    display: none;
`
// Helper styling wrap of profile for User Profile page
export const Profile = props => {
    const hiddenInputRef = useRef()
    const [updating, setUpdating] = useState(false);
    const bioButtonText = updating ? "Save" : "Update"
    const isUpdating = () => {
        if (updating) {
            Api.User.updateUser(props.user)
                .then(user => {
                    setUpdating(false);
                    props.setLastUpdated(Date.now())
                })
        } else {
            setUpdating(true);
        }
    };

    // handles change in user input
    const handleChange = (value, path) => {
        const temp = { ...props.user, [path]: value };
        props.setUser(temp)
    }


    // parses file from user upload (image)
    const loadImageFromFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => handleChange(reader.result, "profilePicture")
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    return (
        <ProfileWrapper>{
            updating ?
                <ProfileImageWrapper>
                    <ImageInnerWrapper>
                        <ProfileImage
                            src={props.user.profilePicture}
                            onClick={() => hiddenInputRef.current.click()} />
                    </ImageInnerWrapper>
                    <HiddenInput
                        ref={hiddenInputRef}
                        type="file"
                        accept="image/*"
                        onChange={loadImageFromFile} />
                </ProfileImageWrapper> : <ProfilePictureWrapper src={props.user.profilePicture} />
        }
            <ProfileInfo>
                <ProfileItem label="Username:" value={props.user.username} />
                {/* <ProfileItem label="Password:" value={props.user.password} /> */}
                {updating ?
                    <StyledInput
                        autoFocus={true}
                        type="text"
                        onChange={(e) => handleChange(e.target.value, 'bio')}
                        value={props.user.bio}
                        placeholder="Tell us about yourself." />
                    : <ProfileItem label="About:" value={props.user.bio} />
                }
                <OuterButtonsWrapper>
                    <ButtonsWrapper>
                        <ButtonWrapper>
                            <Button onClick={isUpdating}>
                                {bioButtonText}
                            </Button>
                        </ButtonWrapper>
                    </ButtonsWrapper>

                </OuterButtonsWrapper>
            </ProfileInfo>
        </ProfileWrapper>
    )
};

export default Profile;