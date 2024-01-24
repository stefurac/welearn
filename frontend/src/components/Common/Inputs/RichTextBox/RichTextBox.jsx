import React, { useCallback, useState } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { createEditor, Editor, Transforms } from 'slate'
import { Slate, Editable, withReact, useSlate } from 'slate-react'
import { withHistory } from 'slate-history'
import withLayout from './Layout'
import { DefaultElement, Header1Element, Header2Element, Header3Element, Leaf } from './CustomElements'
import { Toolbar, ToolbarButton, ToolbarDropdown, ToolbarDivider } from './Toolbar'
import { ReactComponent as BulletedListSVG } from '../../../../assets/icons/bulleted-list.svg'
import { ReactComponent as NumberedListSVG } from '../../../../assets/icons/numbered-list.svg'

const withIconStyle = component => styled(component)`
    width: 20px;
    height: 20px;
    margin-bottom: -4px;
`

const BulletedListIcon = withIconStyle(BulletedListSVG)
const NumberedListIcon = withIconStyle(NumberedListSVG)

const Wrapper = styled.div`
    width: 100%;    
    padding: ${props => props.padding};
    margin: ${props => props.margin};
    border-radius: ${props => props.borderRadius};
    background-color: ${({ theme }) => theme.palette.sideNavBackground};

    ${props => props.withBorder && css`
        border: 1px solid ${props => props.error ? props.theme.palette.warning : props.theme.palette.primary};

        ${props => props.isFocused && css`
            outline: 1px ${props => props.error ? props.theme.palette.warning : props.theme.palette.primary};
            box-shadow: 0px 0px 4px ${props => props.error ? props.theme.palette.warning : props.theme.palette.primary};
        `}
    `}
`

const BLOCK_TYPES = ['Header 1', 'Header 2', 'Header 3', 'Paragraph']
const LIST_TYPES = ['Numbered List', 'Bulleted List']

/**
 * Determine if a text decoration (eg: bold, italic, underline) is active at the current range in the given text editor
 *
 * @param {Editor} editor the current Slate text editor
 * @param {string} type the type of the text decoration
 */
const isTextDecorationActive = (editor, type) => {
    const decorations = Editor.marks(editor)
    return decorations && decorations[type]
}

/**
 * Toggle a text decoration at the current range in the given text editor
 *
 * @param {Editor} editor the current Slate text editor
 * @param {string} type the type of the text decoration
 */
const toggleTextDecoration = (editor, type) => {
    const isActive = isTextDecorationActive(editor, type)

    if (isActive) {
        Editor.removeMark(editor, type)
    } else {
        Editor.addMark(editor, type, true)
    }
}

/**
 * Determine if a text block (eg: Header 1, Header 2, Header 3, Paragraph) is active at the current range in the given
 * text editor
 *
 * @param {Editor} editor the current Slate text editor
 * @param {string} type the type of the text block
 */
const isTextBlockActive = (editor, type) => {
    const [match] = Editor.nodes(editor, { match: node => node.type === type })
    return !!match
}

/**
 * Set the current range in the given text editor to be a text block of thr given type 
 *
 * @param {Editor} editor the current Slate text editor
 * @param {string} type the type of the text block
 */
const setTextBlock = (editor, type) => {
    const isList = LIST_TYPES.includes(type)

    // Flatten any nested nodes
    Transforms.unwrapNodes(editor, {
        match: n => LIST_TYPES.includes(n.type),
        split: true,
    })

    // If we are turing a node into a list type, then we have extra work to do.
    // Lists are build by nesting List Item nodes within a parent Numbered/Bulleted List node. First wrap the selection
    // in the appropriate parent node, then set all children to be of type List Item
    if (isList) {
        const block = { type: type, children: [] }
        Transforms.wrapNodes(editor, block)
        Transforms.setNodes(editor, { type: 'List Item' })
    }
    // Otherwise we can set the type of the node directly
    else {
        Transforms.setNodes(editor, { type: type })
    }
}

/**
 * Toggle a text block at the current range in the given text editor
 *
 * @param {Editor} editor the current Slate text editor
 * @param {string} type the type of the text block
 */
const toggleTextBlock = (editor, type) => {
    const isActive = isTextBlockActive(editor, type)

    // If the given text block type is already active, then toggle it to Paragraph
    if (isActive) {
        setTextBlock(editor, 'Paragraph')
    }
    // Otherwise make it active
    else {
        setTextBlock(editor, type)
    }
}

/**
 * A React Component that allows the block type of the current selection to be selected from a drop down
 */
const BlockDropDown = () => {
    const editor = useSlate()
    const currentBlockType = BLOCK_TYPES.find(blockType => isTextBlockActive(editor, blockType)) || 'Paragraph'
    return (
        <ToolbarDropdown
            label={currentBlockType}
            options={BLOCK_TYPES}
            onOptionClick={(i) => toggleTextBlock(editor, BLOCK_TYPES[i])}>
        </ToolbarDropdown>
    )
}

/**
 * A React Component that toggles either the text decoration or block type of the current selection
 */
const ToolbarToggleButton = props => {
    const editor = useSlate()
    const { isBlock, type, children } = props
    const isActive = isBlock
        ? isTextBlockActive(editor, type)
        : isTextDecorationActive(editor, type)
    const onMouseDown = isBlock
        ? () => toggleTextBlock(editor, type)
        : () => toggleTextDecoration(editor, type)

    return (
        <ToolbarButton
            active={isActive}
            onMouseDown={onMouseDown}>
            {children}
        </ToolbarButton>
    )
}

const RichTextBox = props => {
    // Create a Slate editor object that won't change across renders
    const [editor] = useState(() => withLayout(withReact(withHistory(createEditor()))))
    // Keep track of focus
    const [isFocused, setIsFocused] = useState(false)

    // Reference: https://docs.slatejs.org/walkthroughs/03-defining-custom-elements
    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'Header 1':
                return <Header1Element {...props} />
            case 'Header 2':
                return <Header2Element {...props} />
            case 'Header 3':
                return <Header3Element {...props} />
            case 'List Item':
                return <li {...props.attributes}>{props.children}</li>
            case 'Numbered List':
                return <ol {...props.attributes}>{props.children}</ol>
            case 'Bulleted List':
                return <ul {...props.attributes}>{props.children}</ul>
            case 'Paragraph':  // Fall through
            default:
                return <DefaultElement {...props} />
        }
    }, [])

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])

    return (
        <Wrapper
            padding={props.padding}
            margin={props.margin}
            borderRadius={props.borderRadius}
            withBorder={props.withBorder}
            isFocused={isFocused}
            error={props.error}>
            <Slate
                editor={editor}
                value={props.value}
                onChange={props.onChange}>
                {!props.readOnly && <Toolbar>
                    {/* Dropdown for setting text block type */}
                    <BlockDropDown />

                    <ToolbarDivider marginLeft={'0'} />

                    {/* Buttons for toggling text decorations */}
                    <ToolbarToggleButton type={'bold'} isBlock={false}>
                        <strong>B</strong>
                    </ToolbarToggleButton>
                    <ToolbarToggleButton type={'italic'} isBlock={false}>
                        <em>I</em>
                    </ToolbarToggleButton>
                    <ToolbarToggleButton type={'underline'} isBlock={false}>
                        <u>U</u>
                    </ToolbarToggleButton>
                    <ToolbarToggleButton type={'code'} isBlock={false}>
                        <code>{'<>'}</code>
                    </ToolbarToggleButton>

                    <ToolbarDivider />

                    {/* Buttons for toggling list block types */}
                    <ToolbarToggleButton type={'Bulleted List'} isBlock={true}>
                        <BulletedListIcon />
                    </ToolbarToggleButton>
                    <ToolbarToggleButton type={'Numbered List'} isBlock={true}>
                        <NumberedListIcon />
                    </ToolbarToggleButton>
                </Toolbar>}
                <Editable
                    placeholder={'Write something here...'}
                    readOnly={props.readOnly}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf} />
            </Slate>
        </Wrapper>
    )
}

export const BASE_VALUE = [
    {
        type: 'paragraph',
        children: [{ text: '' }],
    },
]

RichTextBox.propTypes = {
    value: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    padding: PropTypes.string,
    borderRadius: PropTypes.string,
    withBorder: PropTypes.bool,
    error: PropTypes.string,
    readOnly: PropTypes.bool,
}

RichTextBox.defaultProps = {
    padding: '0',
    margin: '0',
    borderRadius: '4px',
    withBorder: false,
    readOnly: false,
}

export default RichTextBox
