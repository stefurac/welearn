import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';

const Label = styled.li`
    margin-right: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`
const Item = styled.div`
    padding: 10px;
    border: 1px solid #f4f6f8;
    border-radius: 16px;
    background-color: white;    
    overflow: hidden;
    text-align: left;
    float: right;
    width: ${props => props.width};
    margin-left: 10px;
`
// Helper styling wrap of profile for User Profile page
const ProfileItem = props => {
    return (
        <Label>
            <strong>{props.label}</strong>
            <Item width={props.width}>
                {props.value}
            </Item>
        </Label>
    )
}

ProfileItem.propTypes = {
    width: PropTypes.string,
}

ProfileItem.defaultProps = {
    width: '200px'
}

export default ProfileItem