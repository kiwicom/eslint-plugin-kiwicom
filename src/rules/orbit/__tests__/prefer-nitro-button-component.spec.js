import { ruleTester } from '../../../common/ruleTester'
import { preferNitroButtonComponent } from '../prefer-nitro-button-component'

describe('Prefer nitro button', function() {
  ruleTester.run('prefer-nitro-button-component', preferNitroButtonComponent, {
    valid: [
      '<Button t="translation.key" />',
      '<Button t="translation.key" values={{ companyName: "Kiwi.com "}} />',
      '<Button>{condition ? <Translate t="next" /> : <Translate t="pay" values={{ price: "12 EUR" }} />}</Button>',
      '<Button>{customLabel || <Translate t="translation.key" />}</Button>',
      '<Button>{someFunctionToRenderLabel(state)}</Button>',
      '<Button type="secondary">Close</Button>',
      '<Button><TranslateNode t="translation.key" /></Button>',
      '<ButtonLink><Translate t="translation.key" /></ButtonLink>'
    ],
    invalid: [
      {
        code: `<Button><Translate t="translation.key" /></Button>`,
        errors: [{ messageId: 'preferNitroButton' }]
      },
      {
        code: `<Button><Translate t="translation.key" values={{ companyName: "Kiwi.com "}} /></Button>`,
        errors: [{ messageId: 'preferNitroButton' }]
      },
      {
        code: `<Button><Translate t={someFunctionToRenderLabel(state)} /></Button>`,
        errors: [{ messageId: 'preferNitroButton' }]
      },
      {
        code: `<Button><Translate tKey="translation.key" /></Button>`,
        errors: [{ messageId: 'preferNitroButton' }]
      }
    ]
  })
})
