const RuleTester = require('eslint').RuleTester

export const ruleTester = new RuleTester({
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 12
  }
})
