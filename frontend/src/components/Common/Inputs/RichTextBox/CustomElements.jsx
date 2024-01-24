import React from 'react'
import styled from 'styled-components'

const DefaultElementStyle = styled.div`
    font-family: ${({ theme }) => theme.typography.richText.body.fontFamily};
    font-weight: ${({ theme }) => theme.typography.richText.body.fontWeight};
    font-size: ${({ theme }) => theme.typography.richText.body.fontSize};
    line-height: ${({ theme }) => theme.typography.richText.body.lineHeight};
    margin-bottom: 8px;
`
export const DefaultElement = props => {
    return (
        <DefaultElementStyle>
            <span {...props.attributes}>
                {props.children}
            </span>
        </DefaultElementStyle>    
    )
}

const CodeCodeStyle = styled.span`
    padding: 0 4px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.palette.text.feather};
    font-family: ${({ theme }) => theme.typography.codeFontFamily};
`
// Styling wrap for leaf
export const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }
    
    if (leaf.code) {
        children = <CodeCodeStyle>{children}</CodeCodeStyle>
    }
    
    if (leaf.italic) {
        children = <em>{children}</em>
    }
    
    if (leaf.underline) {
        children = <u>{children}</u>
    }
    
    return <span {...attributes}>{children}</span>
}


const Header1Style = styled.div`
    font-family: ${({ theme }) => theme.typography.richText.h1.fontFamily};
    font-weight: ${({ theme }) => theme.typography.richText.h1.fontWeight};
    font-size: ${({ theme }) => theme.typography.richText.h1.fontSize};
    line-height: ${({ theme }) => theme.typography.richText.h1.lineHeight};
`
// Styling wrap for header
export const Header1Element = props => {
    return (
        <Header1Style {...props.attributes}>
            {props.children}
        </Header1Style>
    )
}

const Header2Style = styled.div`
    font-family: ${({ theme }) => theme.typography.richText.h2.fontFamily};
    font-weight: ${({ theme }) => theme.typography.richText.h2.fontWeight};
    font-size: ${({ theme }) => theme.typography.richText.h2.fontSize};
    line-height: ${({ theme }) => theme.typography.richText.h2.lineHeight};
`
// Styling wrap for header
export const Header2Element = props => {
    return (
        <Header2Style {...props.attributes}>
            {props.children}
        </Header2Style>
    )
}

const Header3Style = styled.div`
    font-family: ${({ theme }) => theme.typography.richText.h3.fontFamily};
    font-weight: ${({ theme }) => theme.typography.richText.h3.fontWeight};
    font-size: ${({ theme }) => theme.typography.richText.h3.fontSize};
    line-height: ${({ theme }) => theme.typography.richText.h3.lineHeight};
`
// Styling wrap for header
export const Header3Element = props => {
    return (
        <Header3Style {...props.attributes}>
            {props.children}
        </Header3Style>
    )
}
