import { ruleTester } from '../../../common/ruleTester'
import { preferNitroTextNodeComponent } from '../prefer-nitro-textnode-component'

describe('Prefer nitro text', function() {
  ruleTester.run('prefer-nitro-text-component', preferNitroTextNodeComponent, {
    valid: [
      '<TextNode t="translation.key" />',
      '<Button kind="primary"><TranslateNode t="translation.ket" /></Button>'
    ],
    invalid: [
      {
        code: `<OrbitText><TranslateNode t="translation.key" /></OrbitText>`,
        errors: [
          {
            messageId: 'preferNitroTextNode'
          }
        ]
      },
      {
        code: `
      <OrbitText>
          <TranslateNode t="translation.key" />
      </OrbitText>`,
        errors: [
          {
            messageId: 'preferNitroTextNode'
          }
        ]
      },
      {
        code: `
     <span className="spStatus _closed">
          <OrbitText>
            <TranslateNode tKey="common.booking_state_closed" />
          </OrbitText>
        </span>
`,
        errors: [
          {
            messageId: 'preferNitroTextNode'
          }
        ]
      }
    ],
    output: `TranslateNode is wrapped in Orbit Text component. Prefer using Nitro's TextNode which does the same. import TextNode from "@kiwicom/nitro/lib/components/TextNode"`
  })
})
