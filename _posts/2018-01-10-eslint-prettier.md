---
layout: post
title: Establishing an efficient Code Analyzing and Formatting Workflow (for Vue.js) with ESLint and Prettier
---

Lately, I have been investigating quite some time into linting and formatting of JavaScript code for large projects with many developers and a diverse set of editors or IDEs. In many projects at work, tools like jshint, eslint, or prettier are all over the place. I realized that I didn't have a thorough overview of concepts and technologies for static code analyzing and formatting. Thus, I started to get a better idea on how to establish a robust workflow that also works for different editors as well as from npm scripts.

# ESLint

Jani Hartikainen [provides a good comparison](https://www.sitepoint.com/comparison-JavaScript-linting-tools/) of [JSLint](http://www.jslint.com/), [JSHint](http://jshint.com/), [JSCS](http://jscs.info/), and [ESLint](https://eslint.org/), which constitute JavaScript linting tools. In 2016, JSCS has merged with ESLint since both tools were solving similar problems.

Currently, ESLint is the most popular linting utility and is shipped by many starter projects and scaffolding tools. ESlint is a command-line tool that works very well with [ES6](http://es6-features.org/) and supports [JSX](https://jsx.github.io/). It is based on an extensible architecture. As we see later, there exists an official [ESLint Plugin for Vue.js](https://github.com/vuejs/eslint-plugin-vue) in order to provide linting for [Single File Components](https://vuejs.org/v2/guide/single-file-components.html).

Linting rules can be defined within _.eslintrc.\*_ [configuration files](https://eslint.org/docs/user-guide/configuring). ESLint supports config files in several formats: _.eslintrc.js_, _.eslintrc.yaml_, _.eslintrc.yml_, _.eslintrc.json_. The widely used _.eslintrc_ file has been deprecated. Configuration can also be provided as a property in a _package.json_ file.

The following snippet shows an _.eslintrc.js_ file that defines some custom rules with the _rules_ object.

```JavaScript
// http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#JavaScript-standard-style
  extends: ["standard"],
  plugins: ["html"],
  // add your custom rules here
  rules: {
    "space-before-function-paren": "off",
    // "indent": ["error", 4, { "SwitchCase": 1 }],
    indent: 0,
    "no-tabs": 0,
    "eol-last": "off",
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0
  }
};
```

As you can see with the _extends_ array in the previous snippet, ESLint's extensible nature allows for incorporating 3rd-party rules provided as [npm](https://www.npmjs.com/) packages. In this example [eslint-config-standard](https://github.com/standard/eslint-config-standard) is used to incorporated [JavaScript Standard Style](https://standardjs.com) rules. It's perfectly ok to override extended rules with custom rules in the _rules_ object.

There can exist multiple _.eslintrc.\*_ files in a project.
ESLint picks up the file that is [located closest](https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy) to the current file processed for linting. With this approach, a basic _.eslintrc.\*_ file can be provided in the project's root folder. Additional rules can be provided or already defined rules can be overridden in additional _.eslintrc.\*_ files. As an example, the following snippet represents an example for a compact _.eslintrc.json_ file that provides configuration for files located in a testing folder. With this setup, ESLint can deal with [jest](https://facebook.github.io/jest/) and [mocha](https://mochajs.org/) tests.

```json
{
  "env": {
    "mocha": true,
    "jest": true
  },
  "globals": {
    "expect": true,
    "sinon": true
  }
}
```

A great feature of ESLint is its auto-fixing capability. With the _--fix_ option on the command line, ESLint makes changes to the linted source code for fixable errors. As we see later, this feature can also be leveraged from IDEs on save that allows for a very pleasant frontend development workflow.

Besides static code analyzing, ESLint also features code formatting capabilities. However, in corporation with Prettier this can lead to problems due to contrary formatting configurations. But it is possible to disable all ESLint rules relating to code formatting and use Prettier only for beautifying your code.

# Prettier

[Prettier](https://prettier.io/) is a zero-configuration code formatting utility by design. Its only purpose is to reformat source code; but Prettier does this job well. [The main goal](http://jlongster.com/A-Prettier-Formatter) of Prettier is to remove all the distractions of writing code by allowing the developer writing code as he likes. Prettier instantly formats the code correctly on save.

It is a relatively young tool that just turned one year at the beginning of 2018. It supports JavaScript including [ES2017](http://2ality.com/2016/02/ecmascript-2017.html), [JSX](https://facebook.github.io/jsx/), [TypeScript](https://www.typescriptlang.org/), [Flow](https://flow.org/), but also [SCSS](http://sass-lang.com/), and more. Recently, it is possible for developers to add new languages to Prettier with the help of [plugins](https://prettier.io/docs/en/plugins.html).

Prettier can be [integrated](https://prettier.io/docs/en/editors.html) with many popular development environments, including [Sublime Text](https://www.sublimetext.com/), [Visual Studio Code](https://code.visualstudio.com/), or [Webstorm](https://www.jetbrains.com/webstorm/).

A common use case is to use Prettier's [CLI](https://prettier.io/docs/en/cli.html) from [npm scripts](https://docs.npmjs.com/misc/scripts). Therefore, you can install Prettier via npm.

```bash
yarn add prettier
```

In addition, there exists JavaScript [API](https://prettier.io/docs/en/api.html) support.

# Using ESLint with Prettier

It would be great if Prettier and ESLint would work together hand in hand. And indeed, Prettier is built for [integration](https://prettier.io/docs/en/eslint.html) with ESLint. There exist [several ways](https://prettier.io/docs/en/related-projects.html) to achieve such an scenario. However, my concrete workflow intends to use ESLint for static code analysis only and to utilize Prettier for code formatting. Furthermore, I would like to auto-fix (if possible) detected programming errors along with derivations from coding conventions by ESLint as well as violations of formatting conventions by Prettier. This should be possible through running npm scripts manually or by commit hooks. But the most important requirement is to perform all this right in the IDE to hand when the developer performs a save. And all this should be also works with [Vue.js Single File Components](https://vuejs.org/v2/guide/single-file-components.html). In the following, I show you how this can be achieved.

With ESLint and Prettier already installed, we need to further install a couple of npm packages:

```bash
yarn add --dev eslint-plugin-prettier eslint-config-prettier
```

The job of [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) is to turn off all ESLint rules that are unnecessary or might conflict with Prettier.

With the help of the ESLint plugin [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) we add Prettier as an ESLint rule.

Consider the following _.eslintrc.\*_ file.

```javascript
module.exports = {
  // https://github.com/prettier/eslint-config-prettier
  extends: ["prettier"],
  // https://github.com/prettier/eslint-plugin-prettier
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error"
  }
};
```

In the _extends_ array we utilize _eslint-config-prettier_ to disable all formatting rules provided by ESLint. With the entry to the _plugins_ array, we activate _eslint-plugin-prettier_ that makes the whole process possible: ESLint runs Prettier as an ESLint rule, reports differences as individual ESLint issues, and performs auto-fixing for fixable Prettier violations. With this setup in place, all [programming flaws](https://eslint.org/docs/rules/) are still detected by ESLint.

The configuration above can also be written in a more [concise](https://github.com/prettier/eslint-plugin-prettier#recommended-configuration) way to achieve the same goal.

```javascript
module.exports = {
  // https://github.com/prettier/eslint-config-prettier
  extends: ["plugin:prettier/recommended"]
};
```

Assuming that _eslint_ is installed as a local or global npm module, we can provide a _lint_ script for processing all JavaScript and Vue.js files in a _package.json_ file. With the script _lint-autofix_ fixable errors are resolved and written back to the source code file.

```json
{
  "scripts": {
    "lint": "eslint --ext .js,.vue src test",
    "lint-autofix": "eslint --ext .js,.vue src test --fix"
  }
}
```

With the current setup, _\*.vue_ files are not processed correctly yet, but we deal with this [later in this article](#vue).

With the configuration of the previous _.eslintrc.js_ file, all ESLint rules relating to code formatting are disabled, and only rules that detect patterns in the AST are enabled. However, you might want to have one of the popular code formatting configurations in place, e.g., the config from [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) or for [JavaScript Standard Style](https://www.npmjs.com/package/eslint-config-standard). In combination with our setup, we have to use ESLint plugins that are [supported](https://github.com/prettier/eslint-config-prettier#installation) by _eslint-config-prettier_, e.g., [eslint-plugin-standard](https://github.com/xjamundx/eslint-plugin-standard) for aforementioned JavaScript Standard Style. In the _.eslintrc.\*_ file, _prettier/standard_ has to be added after _prettier_ to the _extends_ array.

```javascript
module.exports = {
  // https://github.com/prettier/eslint-config-prettier
  extends: ["prettier", "prettier/standard"],
  // https://github.com/prettier/eslint-plugin-prettier
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error"
  }
};
```

Because of the wide range of possibilities to write _.eslintrc.\*_ files, it is not always obvious that the ESLint configuration contains rules that [conflict with Prettier](https://github.com/prettier/eslint-config-prettier#cli-helper-tool). _eslint-config-prettier_ is shipped with a CLI helper tool that checks for any of those problems. In our _package.json_ we add another script named _eslint-check_ to the end of the _scripts_ object.

```bash
{
  "scripts": {
    "lint": "eslint --ext .js,.vue src test",
    "lint-autofix": "eslint --ext .js,.vue src test --fix",
    "eslint-check": "eslint --print-config .eslintrc.js | eslint-config-prettier-check"
  }
}
```

# ESLint with Git hooks

In order to improve the quality of the code base of a software development project, it might be helpful to use [Git hooks](https://git-scm.com/docs/githooks) to reduce defective code getting into remote repositories. In the following, we install [Husky](https://github.com/typicode/husky) that makes using Git hooks easy.

```bash
yarn add --dev husky
```

With _Husky_ in place, we can add Git hooks by [adding corresponding npm scripts](https://github.com/typicode/husky/blob/master/HOOKS.md) to _package.json_. With _&quot;precommit&quot;_ we can add a pre-commit hook that allows us to abort a Git commit if the npm script does return an exit code other than 0, which stands for &quot;successful&quot;.

```json
{
  "scripts": {
    "lint": "eslint --ext .js,.vue src test",
    "lint-autofix": "eslint --ext .js,.vue src test --fix",
    "eslint-check":
      "eslint --print-config .eslintrc.js | eslint-config-prettier-check",
    "precommit": "npm run lint-check && npm run lint"
  }
}
```

In the previous example, the pre-commit hook prevents committing if the lint check or our actual linting script are not successful. This is a great option to improve development productivity. The next picture shows an example output of a failed _precommit_ script.

![Example for a failed pre-commit hook](../images/precommit-error-husky.png)

# Prettier with EditorConfig

# <a name="vue"></a>Vue.js
