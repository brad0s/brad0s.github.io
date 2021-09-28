---
title: "ES6 cheat sheet"
date: "2021-09-28"
description: "Take a peek at my ES6 syntax cheat sheet."
published: true
tags: ["javascript", "es6"]
---

## Table of Contents <!-- omit in toc -->

- [Variables and constant feature comparison](#variables-and-constant-feature-comparison)
- [Variable declaration](#variable-declaration)
  - [`let` scope](#let-scope)
- [Constant declaration](#constant-declaration)
- [Arrow Functions](#arrow-functions)
- [Template Literals](#template-literals)
  - [**Concatenation/string interpolation**](#concatenationstring-interpolation)
  - [**Multi-line strings**](#multi-line-strings)
- [Implicit returns](#implicit-returns)
- [Key/property shorthand](#keyproperty-shorthand)
- [Method definition shorthand](#method-definition-shorthand)
- [Object Destructuring](#object-destructuring)
  - [Destructuring nested objects](#destructuring-nested-objects)
- [Array destructuring](#array-destructuring)
- [Array iteration (looping)](#array-iteration-looping)
- [Default parameters](#default-parameters)
- [Spread syntax](#spread-syntax)
- [String includes()](#string-includes)
- [String startsWith()](#string-startswith)
- [String repeat()](#string-repeat)
- [Object.assign()](#objectassign)
- [Object.entries()](#objectentries)
- [Exponent Operator](#exponent-operator)
- [Promises/Callbacks](#promisescallbacks)
  - [Promises with finally](#promises-with-finally)

---

<br />

## Variables and constant feature comparison

| keyword | scope          | hoisting | can be reassigned | can be redeclared |
| ------- | -------------- | -------- | ----------------- | ----------------- |
| `var`   | function scope | yes      | yes               | yes               |
| `let`   | block scope    | no       | yes               | no                |
| `const` | block scope    | no       | no                | no                |

---

<br />

## Variable declaration

| es5 |
| --- |

```javascript
var x = 0
```

| es6 |
| --- |

```javascript
let x = 0
```

### `let` scope

| es6 |
| --- |

```javascript
let a = 3

if (true) {
  let a = 5
  console.log(a) // prints 5
}

console.log(a) // prints 3
```

---

<br />

## Constant declaration

| es6 |
| --- |

```javascript
const CONST_IDENTIFIER = 0 // constants are uppercase by convention
```

```javascript
// can be assigned only once:
const a = 55

a = 44 // throws an error
```

---

<br />

## Arrow Functions

The arrow function expression syntax is a shorter way of creating a function expression. Arrow functions do not have their own `this`, do not have prototypes, cannot be used for constructors, and should not be used as object methods.
|es5|
|---|

```javascript
function func(a, b, c) {} // function declaration
var func = function (a, b, c) {} // function expression
```

| es6 |
| --- |

```javascript
let func = a => {} // parentheses optional with one parameter
let func = (a, b, c) => {} // parentheses required with multiple parameters
```

---

<br />

## Template Literals

### **Concatenation/string interpolation**

Expressions can be embedded in template literal strings.
|es5|
|---|

```javascript
var str = "Release date: " + date
```

| es6 |
| --- |

```javascript
let str = `Release Date: ${date}`
```

### **Multi-line strings**

Using template literal string syntax, a javascript string can span multiple lines without the need for concatenation.
|es5|
|---|

```javascript
var str = "This text " + "is on " + "multiple lines"
```

| es6 |
| --- |

```javascript
let str = `This text
            is on
            multiple lines`
```

---

<br />

## Implicit returns

The `return` keyword is implied and can be omitted if using arrow functions without a block body.
|es5|
|---|

```javascript
function func(a, b, c) {
  return a + b + c
}
```

| es6 |
| --- |

```javascript
let func = (a, b, c) => a + b + c // curly brackets must be omitted
```

---

<br />

## Key/property shorthand

ES6 introduces a shorter notation for assigning properties to variables of the same name.

```javascript
const a = 2
const b = 5
```

| es5 |
| --- |

```javascript
var obj = {
  a: a,
  b: b,
}
```

| es6 |
| --- |

```javascript
let obj = {
  a,
  b,
}
```

---

<br />

## Method definition shorthand

The `function` keyword can be omitted when assigning methods on an object.
|es5|
|---|

```javascript
var obj = {
  a: 5,
  b: function () {
    console.log("b")
  },
}
```

| es6 |
| --- |

```javascript
let obj = {
  a: 5,
  b() {
    console.log("b")
  },
}
```

```javascript
obj.b() // prints 'b'
```

---

<br />

## Object Destructuring

Use curly brackets to assign properties of an object to their own variable.

```javascript
var obj = { a: 1, b: 2, c: 3 }
```

| es5 |
| --- |

```javascript
var a = obj.a
var b = obj.b
var c = obj.c
```

| es6 |
| --- |

```javascript
let { a, b, c } = obj
```

### Destructuring nested objects

| es6 |
| --- |

```javascript
const Person = {
  name: "John Snow",
  age: 29,
  sex: "male",
  materialStatus: "single",
  address: {
    country: "Westeros",
    state: "The Crownlands",
    city: "Kings Landing",
    pinCode: "500014",
  },
}

const {
  address: { state, pinCode },
  name,
} = Person

console.log(name, state, pinCode) // John Snow The Crownlands 500014
console.log(city) // ReferenceError
```

---

<br />

## Array destructuring

| es6 |
| --- |

```javascript
let [a, b] = [3, 7]

console.log(a) // 3
console.log(b) // 7
```

---

<br />

## Array iteration (looping)

A more concise syntax has been introduced for iteration through arrays and other iterable objects.

```javascript
var arr = ["a", "b", "c"]
```

| es5 |
| --- |

```javascript
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i])
}
```

| es6 |
| --- |

```javascript
for (let i of arr) {
  console.log(i)
}
```

---

<br />

## Default parameters

Functions can be initialized with default parameters, which willbe used only if an argument is not invoked through the function.
|es5|
|---|

```javascript
var func = function (a, b) {
  b = b === undefined ? 2 : b
  return a + b
}
```

| es6 |
| --- |

```javascript
let func = (a, b = 2) => {
  return a + b
}
```

```javascript
func(10) // returns 12
func(10, 5) // returns 15
```

---

<br />

## Spread syntax

Spread syntax can be used to expand an array
|es6|
|---|

```javascript
let arr1 = [1, 2, 3]
let arr2 = ["a", "b", "c"]
let arr3 = [...arr1, ...arr2]

console.log(arr3) // [1, 2, 3, "a", "b", "c"]
```

Spread syntax can be used for function arguments.
|es6|
|---|

```javascript
let arr1 = [1, 2, 3]
let func = (a, b, c) => a + b + c

console.log(func(...arr1)) // 6
```

| es6 |
| --- |

```javascript
const a = {
  firstName: "Barry",
  lastName: "Manilow",
}

const b = {
  ...a,
  lastName: "White",
  canSing: true,
}

console.log(a) // {firstName: "Barry", lastName: "Manilow"}

console.log(b) // {firstName: "Barry", lastName: "White", canSing: true}

// great for modifying objects without side effects/affecting the original
```

---

<br />

## String includes()

| es6 |
| --- |

```javascript
console.log("apple".includes("pl")) // prints true
console.log("apple".includes("tt")) // prints false
```

---

<br />

## String startsWith()

| es6 |
| --- |

```javascript
console.log("apple".startsWith("ap")) // prints true
console.log("apple".startsWith("bb")) // prints false
```

---

<br />

## String repeat()

| es6 |
| --- |

```javascript
console.log("ab".repeat(3)) // prints "ababab"
```

---

<br />

## Object.assign()

| es6 |
| --- |

```javascript
const obj1 = { a: 1 }
const obj2 = { b: 2 }

const obj3 = Object.assign({}, obj1, obj2)

console.log(obj3) // { a: 1, b: 2 }
```

---

<br />

## Object.entries()

| es6 |
| --- |

```javascript
const obj = {
  firstName: "Vipul",
  lastName: "Rawat",
  age: 22,
  country: "India",
}

const entries = Object.entries(obj)
/* returns an array of [key, value] 
   pairs of the object passed
*/

console.log(entries)
/* prints
   [
     ['firstName', 'Vipul'], 
     ['lastName', 'Rawat'], 
     ['age', 22], 
     ['country', 'India']
   ];
*/
```

---

<br />

## Exponent Operator

| es6 |
| --- |

```javascript
const byte = 2 ** 8

// Same as: Math.pow(2, 8)
```

---

<br />

## Promises/Callbacks

Promises represent the completion of an asynchronous function. They can be used as an alternative to chaining functions.
|es5 callback|
|---|

```javascript
function doSecond() {
  console.log("Do second.")
}

function doFirst(callback) {
  setTimeout(function () {
    console.log("Do first.")

    callback()
  }, 500)
}

doFirst(doSecond)
```

| es6 promise |
| ----------- |

```javascript
let doSecond = () => {
  console.log("Do second.")
}

let doFirst = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Do first.")

    resolve()
  }, 500)
})

doFirst.then(doSecond)
```

An example below using `XMLHttpRequest`, for demonstrative purposes only (`Fetch API` would be the proper modern API to use).
|es5 callback|
|---|

```javascript
function makeRequest(method, url, callback) {
  var request = new XMLHttpRequest()

  request.open(method, url)
  request.onload = function () {
    callback(null, request.response)
  }
  request.onerror = function () {
    callback(request.response)
  }
  request.send()
}

makeRequest("GET", "https://url.json", function (err, data) {
  if (err) {
    throw new Error(err)
  } else {
    console.log(data)
  }
})
```

| es6 promise |
| ----------- |

```javascript
function makeRequest(method, url) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest()

    request.open(method, url)
    request.onload = resolve
    request.onerror = reject
    request.send()
  })
}

makeRequest("GET", "https://url.json")
  .then(event => {
    console.log(event.target.response)
  })
  .catch(err => {
    throw new Error(err)
  })
```

### Promises with finally

| es6 |
| --- |

```javascript
promise
  .then((result) => { ··· })
  .catch((error) => { ··· })
  .finally(() => { // logic independent of success/error })

// The handler is called when the promise is fulfilled or rejected.
```
