# eslint-plugin-kiwicom

eslint rules in use at kiwi.com

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-kiwicom`:

```
$ npm install eslint-plugin-kiwicom --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-kiwicom` globally.

## Usage

Add `kiwicom` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "kiwicom"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "kiwicom/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





