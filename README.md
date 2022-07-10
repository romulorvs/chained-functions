# Chained Functions

*Run functions sequentially. Pass the return from one to another.*

![npm](https://img.shields.io/npm/dt/chained-functions.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/chained-functions)

## Usage
Import **chain** and call it passing the functions as parameters.
```js
import { chain } from 'chained-functions';

function set3() {
    return 3;
}

function sum10(curr) {
    return curr + 10;
}

function minus5(curr) {
    return curr - 5;
}

const result = chain(set3, sum10, minus5)
console.log(result) // 8
```

------------

## Chaining Async Functions

You can use **chainAsync** when dealing with async functions.

```js
import { chainAsync } from 'chained-functions';

async function fetchFromDB() {
    ... // fetching data
    return dataResponse;
}

function formatResponse(curr) {
    return { message: curr }
}

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
  addLink(40),
  (curr) => breakChain("res: " + curr),
  (curr) => curr + 50 // This step will not be executed
)

console.log(result) // res: 40
```

To break the chain and return only the current value, return the **breakChain** function itself (without calling it).

```js
import { chain, addLink, breakChain } from 'chained-functions';

const result = chain(
  addLink(40),
  () => breakChain,
  (curr) => curr + 50 // This step will not be executed
)

console.log(result) // 40
```

------------

## Typing the returned value

When using Typescript, you can set the return type as a **Generic** of the **chain/asyncChain** function.

```ts
import { chain } from 'chained-functions';

const result = chain<number>(firstFn, secondFn, lastFn)
```

To get the precise type, use **ReturnType<>** with the last function.

```ts
import { chain } from 'chained-functions';

const result = chain<ReturnType<typeof lastFn>>(firstFn, secondFn, lastFn)
```

------------

## Installation
1. Install it using npm or yarn
    - ``npm i chained-functions``
    - ``yarn add chained-functions``
2. Import it
    - ``import {chain} from 'chained-functions'``
3. Use it 😄