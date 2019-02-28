import * as R from 'ramda'

// eslint-disable-next-line
const NITRO_PATH = "@kiwicom/nitro/lib/components/Translate"

const getImportName = R.path(['specifiers', '0', 'local', 'name'])
const getImportSource = R.prop('source')

export const preferNitroTranslateComponent = {
  meta: {
    messages: {
      preferNitroTranslate: `Prefer Translate imported from Nitro library import Translate from "@kiwicom/nitro/lib/components/Translate"`
    }
  },
  create: context => {
    return {
      ImportDeclaration(node) {
        const name = getImportName(node)
        const source = getImportSource(node)
        const sourcePath = R.prop('value', source)
        const sourceRange = R.prop('range', source)

        if (R.equals(name, 'Translate') && !R.equals(NITRO_PATH, sourcePath))
          return context.report({
            loc: source.loc,
            messageId: 'preferNitroTranslate',
            fix: fixer => {
              fixer.replaceTextRange(sourceRange, NITRO_PATH)
            }
          })
      }
    }
  }
}
