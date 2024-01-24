import { Transforms, Node } from 'slate'

// Reference: https://docs.slatejs.org/concepts/10-normalizing
const withLayout = editor => {
    const { normalizeNode } = editor

    editor.normalizeNode = ([node, path]) => {
        if (path.length === 0) {
            // If there are no children, then insert a paragraph node
            if (editor.children.length < 1) {
                const paragraph = { type: 'Paragraph', children: [{ text: '' }] }
                Transforms.insertNodes(editor, paragraph, { at: path.concat(0) })
            }

            // Make sure structural integrity is preserved.
            for (const [child, childPath] of Node.children(editor, path)) {
                // Ensure there are no top-level list-item nodes (these must be wrapped in some outer list, such as a bulleted-list)
                if (child.type === 'list-item') {
                    Transforms.setNodes(editor, { type: 'paragraph' }, { at: childPath });
                }
            }
        }

        return normalizeNode([node, path])
    }

    return editor
}

export default withLayout