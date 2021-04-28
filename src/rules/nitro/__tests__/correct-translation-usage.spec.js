import { ruleTester } from '../../../common/ruleTester'
const { rules } = require('../../index')

const correctTranslationUsage = rules['correct-translation-usage']

jest.mock(
  '@kiwicom/translations/lib/en-GB.json',
  () => ({
    foo: 'Foo',
    foobar: 'Foo bar',
    'foo.placeholder_x_foo': 'Foo __x__ and __foo__ bar',
    'foo.submit': 'Submit',
    'foo.submit.placeholder_x': 'Submit __x__',
    'foo.three_placeholders.two_same':
      'Your __companyName__ Credit will be refunded in __days__ days. You get bonus for __companyName__ Credit.',
    'foo.two_placeholders':
      'Your __companyName__ Credit will be refunded in __days__ days.'
  }),
  { virtual: true }
)

jest.mock(
  '@kiwicom/web-client/src/NEW_TRANSLATIONS.json',
  () => ({
    'new.key.without.final.copy': 'New key without final copy',
    'key.in.new.translations': 'Key in new translations'
  }),
  { virtual: true }
)

ruleTester.run('correct-translation-usage', correctTranslationUsage, {
  valid: [
    `
  const MyComponent = () => (
    <Button>
      <Translate t="foo.submit" />
    </Button>
  );
    `,
    `
  const MyComponent = () => (
    <Button>
      <Translate
        t="foo.submit.placeholder_x"
        values={{ x: 1337 }}
      />
    </Button>
  );
  `,
    `
  const MyComponent = () => (
    <Button>
      <Text t="foo.submit" />
    </Button>
  );
    `,
    `
  const MyComponent = () => (
    <Button>
      <Text
        t="foo.submit.placeholder_x"
        values={{ x: 1337 }}
      />
    </Button>
  );
  `,
    `
    <Text
      t="foo.two_placeholders"
      values={{ days: 10, companyName: "Skypicker" }}
    />
  `,
    `
    <Text
      t="foo.three_placeholders.two_same"
      values={{ days: 10, companyName: "Skypicker" }}
    />
  `,
    {
      code: `<Translate t="new.key.without.final.copy" />`,
      options: [
        {
          additionalTranslationsModule:
            '@kiwicom/web-client/src/NEW_TRANSLATIONS.json'
        }
      ]
    }
  ],
  invalid: [
    {
      code: `
  const MyComponent = () => (
    <Button>
      <Translate />
    </Button>
  );
    `,
      errors: ['A translation key needs to be specified.']
    },
    {
      code: `
  const MyComponent = () => (
    <Button>
      <Text />
    </Button>
  );
    `,
      errors: ['A translation key needs to be specified.']
    },
    {
      code: `
  const MyComponent = () => (
    <Button>
      <TextNode />
    </Button>
  );
    `,
      errors: ['A translation key needs to be specified.']
    },
    {
      options: [
        {
          additionalTranslationsModule:
            '@kiwicom/web-client/src/NEW_TRANSLATIONS.json'
        }
      ],
      code: `<Translate t="unknown.key" />`,
      errors: [
        "'unknown.key' is not found in translations. Make sure the key was uploaded to PhraseApp and the package @kiwicom/translations is up to date (more details: https://kiwi.wiki/consumer-product/guides/translations/). If the copy is not final yet, the key can be added into @kiwicom/web-client/src/NEW_TRANSLATIONS.json."
      ]
    },
    {
      code: `
  const MyComponent = () => (
    <Button>
      <Translate t={foo} />
    </Button>
  );
    `,
      errors: ['The translation key needs to be a string literal.']
    },
    {
      code: `
  const MyComponent = () => (
    <Button>
      <Translate t="foo" values={bar} />
    </Button>
  );
    `,
      errors: [
        'The "values" attribute needs to be an object literal or object expression.'
      ]
    },
    {
      code: `
  const MyComponent = () => (
    <Button>
      <Translate
        t="foo.placeholder_x_foo"
        values={{
          x: 1337,
          [foo]: "bar",
        }}
      />
    </Button>
  );
    `,
      errors: ['This key needs to be a string literal.']
    },
    {
      code: `
  const MyComponent = () => (
    <Button>
      <Text t={foo} />
    </Button>
  );
    `,
      errors: ['The translation key needs to be a string literal.']
    },
    {
      code: `
  const MyComponent = () => (
    <Button>
      <Text t="foo" values={bar} />
    </Button>
  );
    `,
      errors: [
        'The "values" attribute needs to be an object literal or object expression.'
      ]
    },
    {
      code: `
  const MyComponent = () => (
    <Button>
      <TextNode t="foo" values={bar} />
    </Button>
  );
    `,
      errors: [
        'The "values" attribute needs to be an object literal or object expression.'
      ]
    },
    {
      code: `
  const MyComponent = () => (
    <Button>
      <Text
        t="foo.placeholder_x_foo"
        values={{
          x: 1337,
          [foo]: "bar",
        }}
      />
    </Button>
  );
    `,
      errors: ['This key needs to be a string literal.']
    },
    {
      code: `
  const MyComponent = () => (
    <Button>
      <TranslateRef t={foo} />
    </Button>
  );
    `,
      errors: ['The translation key needs to be a string literal.']
    },
    {
      code: `
  const MyComponent = () => (
    <Button>
      <TranslateNode t={foo} />
    </Button>
  );
    `,
      errors: ['The translation key needs to be a string literal.']
    },
    {
      code: `<Text t="foo.two_placeholders" />`,
      errors: [
        "A value for the placeholder 'companyName' needs to be specified in the values object.",
        "A value for the placeholder 'days' needs to be specified in the values object."
      ]
    },
    {
      code: `
    <Text
      t="foo.three_placeholders.two_same"
      values={{ companyName: "Skypicker" }}
    />
  `,
      errors: [
        "A value for the placeholder 'days' needs to be specified in the values object."
      ]
    },
    {
      code: `
    <Text
      t="foo.three_placeholders.two_same"
      values={{ days: 10, brandName: "Skypicker" }}
    />
  `,
      errors: [
        "A value for the placeholder 'companyName' needs to be specified in the values object.",
        "This translation key does not contain the placeholder 'brandName'. Remove the key 'brandName' from the values object."
      ]
    }
  ]
})

ruleTester.run('correct-translation-usage', correctTranslationUsage, {
  valid: [
    `
<input id={id} value={value} onChange={onChange} placeholder={f("First name")} />;
      `,
    `
<input id={id} value={value} onChange={onChange} placeholder={translate(__("foo"))} />;
      `,
    `
<input id={id} value={value} onChange={onChange} placeholder={translate(__("foo.two_placeholders"), { days: 10, companyName: "Skypicker" })} />;
      `,
    `
<input id={id} value={value} onChange={onChange} placeholder={translate(__("foo.three_placeholders.two_same"), { days: 10, companyName: "Skypicker" })} />;
      `,
    {
      code: `translate(__("key.in.new.translations"))`,
      options: [
        {
          additionalTranslationsModule:
            '@kiwicom/web-client/src/NEW_TRANSLATIONS.json'
        }
      ]
    }
  ],
  invalid: [
    {
      code: `
<input id={id} value={value} onChange={onChange} placeholder={translate("First name")} />;
      `,
      errors: ['The translation key needs to be wrapped in __().']
    },
    {
      code: `
<input id={id} value={value} onChange={onChange} placeholder={translate()} />;
      `,
      errors: ['A translation key needs to be specified.']
    },
    {
      code: `
<input id={id} value={value} onChange={onChange} placeholder={translate(__())} />;
      `,
      errors: ['A translation key needs to be specified.']
    },
    {
      code: `
<input id={id} value={value} onChange={onChange} placeholder={translate(__(foobar))} />;
      `,
      errors: ['The translation key needs to be a string literal.']
    },
    {
      code: `
<input id={id} value={value} onChange={onChange} placeholder={translate(__(456))} />;
      `,
      errors: ['The translation key needs to be a string literal.']
    },
    {
      code: `
<input id={id} value={value} onChange={onChange} placeholder={translate(__(\`mmb.random.thing\`))} />;
      `,
      errors: ['The translation key needs to be a string literal.']
    },
    {
      code: `
<input id={id} value={value} onChange={onChange} placeholder={translate(__("foo.submit.placeholder_x"), {[x]: "value"})} />;
      `,
      errors: ['This key needs to be a string literal.']
    },
    {
      code: `
<input id={id} value={value} onChange={onChange} placeholder={translate(__("mmb.random.thing"))} />;
      `,
      errors: [
        "'mmb.random.thing' is not found in translations. Make sure the key was uploaded to PhraseApp and the package @kiwicom/translations is up to date (more details: https://kiwi.wiki/consumer-product/guides/translations/). If the copy is not final yet, the key can be added into a NEW_TRANSLATIONS file that you need to create according to the documentation."
      ]
    },
    {
      code: `translate(__("foo.two_placeholders"), { days: 10 })`,
      errors: [
        "A value for the placeholder 'companyName' needs to be specified in the values object."
      ]
    },
    {
      code: `translate(__("foo.two_placeholders"), { companyName: "Skypicker" })`,
      errors: [
        "A value for the placeholder 'days' needs to be specified in the values object."
      ]
    },
    {
      code: `translate(__("foo.three_placeholders.two_same"), { weeks: 7 })`,
      errors: [
        "A value for the placeholder 'companyName' needs to be specified in the values object.",
        "A value for the placeholder 'days' needs to be specified in the values object.",
        "This translation key does not contain the placeholder 'weeks'. Remove the key 'weeks' from the values object."
      ]
    }
  ]
})
