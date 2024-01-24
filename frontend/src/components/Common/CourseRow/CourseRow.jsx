import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const RowWrapper = styled.div`
    display: flex;
    align-items: center;

    width: 100%;
    padding: 16px;
    margin-bottom: 16px;
    background-color: ${({ theme }) => theme.palette.sideNavBackground};
    border-radius: 16px;
`

const CourseImage = styled.img`
    width: 64px;
    height: 64px;
    margin-right: 24px;

    border-radius: 8px;
    object-fit: cover;
`

const Expander = styled.div`
    flex-grow: 1;
    padding-right: 16px;
`

const CourseTitle = styled.h3`
    color: ${({ theme }) => theme.palette.text.heavy}
    font-weight: 500;
    font-size: 1.3rem;
`
// Styling wrap for course row
const CourseRow = props => {
    return (
        <RowWrapper>
            <CourseImage src={props.image} />

            <Expander>
                <CourseTitle>
                    {props.title}
                </CourseTitle>

                {props.children}
            </Expander>

            {props.sidecarComponent}
        </RowWrapper>
    )
}

CourseRow.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.node.isRequired,
    sidecarComponent: PropTypes.node,
}

export default CourseRow
