---
layout: post
title: Yarn Workspaces does not Honor _.npmrc_ Location Precedence: Implications and Possible Solutions

slug: yarn-workspaces-bug
date: 2019-10-04
categories: yarn
medium:
  - yarn-workspaces
  - troubleshooting
---

Yarn Workspaces has a bug that does not respect the location precedence of .npmrc / .yarnrc files to configure registry settings if you [run a yarn command in a selected workspace](https://yarnpkg.com/lang/en/docs/cli/workspace/). Consider the following situation:
- A _.npmrc_ file located at home folder specifies a [registry](https://docs.npmjs.com/configuring-your-registry-settings-as-an-npm-enterprise-user) entry to use a private npm registry.
- A _.npmrc_ file located at a project root specifies a registry entry to target a public npm registry like this `registry=https://registry.npmjs.org`.

In my current project, I have such a situation. The default situation is that projects need a registry setup to use the internal [Artifactory](https://jfrog.com/artifactory/). One project requires a setup to target the public npm registry. The problem of this project is that adding a dependency to a specific yarn workspaces package with the following command uses the wrong registry setup (the setup of `~/.npmrc` instead of `.npmrc` file located at project root):

```bash
$ yarn workspace package-a add @rooks/use-previous
```

The problem is that wrong URLs are put into the `yarn.lock` file (targeting the private registry).

However, if you add a dependency globally with the `-W` flag, then the `.npmrc` precedence is honored:

```bash
$ yarn add @rooks/use-previous -W
```

This bug seems to exist [for a very long time](https://github.com/yarnpkg/yarn/issues/4458).

The following workarounds are possible:
- Use the `--registry` flag

```bash
$ yarn workspace package-a add @rooks/use-previous --registry 'https://registry.yarnpkg.com'
```
- Manually add the dependency to the `package.json` of _package-a_ and run `yarn install` from the root folder of the project.
- Copy `~/.npmrc` to every project root folder that need this registry setup and delete `~/.npmrc`. If you have private settings (e.g., your user credentials) in the file, pay attention that you do not push the file to VCS (dd it to `.gitignore`).
- Don't use yarn workspaces. E.g., use [Lerna](https://github.com/lerna/lerna) with npm.
