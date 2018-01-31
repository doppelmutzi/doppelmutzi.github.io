---
layout: post
title: Unit Testing of Vuex Actions with Mocha and Sinon
slug: vuex-testing-mocha-sinon
date: 2018-01-30
categories: JavaScript
medium:
- mocha
- vuex
- vue.js
- testing
- actions
---

# ESLint Configuration

_.eslintrc.json_

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

_.babelrc_

```json
{
  "presets": [["es2015", { "modules": false }], "stage-2"],
  "plugins": ["transform-runtime"],
  "comments": false,
  "env": {
    "test": {
      "plugins": ["istanbul", "transform-es2015-modules-commonjs"]
    }
  }
}
```

## Vue Project Setup

* webpack template
* adaptions: ...
* Anleitung wie es erstellt werden kann

## Infos zu Demo Projekt

* Demo github Projekt aufsetzen

## Using axios-mock-adapter for Testing Successful and Failing Requests

## Mocking Asynchronous Code with Sinon

## Skeleton for Testing Actions

```javascript
import sinon from "sinon";
import sinonChai from "sinon-chai";
import chai from "chai";
import Vue from "vue";

import { testAction } from "./testUtils";
import actions from "@/store/actions";
import * as mutationTypes from "@/store/mutation-types";
import StompPlugin from "@/store/StompPlugin";
import * as stompTypes from "@/store/stomp-message-types";

chai.use(sinonChai);
Vue.use(StompPlugin);

describe("actions", () => {
  beforeEach(function() {
    mock.reset();
  });
  describe("user actions", () => {
    /* tests here */
  });
});
```

## Implementing Action Tests

### Checking if Commit is Invoked Correctly

```Javascript

```

### Check if all Mutations have been Dispatched

## Mocking Vuex's Commit Object

Based on the [official Vuex documentation](https://vuex.vuejs.org/en/testing.html) for testing actions, I created a file named _testUtils.js_ as testing helper.

```javascript
import { expect } from "chai";

export const testAction = (
  action,
  actionPayload,
  state,
  expectedMutations,
  done
) => {
  let count = 0;
  let commit = (type, payload) => {
    let mutation = expectedMutations[count];
    try {
      // check if commit function is invoked with expected args
      expect(mutation.type).to.equal(type);
      if (payload) {
        expect(mutation.payload).to.deep.equal(payload);
      }
      count++;
      // check if all mutations have been dispatched
      if (count >= expectedMutations.length) {
        done();
      }
    } catch (error) {
      done(error);
    }
  };

  // check if no mutations should have been dispatched
  if (expectedMutations.length === 0) {
    expect(count).to.equal(0);
    done();
  } else {
    // call the action with mocked store and arguments
    action({ commit, state }, actionPayload);
  }
};
```

## Testing Websocket Communication
