import * as R from 'ramda'

const getImportName = R.path(['specifiers', '0', 'local', 'name'])
const getImportSource = R.path(['source', 'value'])

const NITRO_TRANSLATE_PATH = '@kiwicom/nitro/lib/components/Translate'

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

        if (
          R.equals(name, 'Translate') &&
          !R.equals(NITRO_TRANSLATE_PATH, source)
        )
          return context.report({
            loc: node.loc,
            messageId: 'preferNitroTranslate'
          })
      }
    }
  }
}
