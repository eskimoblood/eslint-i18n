/**
 * @fileoverview Dont allow missing translators comment
 * @author Andreas Köberle
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-missing-translators-comment'),
    RuleTester = require('eslint').RuleTester

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester()
ruleTester.run('no-missing-translators-comment', rule, {
    valid: [
        {
            code: `
        //translators: some comment
        i18n('test')
        `,
            errors: [
                {
                    message: 'missing translator message',
                },
            ],
        },
    ],

    invalid: [
        {
            code: `
            //translator: some comment
            i18n('test')
            `,
            errors: [
                {
                    message: 'missing translator message',
                },
            ],
        },
        {
            code: "i18n('test')",
            errors: [
                {
                    message: 'missing translator message',
                },
            ],
        },
    ],
})
