import React, { useEffect, useState } from 'react';
import VerificationForm from '../../components/Verification/VerificationForm';
import UnderlinedHeader from '../../components/Common/UnderlinedHeader/UnderlinedHeader';
import styled from 'styled-components';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions';
import Api from '../../api';

const Error = styled.div`
    color: ${({ theme }) => theme.palette.primary};
    font-weight: bolder;
`
const LoginWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
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
const AlertWrapper = styled.div`
    width: 400px;
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 16px;
    border: 1px solid #b5251b;
    color: #b5251b;
    background-color: #e09590;
`

const useQuery = () => new URLSearchParams(useLocation().search)

//Login page
export const Login = props => {
    const query = useQuery()
    const dispatch = useDispatch();
    const user = Api.User.getUser();
    const history = useHistory();

    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    useEffect(() => {
        if (!query.has('expired')) {
            Api.User.getSessionUserNoInterceptor()
                .then(user => {
                    if (user) {
                        dispatch(login(user))
                        if (user.isAdmin) {
                            history.push('/admin')
                        } else {
                            history.push('/dashboard')
                        }
                    }
                })
        }
    }, [])

    if (user.id) {
        // user is logged in
        if (user.isAdmin) {
            history.push('/admin')
        } else {
            history.push('/dashboard')
        }
    }

    const inputChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    };

    const checkComplete = () => {
        if (credentials.username === "") {
            setError("Please enter your username.");
            return false;
        }
        else if (credentials.password === "") {
            setError("Please enter your password.");
            return false;
        }
        setError("");
        return true
    };

    const submit = () => {
        if (!checkComplete()) {
            return;
        }
        Api.Auth.authenticate(credentials)
            .then(({ success, user, message }) => {
                if (!success) {
                    setError(message);
                    return;
                }
                dispatch(login(user));
            })
            .catch(({ message }) => {
                setError(message);
            })
    };

    const renderExpiredAlert = () => (
        <AlertWrapper>Your session has expired, please login again.</AlertWrapper>
    )

    const renderError = () => (
        <Error>{error}</Error>
    );

    return (
        <LoginWrapper>
            {query.has('expired') && renderExpiredAlert()}
            <FormWrapper>
                <UnderlinedHeader>
                    Login to your Account
            </UnderlinedHeader>
                < VerificationForm
                    verificationType="login"
                    username={credentials.username}
                    password={credentials.password}
                    inputChange={inputChange}
                    onClick={submit}
                    onSubmit={submit} />
                <SignupWrapper>
                    Don't have an account?
                    <SignUpButton to={'/signup'}>
                        Sign Up!
                    </SignUpButton>
                </SignupWrapper>
                <ErrorMessage>
                    {error !== "" ? renderError() : null}
                </ErrorMessage>
            </FormWrapper>
        </LoginWrapper>
    )
};


export default Login;