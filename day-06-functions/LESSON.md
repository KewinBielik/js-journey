# Lesson 6 — Functions (reusable blocks of code)

This is the big one. A **function** is a named, reusable block of code. You define it once,
then *call* it whenever you want — with different inputs each time. Functions are how every
real program is organized. Master these and you stop writing scripts and start building tools.

## What you'll learn today
1. How to **define** a function and **call** it.
2. **Parameters** (inputs) and **arguments** (the actual values you pass in).
3. **`return`** — sending a value back out — and how it differs from `console.log`.

---

## Step 1 — Open the playground
Open `index.html`, press `F12`, click **Console**. Edit → save → refresh → check.

---

## Step 2 — Concepts (read, then do)

### Defining and calling a function
```js
function sayHello() {
  console.log("Hello!");
}

sayHello();  // <- this CALLS (runs) the function. Prints "Hello!"
sayHello();  // call it again — reuse! Prints "Hello!" again
```
Defining a function does NOT run it. It just teaches JavaScript the recipe.
It only runs when you **call** it with `sayHello()` (note the parentheses).

### Parameters — giving the function inputs
```js
function greet(name) {          // `name` is a PARAMETER (a placeholder)
  console.log(`Hello, ${name}!`);
}

greet("Kewin");   // "Kewin" is an ARGUMENT (the real value). Prints "Hello, Kewin!"
greet("Ada");     // Prints "Hello, Ada!"
```
The function is written once but works for any input. That's the whole point.

### return — sending a value back
This is the part beginners must get right. `console.log` just *displays* something.
`return` *hands a value back* to whoever called the function, so you can use it further.

```js
function add(a, b) {
  return a + b;   // hand the result back
}

const sum = add(3, 4);   // sum is now 7
console.log(sum);        // 7
console.log(add(10, 5)); // 15  (you can log the returned value directly)
```

Key difference:
- `console.log(x)` → shows `x` on screen, gives nothing back.
- `return x` → gives `x` back to the caller (nothing shows on screen unless you log it).

Once a function hits `return`, it stops immediately — nothing after `return` runs.

---

## Step 3 — Your tasks
Open `script.js` and complete the TODOs. For tasks that say "return", use `return` (not console.log)
inside the function, then `console.log` the result when you CALL it.

When done:
1. Write your Lesson 6 entry in `../progress.md` (Streak day 2).
2. Explain in your own words: what's the difference between `return` and `console.log`?
3. Tell me one thing that confused you.
