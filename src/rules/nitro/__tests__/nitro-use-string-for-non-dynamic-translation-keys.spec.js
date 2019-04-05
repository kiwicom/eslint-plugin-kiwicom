import { ruleTester } from '../../../common/ruleTester'
import { nitroUseStringForNonDynamicTranslationKeys } from '../nitro-use-string-for-non-dynamic-translation-keys'

describe('Nitro: Use string for non-dynamic translation keys', function() {
  ruleTester.run(
    'nitro-use-string-for-non-dynamic-translation-keys',
    nitroUseStringForNonDynamicTranslationKeys,
    {
      valid: [
        '<Translate t="example.key.title" />',
        '<Translate t={giveMeKey()} />',
        '<Translate t={STATUSES[status]} />',
        '<Translate t={condition ? __("example.title.1") : __("example.title.2")} />',
        '<Translate t={"condition" ? __("example.title.1") : __("example.title.2")} />',
        '<TranslateNode t="example.key.title" />',
        '<Text t="example.key.title" />',
        '<TextNode t="example.key.title" />',
        `<TextNode size="large" t="booking.manage.thank_you.body" />`,
        `<Text size="large" t="booking.manage.thank_you.body" />`,
        `<Translate t="booking.manage.thank_you.body" size="large" />`,
        `<TranslateNode size="large" t="booking.manage.thank_you.body" />`,
        `<TextNode
          size="large"
          t="booking.manage.thank_you.body"
        />`,
        `<Text
          size="large"
          t="booking.manage.thank_you.body"
        />`,
        `<Translate
          t="booking.manage.thank_you.body"
          size="large"
        />`,
        `<TranslateNode
          size="large"
          t="booking.manage.thank_you.body"
        />`
      ],
      invalid: [
        {
          code: '<Translate t={__("example.key.title")} />',
          output: '<Translate t="example.key.title" />',
          errors: [
            {
              messageId: 'useStringForNonDynamicTranslationKeys'
            }
          ]
        },
        {
          code: '<Text t={__("example.key.title")} size="small" />',
          output: '<Text t="example.key.title" size="small" />',
          errors: [
            {
              messageId: 'useStringForNonDynamicTranslationKeys'
            }
          ]
        },
        {
          code: `<TextNode
t={__("example.key.title")}
size="small" />`,
          output: `<TextNode
t="example.key.title"
size="small" />`,
          errors: [
            {
              messageId: 'useStringForNonDynamicTranslationKeys'
            }
          ]
        }
      ],
      output: `Remove __() for non-dynamic translation keys`
    }
  )
})
