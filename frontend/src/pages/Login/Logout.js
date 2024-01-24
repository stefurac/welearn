import React, { useEffect, useState } from 'react';
import VerificationForm from '../../components/Verification/VerificationForm';
import UnderlinedHeader from '../../components/Common/UnderlinedHeader/UnderlinedHeader';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/actions';
import Api from '../../api';

const Error = styled.div`
    color: ${({ theme }) => theme.palette.primary};
    font-weight: bolder;
`
const LoginWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const FormWrapper = styled.div`
    width: 400px;
    height: fit-content;
    border: 1px solid #f4f6f8;
    border-radius: 16px;
    background-color: white;  
    padding: 30px;  
`
const SignupWrapper = styled.div`
    text-align: right;
    font-size: small;
`
const SignUpButton = styled(Link)`
    align-items: right;
    font-weight: bold;
    padding: 4px 4px;
    background-color: ${props => props.selected ? `#E6D8FF` : `transparent`};
    color: ${props => props.selected ? props.theme.palette.primary : props.theme.palette.text.heavy};
    text-decoration: none;
    cursor: pointer;
    &:hover {
        color: ${({ theme }) => theme.palette.primary};
    }
`
const ErrorMessage = styled.div`
    text-align: center;
    margin-top: 5%;
`

// Logout page
export const Logout = props => {

    const dispatch = useDispatch();
    const user = Api.User.getUser();
    const history = useHistory();

    if (user.id) {
        Api.Auth.logout()
        dispatch(logout())
        history.push('/home')
    }

    return (
        <LoginWrapper>
            <FormWrapper>
                <UnderlinedHeader>
                    Logging out...
            </UnderlinedHeader>
            </FormWrapper>
        </LoginWrapper>
    )
};


export default Logout;