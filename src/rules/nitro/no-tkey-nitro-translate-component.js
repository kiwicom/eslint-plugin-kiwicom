import * as R from 'ramda'

const getElementName = R.path(['name', 'name'])
const getComponentAttributes = R.path(['attributes'])

const INVALID_PROP_NAME = 'tKey'
const VALID_PROP_NAME = 't'

export const noTkeyNitroTranslateComponent = {
  meta: {
    messages: {
      invalidPropName: `Replace tKey with t`
    },
    fixable: 'code'
  },
  create: context => {
    return {
      JSXOpeningElement(node) {
        const name = getElementName(node)
        const attributes = getComponentAttributes(node)

        const nodeWithTkey = R.find(
          R.pathEq(['name', 'name'], INVALID_PROP_NAME),
          attributes
        )
        if (name === 'Translate' && nodeWithTkey) {
          return context.report({
            loc: nodeWithTkey.loc,
            messageId: 'invalidPropName',
            fix: fixer =>
              fixer.replaceTextRange(nodeWithTkey.name.range, VALID_PROP_NAME)
          })
        }
      }
    }
  }
}
