import { ruleTester } from '../../../common/ruleTester'
import { preferNitroTranslateComponent } from '../prefer-nitro-translate-component'

describe('Prefer nitro text', function() {
  ruleTester.run(
    'prefer-nitro-translate-component',
    preferNitroTranslateComponent,
    {
      valid: [
        'import Translate from "@kiwicom/nitro/lib/components/Translate"',
        'import { Translate } from "@kiwicom/nitro/lib/components/Translate"'
      ],
      invalid: [
        {
          code: `import Translate from "./../../../../app/scripts/components/Translate"`,
          errors: [
            {
              messageId: 'preferNitroTranslate'
            }
          ]
        }
      ],
      output: `Prefer Translate imported from Nitro library import Translate from "@kiwicom/nitro/lib/components/Translate"`
    }
  )
})
