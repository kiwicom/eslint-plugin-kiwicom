import { ruleTester } from '../../../common/ruleTester'
import { preferNitroTranslateFunction } from '../prefer-nitro-translate-function'

describe('Prefer nitro translate function', function() {
  ruleTester.run(
    'prefer-nitro-translate-function',
    preferNitroTranslateFunction,
    {
      valid: [
        'import { Consumer as IntlConsumer } from "@kiwicom/nitro/lib/services/intl/context"',
        'import context from "@kiwicom/nitro/lib/services/intl/context"'
      ],
      invalid: [
        {
          code: `import translate from "./../../../../app/scripts/tools/translate"`,
          errors: [
            {
              messageId: 'preferNitroTranslateFunction'
            }
          ]
        },
        {
          code: `import type { TranslateFunc } from "../../../../../../app/scripts/tools/translate"`,
          errors: [
            {
              messageId: 'preferNitroTranslateFunction'
            }
          ]
        },
        {
          code: `import translateSelector from "../../../../src/common/services/intl/translateSelector"`,
          errors: [
            {
              messageId: 'preferNitroTranslateFunction'
            }
          ]
        }
      ],
      output: `Prefer translate() imported from Nitro library import { Consumer as IntlConsumer } from "@kiwicom/nitro/lib/services/intl/context"`
    }
  )
})
