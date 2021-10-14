import * as R from 'ramda'

const ALLOWED_TAG_NAMES = ['ref', 'ref1', 'ref2', 'ref3', 'ref4', 'ref5']
const COMPONENT_WITH_PROP_TAGS = ['TranslateNode', 'TextNode']

const getElementName = R.path(['name', 'name'])
const getComponentAttributes = R.path(['attributes'])
const getAttributeProperties = R.path(['value', 'expression', 'properties'])

export const allowedTagNamesInTranslationComponents = {
  meta: {
    messages: {
      invalidTagName: `Tag name {{ invalidTagName }} is not allowed. Allowed tag names: ${ALLOWED_TAG_NAMES.join(
        ', '
      )}`
    }
  },
  create: context => {
    return {
      JSXOpeningElement(node) {
        const name = getElementName(node)

        if (COMPONENT_WITH_PROP_TAGS.includes(name)) {
          const attributes = getComponentAttributes(node)

          const nodeWithTagsAttribute = R.find(
            R.pathEq(['name', 'name'], 'tags'),
            attributes
          )

          if (nodeWithTagsAttribute) {
            const tagNameNodes = getAttributeProperties(
              nodeWithTagsAttribute
            ).map(property => property.key)

            tagNameNodes.forEach(tagNameNode => {
              if (!ALLOWED_TAG_NAMES.includes(tagNameNode.name)) {
                return context.report({
                  loc: tagNameNode.loc,
                  messageId: 'invalidTagName',
                  data: { invalidTagName: tagNameNode.name }
                })
              }
            })
          }
        }
      }
    }
  }
}
