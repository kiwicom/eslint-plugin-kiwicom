const RuleTester = require('eslint').RuleTester

import { orbitTextComponentName } from '../orbit-text-component-name'

const ruleTester = new RuleTester({
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2016
  }
})

describe('Orbit', function() {
  ruleTester.run('orbit-text-component-name', orbitTextComponentName, {
    valid: ['import OrbitText from "@kiwicom/orbit-components/lib/Text"'],
    invalid: [
      {
        code: 'import Text from "@kiwicom/orbit-components/lib/Text"',
        errors: [
          {
            messageId: 'orbitText'
          }
        ]
      },
      {
        code: 'import Orbit from "@kiwicom/orbit-components/lib/Text"',
        errors: [
          {
            messageId: 'orbitText'
          }
        ]
      }
    ],
    output: "Import under name OrbitText instead of 'Text'"
  })
})
