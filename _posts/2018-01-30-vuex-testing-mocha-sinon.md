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

## Skeleton for Testing Actions and Websocket Communication

```javascript
// actions.spec.js
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

## Mocking Vuex's Commit Object

Based on the [official Vuex documentation](https://vuex.vuejs.org/en/testing.html) for testing actions, I created a file named _testUtils.js_ as testing helper. We utilize the _testAction_ function in our tests in order to verify that the action under test invokes the correct mutations with the correct arguments.

```javascript
// testUtils.js
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

Let's break the code in the above snippet down a bit. First the function arguments.

```javascript
export const testAction = (
  action,
  actionPayload,
  state,
  expectedMutations,
  done
) => {
  // ...
};
```

* **action** refers to the function name of the action that needs to be called in the context of the test
* **actionPayload** constitutes the payload that is passed as argument to the action under test. We pass _null_ if the action does not accept a payload.
* **state** represents the _Vuex state object_ that is required by the action under test. The object only needs to define the properties needed by the action. It can also be _null_ if the action does not operate on the state.
* **expectedMutations** is an array that hold one or more objects that hold the arguments for the invocation of the _commit_ function. The following shows an example

```Javascript
const expectedMutations = [
  {
    type: mutationTypes.TOGGLE_SHOW_DONE_TASKS
  },
  {
    type: mutationTypes.ADD_ITEM,
    payload: {
      done: true,
      description: "dummy"
    }
  }
];
```

* **done** is a callback that we need to invoke inside our helper function when the test is complete. This is because _Vuex_ actions are asynchronous. You can read more about this concept in the [Mocha documentation on how to test asynchronous code](https://mochajs.org/#asynchronous-code).

## Implementing Action Tests

### Testing Use Case 1: Checking of Correct Commit Invocation

To get our feet wet, let's start with a simple example. Consider the following action _toggleShowDoneTasks_ inside _actions.js_.

```Javascript
// actions.js
import Vue from "vue";
import * as mutationTypes from "./mutation-types";

export default {
  toggleShowDoneTasks({ commit }) {
    commit(mutationTypes.TOGGLE_SHOW_DONE_TASKS);
  }
};
```

For the sake of clarity, we skip the actual mutations and, instead, consider them as black boxes. We just want to test actions, i.e., we want to verify whether mutations are invoked correctly with the correct arguments. In the above action, we just invoke _commit_ with a mutation type without any payload.

Let's take a look at the test for this action. We leverage our _testAction_ function from above.

```Javascript
// actions.spec.js
it("toggleShowDoneTasks should invoke correct mutation", done => {
    const payload = null;
    const state = null;
    const expectedMutations = [
      {
        type: mutationTypes.TOGGLE_SHOW_DONE_TASKS
      }
    ];
    testAction(
      actions.toggleShowDoneTasks,
      payload,
      state,
      expectedMutations,
      done
    );
  });
```

* Check if all Mutations have been Dispatched
* Implementierung auch anzeigen

### Testing axios

* success case
* failure case

## Testing Websocket Communication

* klären ob es Teil dieses Vortrags sein sollte
