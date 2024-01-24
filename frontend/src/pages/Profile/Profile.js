import React, { useEffect, useState } from 'react';
import UserProfile from '../../components/Profile/Profile';
import Account from '../../components/Profile/Account';
import UnderlinedHeader from '../../components/Common/UnderlinedHeader/UnderlinedHeader'
import styled from 'styled-components'
import image from '../../assets/images/landing-page-background.png'
import Api from '../../api'

const Wrapper = styled.div`
    background-image:url(${image});
    background-position: unset;
    background-size: 90%;
    background-repeat: no-repeat;
    height: 100%;
`

const ProfileMainWrapper = styled.div`
    padding: 2%;
    margin-right: auto;
    margin-left: auto;
    width: 60%;
    display: flex;
    justify-content: space-between;
    border: 1px solid #f4f6f8;
    border-radius: 16px;
    background-color: white;  
`

//Profile page
export const Profile = props => {
    const [user, setUser] = useState({})
    const [lastUpdated, setLastUpdated] = useState({})

    useEffect(() => {
        Api.User.getSessionUser()
            .then(user => setUser(user))
    }, [lastUpdated])

    return (
        <Wrapper>
            <UnderlinedHeader>
                Your Profile
            </UnderlinedHeader>
            <ProfileMainWrapper>
                <UserProfile user={user} setUser={setUser} setLastUpdated={setLastUpdated} />
            </ProfileMainWrapper>
            <UnderlinedHeader>
                Your Account
            </UnderlinedHeader>
            <ProfileMainWrapper>
                <Account user={user} />

            </ProfileMainWrapper>
        </Wrapper >
    )
};

export default Profile;
