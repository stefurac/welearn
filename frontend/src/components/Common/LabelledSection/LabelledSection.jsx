import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import UnderlinedHeader from '../UnderlinedHeader/UnderlinedHeader'

// Flex box container for a flex column, allowing the Section component to expand to fill all remaining vertical space
const FlexWrapper = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    ${props => props.expandHeight && css`
        height: 100%;
    `}

    ${props => props.topPadding && css`
        padding-top: 24px;
    `}
`

const LabelSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`

// Container to hold the main content of a labelled section
const BodySection = styled.div`
    width: 100%;
    margin-top: 16px;

    ${props => props.padded && css`
        padding: 16px;
    `}

    ${props => props.filled && css`
        background-color: ${props => props.theme.palette.sideNavBackground};
        border-radius: 16px;
    `}

    ${props => props.expandHeight && css`
        flex-grow: 1;
        flex-basis: 0;
    `}

    ${props => props.scrollable && css`
        overflow-y: scroll;
    `}
`
// Styling wrap for labeled section
const LabelledSection = props => {
    return (
        <FlexWrapper {...props}>
            <LabelSection>
                <UnderlinedHeader>
                    {props.label}
                </UnderlinedHeader>
                <div>
                    {props.sidecarComponent}
                </div>
            </LabelSection>

            <BodySection {...props}>
                {props.children}
            </BodySection>
        </FlexWrapper>
    );
};

LabelledSection.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    sidecarComponent: PropTypes.node,
    filled: PropTypes.bool,
    expandHeight: PropTypes.any,
    scrollable: PropTypes.any,
    topPadding: PropTypes.any,
    padded: PropTypes.any,
};

export default LabelledSection;