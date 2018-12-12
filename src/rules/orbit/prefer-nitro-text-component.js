// text-component-name-push
import * as R from 'ramda'

const getOpeningElementName = R.path(['openingElement', 'name', 'name'])
const getElementName = R.path(['name', 'name'])

export const preferNitroTextComponent = {
  meta: {
    messages: {
      preferNitroText: `Prefer Text imported from Nitro library
      
      import Text from "@kiwicom/nitro/lib/components/Text"'
      `
    }
  },
  create: context => {
    return {
      JSXOpeningElement(node) {
        const elementName = getElementName(node)
        if (elementName === 'OrbitText') {
          const parent = node.parent

          const JSXElements = parent.children.filter(
            child => child.type === 'JSXElement'
          )
          const translateElement = JSXElements.find(
            child => getOpeningElementName(child) === 'Translate'
          )

          const closingElement = parent.closingElement

          if (translateElement && JSXElements.length === 1) {
            return context.report({
              loc: {
                start: node.name.loc.start,
                end: closingElement.name.loc.end
              },
              messageId: 'preferNitroText'
            })
          }
        }
      }
    }
  }
}
