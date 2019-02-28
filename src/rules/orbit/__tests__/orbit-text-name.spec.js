import { ruleTester } from '../../../common/ruleTester'
import { orbitTextComponentName } from '../orbit-text-component-name'

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
