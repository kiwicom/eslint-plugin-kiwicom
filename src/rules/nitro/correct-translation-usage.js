/**
 * https://docs.google.com/document/d/1pfxYNWvq6I1-mOMKk6RZ3pEOj7QernguPf7SbR3WmXQ/edit?ts=5fd0a76d
 */

import * as R from 'ramda'

const realTranslations = require('@kiwicom/translations/lib/en-GB.json')

const parseOptions = context => {
  const { options } = context

  if (options.length < 1) {
    return {
      additionalTranslationsModule: null
    }
  }

  const { additionalTranslationsModule } = options[0]

  return { additionalTranslationsModule: additionalTranslationsModule || null }
}

const getNewTranslations = context => {
  const { additionalTranslationsModule } = parseOptions(context)

  if (!additionalTranslationsModule) {
    return {}
  }

  // webpack cannot handle parametric require of unknown modules
  // that don't exist in build time
  // see https://webpack-3.cdn.bcebos.com/api/module-variables/#__non_webpack_require__-webpack-specific-
  return __non_webpack_require__(additionalTranslationsModule)
}

const getTranslations = context => {
  const translations = {
    ...realTranslations,
    ...getNewTranslations(context)
  }

  return translations
}

const getJSXAttribute = (node, key) =>
  node.attributes.filter(attribute => attribute.name.name === key)[0] || null

const validateTranslationKeyExistsJSX = (node, context) => {
  if (getJSXAttribute(node, 't') === null) {
    return context.report({ node, messageId: 'tKeyMustBeSpecified' })
  }

  return null
}

const doesLiteralHaveStringQuotes = node => ['"', "'"].includes(node.raw[0])

const isStringLiteral = node =>
  node.type === 'Literal' && doesLiteralHaveStringQuotes(node)

const getUniquePlaceholdersFromTKey = tKeyCopy => {
  const allPlaceholders = Array.from(tKeyCopy.matchAll(/__([^_]+)__/g)).map(
    ([, key]) => key
  )

  return R.uniq(allPlaceholders)
}

const getKeysFromValuesObjectExpression = objectExpression => {
  if (!objectExpression) {
    return []
  }

  if (!objectExpression.properties) {
    return []
  }

  return objectExpression.properties.map(prop => prop.key.name)
}

const validateMissingPlaceholdersInValues = (
  node,
  context,
  expectedValuesKeys,
  currentValuesKeys
) => {
  const missingValues = R.without(currentValuesKeys, expectedValuesKeys)

  missingValues.forEach(missingValue =>
    context.report({
      node,
      messageId: 'valuesMustContainPlaceholderKey',
      data: { missingValue }
    })
  )
}

const validateRedundantKeysInValues = (
  node,
  context,
  expectedValuesKeys,
  currentValuesKeys
) => {
  const redundantValues = R.without(expectedValuesKeys, currentValuesKeys)

  redundantValues.forEach(redundantValue =>
    context.report({
      node,
      messageId: 'valuesMustNotContainRedundantKey',
      data: { redundantValue }
    })
  )
}

const describeAdditionalTranslationsModule = context => {
  const { additionalTranslationsModule } = parseOptions(context)

  if (!additionalTranslationsModule) {
    return 'a NEW_TRANSLATIONS file that you need to create according to the documentation'
  }

  return additionalTranslationsModule
}

const validatePlaceholdersAndValues = (
  node,
  context,
  placeholdersInTranslation,
  placeholdersInValuesObject
) => {
  validateMissingPlaceholdersInValues(
    node,
    context,
    placeholdersInTranslation,
    placeholdersInValuesObject
  )
  validateRedundantKeysInValues(
    node,
    context,
    placeholdersInTranslation,
    placeholdersInValuesObject
  )
}

const validateTranslationKeyFunction = (node, context) => {
  if (node.arguments.length < 1) {
    return context.report({ node, messageId: 'tKeyMustBeSpecified' })
  }

  const translateKeyWrapper = node.arguments[0]
  const objectValuesWrapper = node.arguments[1]

  if (
    translateKeyWrapper.type !== 'CallExpression' ||
    translateKeyWrapper.callee.name !== '__'
  ) {
    return context.report({ node, messageId: 'tKeyMustBeWrapped' })
  }

  const translateKey = translateKeyWrapper.arguments[0] || null

  if (translateKey === null) {
    return context.report({ node, messageId: 'tKeyMustBeSpecified' })
  }

  if (!isStringLiteral(translateKey)) {
    return context.report({ node, messageId: 'tKeyMustBeStringLiteral' })
  }

  const tKey = translateKey.value
  const tKeyCopy = getTranslations(context)[tKey]

  if (!tKeyCopy) {
    return context.report({
      node,
      messageId: 'tKeyNotFoundInTranslations',
      data: {
        tKey,
        additionalTranslationsModule: describeAdditionalTranslationsModule(
          context
        )
      }
    })
  }

  validatePlaceholdersAndValues(
    node,
    context,
    getUniquePlaceholdersFromTKey(tKeyCopy),
    getKeysFromValuesObjectExpression(objectValuesWrapper)
  )

  return null
}

const validateTranslationKey = (node, context) => {
  const translationKeyAttribute = getJSXAttribute(node, 't')

  if (translationKeyAttribute) {
    if (translationKeyAttribute.value.type !== 'Literal') {
      return context.report({
        node: translationKeyAttribute,
        messageId: 'tKeyMustBeStringLiteral'
      })
    }

    const tKey = translationKeyAttribute.value.value
    const tKeyCopy = getTranslations(context)[tKey]

    if (!tKeyCopy) {
      return context.report({
        node: translationKeyAttribute,
        messageId: 'tKeyNotFoundInTranslations',
        data: {
          tKey,
          additionalTranslationsModule: describeAdditionalTranslationsModule(
            context
          )
        }
      })
    }

    validatePlaceholdersAndValues(
      node,
      context,
      getUniquePlaceholdersFromTKey(tKeyCopy),
      getKeysFromValuesObjectExpression(getValuesObjectFromJSX(node))
    )
  }

  return null
}

const validateValuesObject = (context, valuesObject) => {
  if (valuesObject !== null) {
    if (valuesObject.type !== 'ObjectExpression') {
      return context.report({
        node: valuesObject,
        messageId: 'valuesMustBeObject'
      })
    }

    valuesObject.properties.forEach(property => {
      if (property.computed) {
        context.report({
          node: property,
          messageId: 'valuesKeyMustBeStringLiteral'
        })
      }
    })
  }

  return null
}

const isTranslationComponent = node =>
  [
    'Translate',
    'TranslateRef',
    'TranslateNode',
    'Text',
    'TextNode',
    'LinkButton',
    'LinkButtonLink'
  ].includes(node.name.name)

const getValuesObjectFromJSX = node => {
  const attribute = getJSXAttribute(node, 'values')

  if (!attribute) {
    return null
  }

  return attribute.value.expression
}

const getValuesObjectFromFunctionCall = node => {
  if (node.arguments.length < 2) {
    return null
  }

  return node.arguments[1]
}

export const correctTranslationUsage = {
  meta: {
    schema: [
      {
        type: 'object',
        properties: {
          additionalTranslationsModule: {
            type: 'string'
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      tKeyMustBeSpecified: 'A translation key needs to be specified.',
      tKeyMustBeStringLiteral:
        'The translation key needs to be a string literal.',
      tKeyMustBeWrapped: 'The translation key needs to be wrapped in __().',
      tKeyNotFoundInTranslations:
        "'{{ tKey }}' is not found in translations.\n If the copy is not final yet, the key can be added into {{ additionalTranslationsModule }}.\n Otherwise, make sure the key was uploaded to PhraseApp and the package @kiwicom/translations is up to date (more details: https://kiwi.wiki/consumer-product/guides/translations/).",
      valuesKeyMustBeStringLiteral: 'This key needs to be a string literal.',
      valuesMustBeObject:
        'The "values" attribute needs to be an object literal or object expression.',
      valuesMustContainPlaceholderKey:
        "A value for the placeholder '{{ missingValue }}' needs to be specified in the values object.",
      valuesMustNotContainRedundantKey:
        "This translation key does not contain the placeholder '{{ redundantValue }}'. Remove the key '{{ redundantValue }}' from the values object."
    }
  },
  create: context => ({
    JSXOpeningElement: node => {
      if (isTranslationComponent(node)) {
        validateTranslationKeyExistsJSX(node, context)
        validateTranslationKey(node, context)
        validateValuesObject(context, getValuesObjectFromJSX(node))
      }

      return null
    },
    CallExpression: node => {
      if (node.callee.name === 'translate') {
        validateTranslationKeyFunction(node, context)
        validateValuesObject(context, getValuesObjectFromFunctionCall(node))
      }
    }
  })
}
