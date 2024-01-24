import React, { useEffect, useState } from 'react';
import VerificationForm from '../../components/Verification/VerificationForm';
import UnderlinedHeader from '../../components/Common/UnderlinedHeader/UnderlinedHeader';
import styled from 'styled-components';
import image from '../../assets/images/landing-page-background.png';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/actions';
import Api from '../../api';


const SignupWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const LoginWrapper = styled.div`
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
const FormWrapper = styled.div`
    width: 450px;
    height: fit-content;
    border: 1px solid #f4f6f8;
    border-radius: 16px;
    background-color: white;  
    padding: 30px;  
`
const Error = styled.div`
    color: ${({ theme }) => theme.palette.primary};
    font-weight: bolder;
`
const ErrorMessage = styled.div`
    text-align: center;
    margin-top: 5%;
`

const inputs = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
    dob: ""
};

//Sign up page
export const Signup = props => {

    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState(inputs)
    const [error, setError] = useState("");
    const user = Api.User.getUser();
    const history = useHistory();
    
    useEffect(() => {
        renderError();
    });

    if (user.id) {
        // user is logged in
        alert('Please log out first')
        if (user.isAdmin) {
            history.push('/admin')
        } else {
            history.push('/dashboard')
        }
    }
    const inputChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }

      
    const checkComplete = () => {
        if (credentials.username.length === 0) {
            setError("Please enter your username.");
            return false;
        }
        else if (credentials.password.length === 0) {
            setError("Please enter your password.");
            return false;
        }
        else if (credentials.confirmPassword.length === 0) {
            setError("Please confirm your password.");
            return false;
        }
        else if (credentials.firstName.length === 0) {
            setError("Please enter your first name.");
            return false;
        }
        else if (credentials.lastName.length === 0) {
            setError("Please enter your last name.");
            return false;
        }
        else if (credentials.email.length === 0) {
            setError("Please enter your email.");
            return false;
        }
        else if (!validateEmail(credentials.email)) {
            setError("Please enter a valid email.");
            return false;
        }
        else if (credentials.dob.length === 0) {
            setError("Please enter your birthdate.");
            return false;
        }
        else if (credentials.password !== credentials.password) {
            setError("Your passwords do not match.");
            return false;
        }
        setError("");
        return true
    };

    const submit = async () => {
        // if (!checkComplete()) {
        //     return;
        // }
        try {
            const usernameExists = await Api.Auth.checkUsernameExists(credentials.username);
            console.log(usernameExists)
            if (usernameExists) {
                setError("This username is taken");
                return;
            } 
            else {
                let newUser = {
                    ...credentials,
                    id: credentials.username
                };
                delete newUser.confirmPassword;
                const signupResult = await Api.User.signup(newUser);
                dispatch(addUser(signupResult));
                history.push('/login') 
        }
        } 
        catch {
            setError("Something went wrong signing up");
        }
    }


    const renderError = () => (
        <Error>{error}</Error>
    );


    return (
        <SignupWrapper>
            <FormWrapper>
                <UnderlinedHeader>
                    Create your Account
            </UnderlinedHeader>
                < VerificationForm
                    verificationType="signup"
                    firstName={credentials.firstName}
                    lastName={credentials.lastName}
                    username={credentials.username}
                    confirmPassword={credentials.confirmPassword}
                    password={credentials.password}
                    email={credentials.email}
                    dob={credentials.dob}
                    onClick={submit}
                    inputChange={inputChange} />
                    <LoginWrapper>
                    Already have an account?
                    <SignUpButton to={'/login'}>
                            Log In!
                    </SignUpButton>
                </LoginWrapper>
                <ErrorMessage>
                    {error !== "" ? renderError() : null}
                </ErrorMessage>
            </FormWrapper>
        </SignupWrapper>
    )
};


export default Signup;
