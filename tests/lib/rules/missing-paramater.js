/**
 * @fileoverview Check that all paramaters are passed
 * @author Andreas Köberle
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/missing-paramater'),
    RuleTester = require('eslint').RuleTester

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester()
ruleTester.run('missing-paramater', rule, {
    valid: [
        { code: "i18n('Its a __test__', {test:'test'})" },
        { code: "i18n('Its a test')" },
        { code: "i18n('Its a test', {test:'test'})" },
    ],

    invalid: [
        {
            code: "i18n('Its a __test__', {tes:'test'})",
            errors: [
                {
                    message: 'Fill me in.',
                    type: 'Me too',
                },
            ],
        },
    ],
})
