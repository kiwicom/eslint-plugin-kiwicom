import * as R from 'ramda'

const getElementName = R.path(['name', 'name'])
const getComponentAttributes = R.path(['attributes'])

export const nitroUseStringForNonDynamicTranslationKeys = {
  meta: {
    messages: {
      useStringForNonDynamicTranslationKeys: `Remove __() for non-dynamic translation keys`
    },
    fixable: 'code'
  },
  create: context => {
    return {
      JSXOpeningElement(node) {
        const name = getElementName(node)
        const attributes = getComponentAttributes(node)

        if (
          name === 'Translate' ||
          name === 'TranslateNode' ||
          name === 'Text' ||
          name === 'TextNode'
        ) {
          const att = attributes.find(attr => getElementName(attr) === 't')
          if (R.pathEq(['value', 'expression', 'callee', 'name'], '__', att)) {
            const attStart = att.value.start
            const attEnd = att.value.end
            const tKey = att.value.expression.arguments[0].raw
            // return context.report(att, "oh oh")
            return context.report({
              node: R.path(['value', 'expression', 'arguments', 0], att),
              messageId: 'useStringForNonDynamicTranslationKeys',
              fix: fixer => fixer.replaceTextRange([attStart, attEnd], tKey)
            })
          }
        }
      }
    }
  }
}
