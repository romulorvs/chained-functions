# Chained Functions

*Chain functions in a sequence. Pass the return from one to another*

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

function sum10(curr) { // The return of the previous function will be passed as argument for the current one
    return curr + 10; // 3 + 10
}

function minus5(curr) {
    return curr - 5; // 13 - 5
}

/**
 * chaining them and getting the result
 */
const result = chain(set3, sum10, minus5)
console.log(result) // 8
```

------------

## Using Async Functions

You can use **chainAsync** if some of the functions are **async**.

```js
import { chainAsync } from 'chained-functions';

/**
 * defining the functions
 */
async function fetchFromDB() {
    /**
     * Fetching data from the database usually takes sometime,
     * so you'll usually have to run it as an async function.
     */
    ...
    return dataResponse; // Returning data after being fetched
}

function formatResponse(curr) {
    return { message: curr }
}

/**
 * chaining them and getting the result
 */
(async () => {
    const result = await chainAsync(fetchFromDB, formatResponse) // chainAsync returns a Promise with the result.
})()
```

------------

## Inserting Values and Breaking the Chain conditionally

If you need to insert a value at the beginning of the chain or break it conditionally, you can use the **addLink** and **breakChain** functions.

```js
import { chain, addLink, breakChain } from 'chained-functions';

const result = await chain(
    addLink("Jennifer"), // Adding value "Jennifer" to the start of the chain
    (curr) => curr + " Love",
    (curr) => {
        if(curr === "Jennifer Love"){
            return breakChain(curr) // Breaking the chain at this "link" and returning "Jennifer Love"
        } else {
            return curr
        }
    },
    (curr) => curr + " Hewitt" // this "link" will not be executed
)

console.log(result) // Jennifer Love
```
**PS:** If you just want to break the chain and return the current value, you can just return the **breakChain** function as a value (without calling it).

------------

## Typing the Return Value

If you're using Typescript, you can set the return type as a **Generic** of the **chain/asyncChain** function.

```ts
import { chain } from 'chained-functions';

// typing the return as "number"
const result = chain<number>(firstFn, secondFn, lastFn)

// If you need the precise type, set it as the return type of the last function.
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