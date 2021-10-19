import { ruleTester } from '../../../common/ruleTester'
import { allowedTagNamesInTranslationComponents } from '../allowed-tag-names-in-translation-components'

describe('Allowed tag names in translation components', function() {
  ruleTester.run(
    'allowed-tag-names-in-translation-components',
    allowedTagNamesInTranslationComponents,
    {
      valid: [
        `<Translate t="tKey" />`,
        `<TranslateNode t="tKey" />`,
        `<TranslateNode t="tKey" tags={{ ref: ref => <p>{ref}</p>}} />`,
        `<TranslateNode t="tKey" tags={{ ref1: ref => <p>{ref}</p>}} />`,
        `<TranslateNode t="tKey" tags={{ ref2: ref => <p>{ref}</p>, ref3: ref => <p>{ref}</p>, ref4: ref => <p>{ref}</p>, ref5: ref => <p>{ref}</p>}} />`,
        `<TextNode t="tKey" />`,
        `<TextNode t="tKey" tags={{ ref: ref => <p>{ref}</p>}} />`,
        `<TextNode t="tKey" tags={{ ref1: ref => <p>{ref}</p>}} />`,
        `<TextNode t="tKey" tags={{ ref2: ref => <p>{ref}</p>, ref3: ref => <p>{ref}</p>, ref4: ref => <p>{ref}</p>, ref5: ref => <p>{ref}</p>}} />`
      ],
      invalid: [
        {
          code: `<TranslateNode t="tKey" tags={{ privacy: ref => <a>{ref}</a> }} />`,
          errors: [
            {
              line: 1,
              endLine: 1,
              column: 33,
              endColumn: 40,
              message:
                'Tag name privacy is not allowed. Allowed tag names: ref, ref1, ref2, ref3, ref4, ref5'
            }
          ]
        },
        {
          code: `
          <TranslateNode
            t="tKey"
            tags={{
              privacy: ref => <a>{ref}</a>,
              terms: ref => <a>{ref}</a>
            }}
          />`,
          errors: [
            {
              line: 5,
              endLine: 5,
              column: 15,
              endColumn: 22,
              message:
                'Tag name privacy is not allowed. Allowed tag names: ref, ref1, ref2, ref3, ref4, ref5'
            },
            {
              line: 6,
              endLine: 6,
              column: 15,
              endColumn: 20,
              message:
                'Tag name terms is not allowed. Allowed tag names: ref, ref1, ref2, ref3, ref4, ref5'
            }
          ]
        },
        {
          code: `<TranslateNode t="tKey" tags={{ ref: ref => <p>{ref}</p>, privacy: ref => <a>{ref}</a> }} />`,
          errors: [
            'Tag name privacy is not allowed. Allowed tag names: ref, ref1, ref2, ref3, ref4, ref5'
          ]
        },
        {
          code: `<TextNode t="tKey" tags={{ privacy: ref => <a>{ref}</a> }} />`,
          errors: [
            'Tag name privacy is not allowed. Allowed tag names: ref, ref1, ref2, ref3, ref4, ref5'
          ]
        },
        {
          code: `<TextNode t="tKey" tags={{ privacy: ref => <a>{ref}</a>, terms: ref => <a>{ref}</a> }} />`,
          errors: [
            'Tag name privacy is not allowed. Allowed tag names: ref, ref1, ref2, ref3, ref4, ref5',
            'Tag name terms is not allowed. Allowed tag names: ref, ref1, ref2, ref3, ref4, ref5'
          ]
        },
        {
          code: `<TextNode t="tKey" tags={{ ref: ref => <p>{ref}</p>, privacy: ref => <a>{ref}</a> }} />`,
          errors: [
            'Tag name privacy is not allowed. Allowed tag names: ref, ref1, ref2, ref3, ref4, ref5'
          ]
        }
      ]
    }
  )
})
