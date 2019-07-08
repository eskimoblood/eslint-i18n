/**
 * @fileoverview Check that all paramaters are passed
 * @author Andreas Köberle
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: 'Check that all paramaters are passed',
            category: 'Fill me in',
            recommended: false,
        },
        fixable: null, // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ],
    },

    create: function(context) {
        const findMissing = (usedKeys, passedKeys) =>
            usedKeys.every(k => !passedKeys.includes(k))
        const findKeys = args =>
            args.match(/__([^__]*)__/g).map(s => s.replace(/__/g, ''))

        const getPassedKeys = nodes => nodes.map(node => node.key.name)

        return {
            CallExpression(node) {
                if (node.callee.name === 'i18n') {
                    const usedKeys = findKeys(node.arguments[0].value)
                    const passedKeys = getPassedKeys(
                        node.arguments[1].properties
                    )
                    const missingKeys = findMissing(usedKeys, passedKeys)
                    console.log('missingKeys', missingKeys)

                    if (missingKeys.length > 0) {
                        context.report({
                            node,
                            message: `The following, keys are used in the template but missing in the passed object: ${missingKeys.join(
                                ', '
                            )}`,
                        })
                    }
                }
            },
        }
    },
}
