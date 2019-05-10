import { ruleTester } from '../../../common/ruleTester'
import { nitroTranslate } from '../nitro-translate'

describe('Nitro translate', function() {
  ruleTester.run('nitro-translate', nitroTranslate, {
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
  })
})
