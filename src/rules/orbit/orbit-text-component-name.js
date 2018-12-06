// text-component-name
import * as R from 'ramda'

const getImportName = R.compose(
  R.prop('value'),
  R.nth(1)
)

export const orbitTextComponentName = {
  meta: {
    messages: {
      orbitText: "Import under name OrbitText instead of '{{ name }}'"
    }
  },
  create: context => {
    return {
      ImportDeclaration(node) {
        const tokens = context.getSourceCode().getTokens(node)
        const importPath = R.path(['source', 'value'], node)

        const importName = getImportName(tokens)

        if (
          !R.equals(importName, 'OrbitText') &&
          R.equals(importPath, '@kiwicom/orbit-components/lib/Text')
        ) {
          context.report({
            node,
            loc: R.compose(
              R.prop('loc'),
              R.find(R.propEq('value', importName))
            )(tokens),
            messageId: 'orbitText',
            data: {
              name: importName
            }
          })
        }
      }
    }
  }
}
