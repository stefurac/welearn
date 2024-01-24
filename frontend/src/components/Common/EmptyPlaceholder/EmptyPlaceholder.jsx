import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ReactComponent as EmptySVG } from '../../../assets/images/undraw_empty.svg'
import { ReactComponent as BookshelfSVG } from '../../../assets/images/undraw_bookshelf.svg'
import { ReactComponent as VoidSVG } from '../../../assets/images/undraw_void.svg'
import { ReactComponent as TeacherSVG } from '../../../assets/images/undraw_teacher.svg'
import { ReactComponent as NotFoundSVG } from '../../../assets/images/undraw_404.svg'
import { ReactComponent as AuthSVG } from '../../../assets/images/undraw_auth.svg'

const withImageStyle = image => styled(image)`
    width: 100%;
    flex-grow: 1;
`

const IMAGES = {
    bookshelf: withImageStyle(BookshelfSVG),
    empty: withImageStyle(EmptySVG),
    teacher: withImageStyle(TeacherSVG),
    void: withImageStyle(VoidSVG),
    notFound: withImageStyle(NotFoundSVG),
    auth: withImageStyle(AuthSVG),
}

const EmptyWrapper = styled.div`
    max-height: ${props => props.maxHeight};
    margin: ${props => props.margin};
    width: 100%;
    display: flex;
    justify-content: center;
`

const VerticalColumn = styled.div`
    display: flex;
    flex-direction: column;
`

const EmptyTextLarge = styled.div`
    color: ${({ theme }) => theme.palette.text.regular};
    padding-top: 24px;

    font-family: ${({ theme }) => theme.typography.dosisFontFamily};
    font-size: ${props => props.largeFontSize};
    line-height: ${props => props.largeFontSize};
    font-weight: 600;
    text-align: center;
`

const EmptyTextSmall = styled.div`
    color: ${({ theme }) => theme.palette.text.regular};
    padding-top: 16px;

    font-family: ${({ theme }) => theme.typography.dosisFontFamily};
    font-size: ${props => props.smallFontSize};
    line-height: 1.4rem;
    font-weight: 500;
    text-align: center;
`
// Empty placeholder for image and text
const EmptyPlaceholder = props => {
    const Image = IMAGES[props.imageName]

    return (
        <EmptyWrapper maxHeight={props.maxHeight} margin={props.margin}>
            <VerticalColumn>
                <Image title={props.imageTitle} />
                <EmptyTextLarge largeFontSize={props.largeFontSize}>
                    {props.headerComponent}
                </EmptyTextLarge>
                <EmptyTextSmall smallFontSize={props.smallFontSize}>
                    {props.bodyComponent}
                </EmptyTextSmall>
            </VerticalColumn>
        </EmptyWrapper>
    )
}

EmptyPlaceholder.propTypes = {
    imageName: PropTypes.string.isRequired,
    imageTitle: PropTypes.string.isRequired,
    headerComponent: PropTypes.node.isRequired,
    bodyComponent: PropTypes.node.isRequired,
    maxHeight: PropTypes.string,
    largeFontSize: PropTypes.string,
    smallFontSize: PropTypes.string,
    margin: PropTypes.string,
}

EmptyPlaceholder.defaultProps = {
    maxHeight: '100%',
    largeFontSize: '2.5rem',
    smallFontSize: '1.25rem',
    margin: '0',
}

export default EmptyPlaceholder
