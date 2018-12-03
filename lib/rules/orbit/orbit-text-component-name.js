// in your rule
import * as R from 'ramda'

export const orbitTextComponentName = {
  meta: {
    messages: {
      orbitText: "Import under name OrbitText instead of '{{ name }}'"
    }
  },
  create: context => {
    return {
      ImportDeclaration(node) {
        const importPath = R.path(['source', 'value'], node)
        const importName = R.path(['specifiers', 0, 'local', 'name'], node)

        if (
          R.equals(importPath, '@kiwicom/orbit-components/lib/Text') &&
          !R.equals(importName, 'OrbitText')
        ) {
          context.report({
            node,
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
