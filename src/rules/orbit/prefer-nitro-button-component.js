import * as R from 'ramda'

const getOpeningElementName = R.path(['openingElement', 'name', 'name'])
const getElementName = R.path(['name', 'name'])
const getProps = R.map(R.path(['name', 'name']))

export const preferNitroButtonComponent = {
  meta: {
    messages: {
      preferNitroButton: `Translate is wrapped in Orbit's Button component. Prefer using Nitro's Button which does the same. import Button from "@kiwicom/nitro/lib/components/Button"`
    }
  },
  create: context => {
    return {
      JSXOpeningElement(node) {
        const elementName = getElementName(node)

        if (
          elementName === 'Button' &&
          !getProps(node.attributes).includes('t')
        ) {
          const { parent } = node

          const JSXElements = parent.children.filter(
            child => child.type === 'JSXElement'
          )
          const translateElement = JSXElements.find(
            child => getOpeningElementName(child) === 'Translate'
          )

          if (translateElement && JSXElements.length === 1) {
            return context.report({
              loc: {
                start: node.name.loc.start,
                end: parent.closingElement.name.loc.end
              },
              messageId: 'preferNitroButton'
            })
          }
        }
      }
    }
  }
}
