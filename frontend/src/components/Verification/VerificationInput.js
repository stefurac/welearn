import React from 'react';
import styled from 'styled-components';

const Label = styled.div`
    margin-right: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`
const Input = styled.input`
    padding: 10px;
    border: 1px solid #f4f6f8;
    border-radius: 16px;
    background-color: white;    
    overflow: hidden;
    text-align: center;
    float: right;
    width: 200px;
`
// Helper styling wrap of input for login/signup page
const VerificationInput = props => {

    return (
        <Label>
            {props.label}
            <Input
                value={props.value}
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                onChange={props.inputChange}>
            </Input>
        </Label>
    )
};

export default VerificationInput;
