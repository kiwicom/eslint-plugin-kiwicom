import * as R from 'ramda'

const UNWANTED_TRANSLATE_FUNCTION_PATH = 'tools/translate'
const UNWANTED_TRANSLATE_SELECTOR_PATH = 'intl/translateSelector'

const getImportSource = R.prop('source')

export const preferNitroTranslateFunction = {
  meta: {
    messages: {
      preferNitroTranslateFunction: `Prefer translate() imported from Nitro library import { Consumer as IntlConsumer } from "@kiwicom/nitro/lib/services/intl/context"`
    }
  },
  create: context => {
    return {
      ImportDeclaration(node) {
        const source = getImportSource(node)
        const sourcePath = R.prop('value', source)

        // get last n characters from path to compare it with UNWANTED_TRANSLATE_FUNCTION_PATH
        const sourcePathWithoutDotsForFunction = sourcePath.slice(
          sourcePath.length - UNWANTED_TRANSLATE_FUNCTION_PATH.length,
          sourcePath.length
        )

        // get last n characters from path to compare it with UNWANTED_TRANSLATE_SELECTOR_PATH
        const sourcePathWithoutDotsForSelector = sourcePath.slice(
          sourcePath.length - UNWANTED_TRANSLATE_SELECTOR_PATH.length,
          sourcePath.length
        )

        if (
          sourcePathWithoutDotsForFunction ===
            UNWANTED_TRANSLATE_FUNCTION_PATH ||
          sourcePathWithoutDotsForSelector === UNWANTED_TRANSLATE_SELECTOR_PATH
        ) {
          return context.report({
            loc: source.loc,
            messageId: 'preferNitroTranslateFunction'
          })
        }
      }
    }
  }
}
