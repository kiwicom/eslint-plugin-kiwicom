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

export const rules = {
  'orbit-text-component-name': orbitTextComponentName,
  'prefer-nitro-text-component': preferNitroTextComponent
}
