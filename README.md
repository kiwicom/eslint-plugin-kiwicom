[![CircleCI](https://circleci.com/gh/kiwicom/eslint-plugin-kiwicom.svg?style=svg)](https://circleci.com/gh/kiwicom/eslint-plugin-kiwicom)
[![Coverage Status](https://coveralls.io/repos/github/kiwicom/eslint-plugin-kiwicom/badge.svg?branch=master)](https://coveralls.io/github/kiwicom/eslint-plugin-kiwicom?branch=master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

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

## How to contribute

* Clone repository
* Install dependencies
* Optionally use [Wallabyjs](https://wallabyjs.com/)
* Create a pull request

### How to release a new version - Conventional changelog
This project is using Semantic Release for releasing to npm. We use [Angular conventional changelog](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) for commit mesages in it's commit analyzer plugin.





