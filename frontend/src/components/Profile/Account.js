import React from 'react';
import styled from 'styled-components'
import ProfileItem from './ProfileItem'

const Wrapper = styled.div`
    border: 1px solid #f4f6f8;
    border-radius: 16px;
    background-color: white;  
    border-color: white;
    display: flex;
    flex-direction: row;
`
const AccountWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
// Helper styling wrap of account for User Profile page
export const Account = props => {

    return (
        <Wrapper>
            <AccountWrapper>
                <ProfileItem label="Name:" value={props.user.firstName + " " + props.user.lastName} />
                <ProfileItem label="Email:" value={props.user.email} />
                <ProfileItem label="Date of Birth:" value={(new Date(props.user.dob)).toLocaleDateString()} />
            </AccountWrapper>
        </Wrapper>
    );
};


export default Account;
