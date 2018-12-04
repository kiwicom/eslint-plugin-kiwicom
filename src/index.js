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
if (module.hot) {
  module.hot.accept('./rules/index.js', () => {
    console.log('🔁  HMR Reloading `./app`...')
  })
}

export { rules } from './rules/index.js'
