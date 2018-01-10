---
layout: post
title: Establishing an efficient Code Analyzing and Formatting Workflow (for Vue.js applications) with eslint and prettier
---

Lately, I have been investigating quite some time into linting and formatting of Javascript code for large projects with many developers and a diverse set of editors or IDEs. In many projects at work tools like jshint, eslint, or prettier are all over the place. I realized that I didn't have a thorough overview of concepts and technologies for static code analyzing and formatting. Thus, I started to get a better idea on how to establish a robust workflow that also works for different editors as well as from npm scripts.

# eslint

Jani Hartikainen [provides a good comparison](https://www.sitepoint.com/comparison-javascript-linting-tools/) of [JSLint](http://www.jslint.com/), [JSHint](http://jshint.com/), [JSCS](http://jscs.info/), and [ESLint](https://eslint.org/), which constitute Javascript linting tools. In 2016, JSCS has merged with ESLint since both tools were solving similar problems.

Currently, ESLint is the most popular linting utility and is shipped by many boilerplate projects and scaffolding tools. ESlint is a command-line tool that works very well with [ES6](http://es6-features.org/) and supports [JSX](https://jsx.github.io/). It is based on an extensible architecture. As we see later, there exists an official [ESLint Plugin for Vue.js](https://github.com/vuejs/eslint-plugin-vue) in order to provide linting for [Single File Components](https://vuejs.org/v2/guide/single-file-components.html).

Linting rules can be defined within _.eslintrc.\*_ [configuration files](https://eslint.org/docs/user-guide/configuring). ESLint supports config files in several formats: _.eslintrc.js_, _.eslintrc.yaml_, _.eslintrc.yml_, _.eslintrc.json_. The widely used _.eslintrc_ file has been deprecated. Configuration can also be provided as a property in a _package.json_ file.

The following snippet shows an _.eslintrc.js_ file that defines some custom rules with the _rules_ object.

```javascript
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
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
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

As you can see with the _extends_ array in the previous snippet, the ESLint's extensible nature allows for incorporating 3rd-party rules provided as [npm](https://www.npmjs.com/) packages. In this example [eslint-config-standard](https://github.com/standard/eslint-config-standard) is used to incorporated [Javascript Standard Style](https://standardjs.com) rules. It's perfectly ok to override extended rules with custom rules in the _rules_ object.

There can exist multiple _.eslintrc_ files in a project.
ESLint picks up the file that is [located closest](https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy) to the current file to lint. With this approach, a basic _.eslintrc_ file can be provided in the project's root folder. Additional rules can be provided or already defined rules can be overridden in additional _.eslintrc_ files. As an example, the following snippet represents an example for a compact _.eslintrc.json_ file that provides configuration for files located in a testing folder. With this setup, ESLint can deal with [jest](https://facebook.github.io/jest/) and [mocha](https://mochajs.org/) tests.

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

A great feature of ESLint is its autofixing capability. With the _--fix_ option on the command line, ESLint makes changes to the linted source code for fixable errors. As we see later, this feature can also be leveraged from IDEs on save that allows for a very pleasant frontend development workflow.

Besides static code analyzing, ESLint also features code formatting capabilities. However, in corporation with Prettier this can lead to problems due to incompatible formatting configurations.

# Prettier
