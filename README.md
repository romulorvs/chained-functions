# Chained Functions

*Run functions sequentially. Pass the return from one to another.*

![npm](https://img.shields.io/npm/dt/chained-functions.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/chained-functions)

## Usage
Import **chain** and call it passing the functions as parameters.
```js
import { chain } from 'chained-functions';

/**
 * defining the functions
 */
function set3() { // Setting the start value of the chain
    return 3;
}

function sum10(curr) { // Getting the return of the previous function
    return curr + 10; // 3 + 10
}

function minus5(curr) { // Getting the return of the previous function
    return curr - 5; // 13 - 5
}

/**
 * chaining them and displaying the result
 */
const result = chain(set3, sum10, minus5)
console.log(result) // 8
```

------------

## Chaining Async Functions

You can use **chainAsync** when dealing with async functions.

```js
import { chainAsync } from 'chained-functions';

/**
 * defining the functions
 */
async function fetchFromDB() {
    ... // fetching data
    return dataResponse;
}

function formatResponse(curr) {
    return { message: curr }
}

/**
 * chaining them and displaying the result
 */
(async () => {
    const result = await chainAsync(fetchFromDB, formatResponse)
    console.log(result) // { message: dataResponse }
})()
```

------------

## Breaking the Chain and Inserting Values

When you need to break the chain at a certain step or insert a value at the beginning of the chain, use the **breakChain** and **addLink** functions.

```js
import { chain, addLink, breakChain } from 'chained-functions';

const result = chain(
  addLink(40), // Adding value 40 to the start of the chain
  (curr) => {
    if(curr > 30){
      return breakChain("over 30") // Breaks the chain and returns "over 30"
    }
    return curr
  },
  (curr) => curr + 50 // This step will not be executed
)

console.log(result) // over 30
```
**Tip:** To break the chain and return the current value of the step, just return the **breakChain** function (without calling it).

------------

## Typing the returned value

When using Typescript, you can set the return type as a **Generic** of the **chain/asyncChain** function.

```ts
import { chain } from 'chained-functions';

// Typing the return as "number"
const result = chain<number>(firstFn, secondFn, lastFn)

// To get the precise type, use ReturnType<> with last function
const result = chain<ReturnType<typeof lastFn>>(firstFn, secondFn, lastFn)
```

------------

## Installation
1. Install it using npm or yarn
    - ``npm install --save chained-functions``
    - ``yarn add chained-functions``
2. Import it
    - ``import {chain} from 'chained-functions'``
3. Use it 😄