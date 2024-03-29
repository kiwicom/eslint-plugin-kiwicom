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
import { selectorNaming } from './frontend/selector-naming'
import { preferNitroTranslateFunction } from './nitro/prefer-nitro-translate-function'
import { correctTranslationUsage } from './nitro/correct-translation-usage'
import { preferNitroTextNodeComponent } from './orbit/prefer-nitro-textnode-component'
import { allowedTagNamesInTranslationComponents } from './nitro/allowed-tag-names-in-translation-components'
import { preferNitroButtonComponent } from './orbit/prefer-nitro-button-component'

export const rules = {
  'orbit-text-component-name': orbitTextComponentName,
  'prefer-nitro-text-component': preferNitroTextComponent,
  'prefer-nitro-textnode-component': preferNitroTextNodeComponent,
  'prefer-nitro-translate-component': preferNitroTranslateComponent,
  'prefer-nitro-button-component': preferNitroButtonComponent,
  'no-tkey-nitro-translate-component': noTkeyNitroTranslateComponent,
  'nitro-use-string-for-non-dynamic-translation-keys': nitroUseStringForNonDynamicTranslationKeys,
  'selector-naming': selectorNaming,
  'prefer-nitro-translate-function': preferNitroTranslateFunction,
  'allowed-tag-names-in-translation-components': allowedTagNamesInTranslationComponents,
  'correct-translation-usage': correctTranslationUsage
}
