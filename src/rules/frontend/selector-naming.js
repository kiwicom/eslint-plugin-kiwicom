import * as R from 'ramda'

export const selectorNaming = {
  meta: {
    messages: {
      incorrectSelectorName: `Selector should end with Selector. eg. instead of getBaggage, use getBaggageSelector`
    }
  },
  create: context => {
    return {
      ExportNamedDeclaration(node) {
        const source = context.getSource(node)
        const declaration = node.declaration
        if (!declaration) return
        const doesNameEndWithSelector = R.endsWith(
          'Selector',
          declaration.kind === 'const'
            ? declaration.declarations[0].id.name
            : declaration.id.name
        ) //?
        if (
          !doesNameEndWithSelector &&
          (source.includes('state => state') ||
            source.includes('createSelector('))
        ) {
          return context.report({
            node,
            messageId: 'incorrectSelectorName'
          })
        }
      }
    }
  }
}
