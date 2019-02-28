import { ruleTester } from '../../../common/ruleTester'
import { noTkeyNitroTranslateComponent } from '../no-tkey-nitro-translate-component'

describe('Prefer nitro text', function() {
  ruleTester.run(
    'prefer-nitro-translate-component',
    noTkeyNitroTranslateComponent,
    {
      valid: ['<Translate t="asdf" />'],
      invalid: [
        {
          code: '<Translate tKey="asdf" />',
          errors: [
            {
              messageId: 'invalidPropName'
            }
          ]
        }
      ],
      output: `Replace tKey with t`
    }
  )
})
