# JavaScript Concepts to Master before Learning React

React constitutes a library to create UI components that can be used as the basis of Web and mobile applications. What distinguishes React from some of its competitors is the fact that code is written entirely with JavaScript. Even the HTML-like templates are written in JavaScript using [JSX](https://facebook.github.io/jsx/), which is an extension of the JavaScript language to structure UI components.

The goal of this article is to help aspiring React developers get started. A complete introduction to JavaScript would go beyond the scope of this article. However, React builds on the use of modern JavaScript features that were mainly introduced with ES 2015. In the following, I give an overview of language features and common patterns that are heavily used in virtually every React application. For each concept, I provide external links. If you are interested, you can learn more about using it in the React context.


*TODO ESLint AST nutzen, um richtigen Begrifflichkeiten zu nutzen*

## Conditional Logic with If Statement, Ternary Operator, and Logical Operators

These operators are part of JavaScript for a very long time. In React they are especially useful for conditional rendering of components. 

The ternary operator looks like this:

```JavaScript
 const buttonLabel = playback === "stop" ? "play ▶️" : "stop ⏹️";
```

If the variable `playback` has the value `stop`, then the operator assigns to `buttonLabel` the string value `play ▶️` and in all other cases the string value `stop ⏹️`.

It is basically the same as the following code:
```JavaScript
let buttonLabel;
if (playback === "stop") {
  buttonLabel = "play ▶️";
}
else {
  buttonLabel = "stop ⏹️"
}
```

Of course, you can use such an `if/else` statement but the ternary operator is often the instrument of choice if you need to use a single line expression for [conditionally rendering elements inline](https://reactjs.org/docs/conditional-rendering.html#inline-if-else-with-conditional-operator). Otherwise, you have to call a [function where you put your code for conditional rendering](https://codepen.io/gaearon/pen/ZpVxNq?editors=0011). In React you can also use more complex condition logic (e.g., an [if-else cascade](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)) and [store values in variables that can be used for conditional rendering](https://codepen.io/gaearon/pen/QKzAgB?editors=0010) in the JSX code.

[Logical operators like && or ||](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators) are very handy for building React components. 

```JavaScript
const isLoggedIn = true;
const userComponent = isLoggedIn && getUserComponent();  
```

In our example, the left operand (`isLoggedIn`) of the `&&` operator evaluates to `true`. Therefore, the result of the right operand (the function call `getUserComponent()`) gets assigned to the `userComponent` variable.

This concept is also very useful for [conditional rendering in React](https://codepen.io/gaearon/pen/ozJddz?editors=0010) because `true && jsxComponent` returns `jsxComponent`, and `false && jsxComponent` returns `false`. If you return `false`, React ignores it and just renders nothing.

It is also possible to combine multiple conditions. In the next example, the result of `getOtherUsersComponent()` is returned when both conditions are met. 

```JavaScript
const otherUsers = isLoggedIn && users?.length > 0 && getOtherUsersComponent();
```

Notice the *?* in the second operand `users?.length > 0`. This is [optional chaining](), which is not uncommon in React projects. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining

If you return [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null), React does not render anything. In contrast to `undefined`, `null` represents the intentional absence of any value.

```JavaScript
if (shouldRenderComponent()) {
  return getComponent();
}
else {
  return null;
}
```

This is useful to [prevent components from rendering](https://codepen.io/gaearon/pen/Xjoqwm?editors=0010).

## equality / null etc. ???

## Object Literals and Inline Functions

There are [multiple ways to create objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer). Initializing objects with the literal notation looks like this:

```JavaScript
const foo = { bar: 3, hello: "world" };
```

This notation is frequently used in React projects to create objects inline without assigning it to a variable, e.g., for the [initial state of useReducer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer).

```JavaScript
// 2nd function argument uses inline object literal
foo("bar", { hello: "world" })
```

With ES2015 syntax, you can also use [shorthand property and method names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer).

```JavaScript
// instead of 
function foo(id) {
  return {
    name: "dummy",
    id: id,
    bar: function() {
      console.log("bar");
    }
  }
}

// you can do
function foo(id) {
  return {
    name: "dummy",
    id, // shorthand property name
    bar() { // shorthand method name
      console.log("bar");
    }
  }
}
```

Especially shorthand properties are used all over the place with React development since it saves redundant code.

You have to be aware of the subtle difference between an inline object literal and a variable pointing to an object (created by an object literal). In some cases for React performance optimization purposes, you should [avoid passing object literals](https://www.digitalocean.com/community/tutorials/react-keep-react-fast#avoid-object-literals) to React components because every time a new object is creating causing unnecessary re-renders.

The same principle applies to anonymous functions (i.e., inline functions) that [should be avoided in some React performance use cases](https://www.digitalocean.com/community/tutorials/react-keep-react-fast#avoid-anonymous-functions).

```JavaScript
// inline function
foo(() => {console.log("bar")});
// passing variable pointing to function
const barFunc = () => console.log("bar");
foo(barFunc);
```


## Switch Statement

In medium and large sized React applications, you get most likely confronted with the [switch statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) for managing state across components. In React world, techniques like the [useReducer hook](https://reactjs.org/docs/hooks-reference.html#usereducer) or [Redux](https://redux.js.org/) are used for such tasks.

The following example shows a [so-called reducer function](https://medium.com/async-la/a-short-and-sour-guide-to-reducers-b5b54d3bb018) using a switch statement for state management. You don't have to use switch statements with a reducer but it is a well-established pattern.

```JavaScript
export default (state, action) => {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return {
        ...state,
        darkMode: action.darkMode,
      };
     case "UPDATE_PLAYBACK": {
      return {
        ...state,
        currentSound: action.currentSound,
      };
    }  
    default:
      return state;
  }
};
```

The example above checks the value of `action.type` and executes the code of a `case` statement. If it evaluates to a string `TOGGLE_DARK_MODE`, then the code of the first case statement is executed. It is a good practice to have an optional default clause. It gets executed if the switch expression does not match any of the case clauses. Using the spread operator (e.g., _...state_) is a common practice.

In the above example, every case (and default) clause returns a new object representing the new React state. This brings us to an important topic of React development.

## TODO Spread Operator

## TODO Immutable vs Mutable

*TODO nochmal die mails checken bzgl. primitiven Datentypen*
*TODO object.freeze?*

This concept is important to understand. Immutable values and objects cannot be changed afterwards, so the original remains untouched.

```JavaScript
// immutable
```

```JavaScript
// mutable
```


Even the React team wants you to use immutable objects in multiple areas of your application design, e.g., with [component-based](https://reactjs.org/docs/state-and-lifecycle.html#using-state-correctly) and [global state](https://reactjs.org/docs/hooks-reference.html#usereducer). This is because immutability [leads typically to multiple architectural benefits](https://stackoverflow.com/a/34385684). One problem with mutable objects is that it can lead to unexpected side-effects, which is often the cause for unexpected bugs.


Objects are mutable by default but you can use [Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) or 3rd party libraries like [Immutable.js](https://immutable-js.github.io/immutable-js/) to make them immutable.

*paradigm, goal to create less error-prone applications, easier software design*

*TODO setState / mergeState*

*TODO primitive types*

In a real world scenario, your React state consists of objects and arrays (*which are also objects????*). And objects are mutable, which means, you can 

## Object Destructuring

The principle of [object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) is pretty simple. With the following elegant syntax, we can extract properties into variables.

```JavaScript
const creatures = {
  human: ["👨🏿‍💼", "👩🏼‍💼", "🧑🏻‍💼", "👩🏾‍💻", "🧑‍💻"],
  supernatural: ["👾", "🤖", "👽", "👹", "👺"]
};
const { human, supernatural } = creatures;
console.log(human); // ["👨🏿‍💼", "👩🏼‍💼", "🧑🏻‍💼", "👩🏾‍💻", "🧑‍💻"]
console.log(supernatural); // ["👾", "🤖", "👽", "👹", "👺"]
```

If you use assignment without variable declaration, you need to use parentheses.

```JavaScript
const creatures = {
  human: ["👨🏿‍💼", "👩🏼‍💼", "🧑🏻‍💼", "👩🏾‍💻", "🧑‍💻"],
  supernatural: ["👾", "🤖", "👽", "👹", "👺"]
};
let human, supernatural;
({human, supernatural} = creatures);
console.log(human); // ["👨🏿‍💼", "👩🏼‍💼", "🧑🏻‍💼", "👩🏾‍💻", "🧑‍💻"]
console.log(supernatural); // ["👾", "🤖", "👽", "👹", "👺"]
```

Object destructuring offers you syntactical sugar to save extra lines of code.
```JavaScript
// you can do this
const { human, supernatural } = creatures;
// instead of
const human = creatures.human;
const supernatural = creatures.supernatural;
```

In React context, object destructuring is frequently used with function parameters.

```JavaScript
const infos = {name: "doppelmutzi", hobby: "React" };

function printInfos({name, hobby}) {
  console.log(name, hobby);
}
printInfos(infos);

const printName = ({name}) => console.log(name);
printName(infos);
```

To have cleaner code, React developers use this pattern with [props](https://reactjs.org/docs/components-and-props.html), which are the input for React components.

```JavaScript
function MyReactComponent({name, age}) {
  // ...
}
```

Assigning in combination with renaming variables might be useful to increase understandability of your code.

```JavaScript
const creatures = {
  human: ["👨🏿‍💼", "👩🏼‍💼", "🧑🏻‍💼"]
};
const { human: people  } = creatures;
console.log(people); // ["👨🏿‍💼", "👩🏼‍💼", "🧑🏻‍💼"]
```

You can also define default values while unpacking fields from the assigned object. The following example combines multiple techniques.

```JavaScript
const { human: people = ["👨🏿‍💼"], supernatural = ["👾", "👽"] } = {
  human: ["👨🏿‍💼", "👩🏼‍💼", "🧑🏻‍💼"]
};
console.log(people); // ["👨🏿‍💼", "👩🏼‍💼", "🧑🏻‍💼"]
console.log(supernatural); // ["👾", "👽"]
```

Nesting is also possible, but I wouldn't recommend overdoing it, otherwise understandability decreases.

```JavaScript
const creatures = {
  animals: {
    wildlife: ["🦂", "🐍"],
    pet: ["🐕", "🐈"]
  },
  human: ["👨🏿‍💼", "👩🏼‍💼", "🧑🏻‍💼"]
};
const { animals: { pet }} = creatures;
console.log(pet); //  ["🐕", "🐈"]
```

Ronald Chen provides some [more insights](https://medium.com/@pyrolistical/destructuring-nested-objects-9dabdd01a3b8) on destructuring nested objects. 

Using the rest operator with object destructuring is also common in React development.

```JavaScript
  function renderProduct({id, name, ...styles}) { 
    console.log(id, name, styles); // 0815, chocolate, { backgroundColor: "red", color: "white"}
  }

  const product = {
    id: "0815", name: "chocolate", backgroundColor: "red", color: "white"
  }
  renderProduct(product);
```


## Array Destructuring

With the help of the [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), an array can be unpacked in a way that its values are extracted into distinct variables like this:

```JavaScript
const array = [1, 2];
const [varForVal1, varForVal2] = array;
console.log(varForVal1); // 1
console.log(varForVal2); // 2
```

As you can see, variables are assigned from left to right of the array, so order is maintained.

```JavaScript
const [fruit, veggie] = ["🍓", "🥦", "🍕", "🌮", "🥪", "🍔"];
console.log(fruit); // 🍓
console.log(veggie); // 🥦
```

You can also skip values under consideration of the order.

```JavaScript
const [fruit,,pizza,,,burger] = ["🍓", "🥦", "🍕", "🌮", "🥪", "🍔"];
console.log(fruit); // 🍓
console.log(pizza); // 🍕
console.log(burger); // 🍔
```

The following "chatty code" might help to understand what exactly happend.

```JavaScript
const [
  fruit,
  /* skip entry 2 (🥦) */,
  pizza,
  /* skip entry 4 (🌮) */,
  /* skip entry 5 (🥪) */,
  burger] = ["🍓", "🥦", "🍕", "🌮", "🥪", "🍔"];
```

You can also assign multiple values at once with the rest pattern.

```JavaScript
const [fruit, veggie, ...junkfood] = ["🍓", "🥦", "🍕", "🌮", "🥪", "🍔"];
console.log(fruit); // 🍓
console.log(veggie); // 🥦
console.log(junkfood); // ["🍕", "🌮", "🥪", "🍔"]
```

Array destructuring allows for default values. Of course, you can combine this pattern with function calls, too.

```JavaScript
const getFood = () => ["🍓", "🥦"];
const [fruit, veggie, junkfood = "🍕"] = getFood();
console.log(fruit); // 🍓
console.log(veggie); // 🥦
console.log(junkfood); // 🍕
```

The elegant concept of array destructuring is used frequently with [React hooks](https://reactjs.org/docs/hooks-overview.html) because you can come up with a few lines of semantic code. To create a state variable along with an updater function for a React component, you can use [React's useState hook](https://reactjs.org/docs/hooks-reference.html#usestate).

```JavaScript
const initialValue = false;
// instead of 
const stateWithUpdater = useState(initialValue);
const darkMode = stateWithUpdater[0];
const darkModeUpdater = stateWithUpdater[1];
// you can do
const [darkMode, setDarkMode] = useState(initialValue);
```


The following example demonstrates that you can implement generic functions that can be used for concrete use cases. Array destructuring allows the caller of the function to use semantic variable names.

```JavaScript
const getFood = type => {
  let food = [];
  let error = false;
  if (type === "fruits") {
    food = ["🍓", "🥝", "🍌"];
  }
  else if (type === "junk") {
    food = ["🍕", "🌮", "🥪"];
  }
  else {
    error = true;
  }
  const addFood = newFood => food.push(newFood);
  return [food, error, addFood];
};

const [healthyFood, noFruitsAvailable, addFruitFunc] = getFood("fruits");
console.log(healthyFood); // ["🍓", "🥝", "🍌"]
console.log(noFruitsAvailable); // false
console.log(addFruitFunc("🍒")); 
console.log(healthyFood); // ["🍓", "🥝", "🍌", "🍒"]
```

For this use case, in my opinion returning an array by _getFood_ function leads to more concise code as with object destructuring. Array destructuring allows for custom variable names. In contrast, with object destructuring you need to rename the variables.

```JavaScript
const getFood = type => {
  // same function body as above, only different return statement
  return {food, error, addFood};
};

const {food: healthyFood, error: noFruitsAvailable, addFood: addFruitFunc} = getFood("fruits");
console.log(noFruitsAvailable); // false
console.log(addFruitFunc("🍒")); 
console.log(healthyFood); // ["🍓", "🥝", "🍌", "🍒"]
```

That's probably why _useState_ returns an array and not an object to be more generic.


