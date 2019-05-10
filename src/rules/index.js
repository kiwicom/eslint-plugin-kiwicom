/**
 * @fileoverview eslint rules in use at kiwi.com
 * @author RICHARD IVAN
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

import { orbitTextComponentName } from './orbit/orbit-text-component-name'
import { preferNitroTextComponent } from './orbit/prefer-nitro-text-component'
import { preferNitroTranslateComponent } from './nitro/prefer-nitro-translate-component'
import { noTkeyNitroTranslateComponent } from './nitro/no-tkey-nitro-translate-component'
import { nitroUseStringForNonDynamicTranslationKeys } from './nitro/nitro-use-string-for-non-dynamic-translation-keys'
import { nitroTranslate } from './nitro/nitro-translate'

export const rules = {
  'orbit-text-component-name': orbitTextComponentName,
  'prefer-nitro-text-component': preferNitroTextComponent,
  'prefer-nitro-translate-component': preferNitroTranslateComponent,
  'no-tkey-nitro-translate-component': noTkeyNitroTranslateComponent,
  'nitro-use-string-for-non-dynamic-translation-keys': nitroUseStringForNonDynamicTranslationKeys,
  'nitro-translate': nitroTranslate
}
