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

import { orbitTextComponentName } from './rules/orbit/orbit-text-component-name'

export const rules = {
  'orbit-text-component-name': orbitTextComponentName
}
