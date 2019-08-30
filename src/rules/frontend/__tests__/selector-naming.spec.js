import { ruleTester } from '../../../common/ruleTester'
import { selectorNaming } from '../selector-naming'

describe('Frontend Selectors', function() {
  ruleTester.run('selector-naming', selectorNaming, {
    valid: [
      'export const asdfSelector = state => state.asdf',
      'export const asdfSelector = createSelector(state => state.asdf, asdf => asdf)',

      'const asdf = state => state.asdf',
      'const asdf = createSelector(state => state.asdf, asdf => asdf)',

      'function asdf(state) { return state.asdf }',
      'function asdf() { return createSelector(state => state.asdf, asdf => asdf) }'
    ],
    invalid: [
      {
        code: `export const asdf = state => state.asdf`,
        errors: [
          {
            messageId: 'incorrectSelectorName'
          }
        ]
      },
      {
        code: `export const asdf = createSelector(s => s.asdf, asdf => asdf)`,
        errors: [
          {
            messageId: 'incorrectSelectorName'
          }
        ]
      },
      {
        code: `export function asdf() { return state => state.asdf }`,
        errors: [
          {
            messageId: 'incorrectSelectorName'
          }
        ]
      },
      {
        code: `export function asdf() { return createSelector(s => s.asdf, asdf => asdf) }`,
        errors: [
          {
            messageId: 'incorrectSelectorName'
          }
        ]
      }
    ],
    output: `Selector should end with Selector. eg. instead of getBaggage, use getBaggageSelector`
  })
})
