import React from 'react';
import styled from 'styled-components'
import Button from '../Common/Inputs/Button';
import VerificationInput from './VerificationInput';
import Api from '../../api'

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 0.5;
    justify-content: center;
    margin-top: 30px;
`
const Form = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
`
// Helper styling wrap of statistics for User Dasboard page
const VerificationForm = props => {

    let inputs;
    let currentInputs;
    const loginInputs = [props.username, props.password];
    const signupInputs = [
        props.firstName, props.lastName, props.username,
        props.password, props.confirmPassword, props.email, props.dob];

    props.verificationType === "login" ?
        currentInputs = loginInputs :
        currentInputs = signupInputs;

    props.verificationType === "login" ?
        inputs = Api.Auth.getLoginVerification() :
        inputs = Api.Auth.getSignupVerification();

    let iteratorList = [];
    for (let i = 0; i < inputs.length; i++) {
        iteratorList.push(i);
    };

    const renderInput = () => (
        iteratorList.map(iterator =>
            <VerificationInput
                key={inputs[iterator].name}
                label={inputs[iterator].label}
                value={currentInputs[iterator]}
                name={inputs[iterator].name}
                type={inputs[iterator].type}
                placeholder={inputs[iterator].placeholder}
                inputChange={props.inputChange}
            >
            </VerificationInput>)
    );

    return (
        <Form onKeyPress={e => e.key === 'Enter' && props.onSubmit()}>
            {renderInput()}
            <ButtonWrapper>
                <Button onClick={props.onClick}>
                    Submit
                    </Button>
            </ButtonWrapper>
        </Form>
    )
};

export default VerificationForm;
