const RuleTester = require('eslint').RuleTester

import { preferNitroTextComponent } from '../prefer-nitro-text-component'

const ruleTester = new RuleTester({
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2016
  }
})

describe('Prefer nitro text', function() {
  ruleTester.run('prefer-nitro-text-component', preferNitroTextComponent, {
    valid: [
      '<Text t="translation.key" />',
      '<Button kind="primary"><Translate t="translation.ket" /></Button>'
    ],
    invalid: [
      {
        code: `<OrbitText><Translate t="translation.key" /></OrbitText>`,
        errors: [
          {
            messageId: 'preferNitroText'
          }
        ]
      },
      {
        code: `
      <OrbitText>
          <Translate t="translation.key" />
      </OrbitText>`,
        errors: [
          {
            messageId: 'preferNitroText'
          }
        ]
      },
      {
        code: `
     <span className="spStatus _closed">
          <OrbitText>
            <Translate tKey="common.booking_state_closed" />
          </OrbitText>
        </span>
`,
        errors: [
          {
            messageId: 'preferNitroText'
          }
        ]
      }
    ],
    output:
      'Prefer Text imported from Nitro library import Text from "@kiwicom/nitro/lib/components/Text"'
  })
})
