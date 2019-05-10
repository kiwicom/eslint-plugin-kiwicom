import * as R from 'ramda'

// eslint-disable-next-line
const NITRO_PATH = "@kiwicom/nitro/lib/components/Translate"

const getImportName = R.path(['specifiers', '0', 'local', 'name'])
const getImportSource = R.prop('source')

export const nitroTranslate = {
  meta: {
    messages: {
      incorrectImport: `Import it properly dude`,
      wrongProps: `Fucked up props dude`,
      useTranslateNode: `TranslateNode here dude`
    }
  },
  create: context => {
    return {
      //   ImportDeclaration(node) {
      //     const name = getImportName(node)
      //     const source = getImportSource(node)
      //     const sourcePath = R.prop('value', source)
      //     const sourceRange = R.prop('range', source)
      //
      //     if (R.equals(name, 'Translate') && !R.equals(NITRO_PATH, sourcePath))
      //       return context.report({
      //         loc: source.loc,
      //         messageId: 'preferNitroTranslate',
      //         fix: fixer => {
      //           fixer.replaceTextRange(
      //             [sourceRange[0] + 1, sourceRange[1] - 1],
      //             NITRO_PATH
      //           )
      //         }
      //       })
      //   }
    }
  }
}
