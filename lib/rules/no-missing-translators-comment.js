/**
 * @fileoverview Dont allow missing translators comment
 * @author Andreas Köberle
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: 'Dont allow missing translators comment',
            category: 'missing translator message',
            recommended: false,
        },
        type: 'suggestion',
        fixable: null, // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ],
    },

    create: function(context) {
        const getComment = node => {
            const comments = node.leadingComments || node.parent.leadingComments
            return comments ? comments[comments.length - 1] : null
        }

        return {
            CallExpression(node) {
                if (node.callee.name === 'i18n') {
                    const lastComment = getComment(node)

                    if (
                        !/translators:/.test(lastComment && lastComment.value)
                    ) {
                        context.report({
                            node,
                            message: 'missing translator message',
                        })
                    }
                }
            },
        }
    },
}
