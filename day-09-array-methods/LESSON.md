# Lesson 9 — Array Methods (the modern way)

In Lesson 7 you wrote manual `for` loops to loop, filter, and add things up.
In real JavaScript code, developers usually reach for **array methods** instead:
`.forEach()`, `.map()`, `.filter()`, and `.reduce()`.

They do the same jobs, but in a cleaner, more professional style.

## What you'll learn today
1. `.forEach()` — do something with each item.
2. `.map()` — transform each item into something new (returns a **new array**).
3. `.filter()` — keep only items that pass a test (returns a **new array**).
4. `.reduce()` — combine all items into one final value.

---

## Step 1 — Open the playground
Open `index.html`, press `F12`, click **Console**. Edit → save → refresh → check.

---

## Step 2 — Concepts (read, then do)

### Callbacks — a quick idea first
Every array method takes a **callback function** — a function you pass in,
and the array method calls it for each item.

```js
const numbers = [1, 2, 3];

numbers.forEach(function (num) {
  console.log(num);
});
```

Read it: "for each number, run this function." The function receives the current item
as its parameter. You'll see this pattern everywhere.

### forEach — do something with each item
```js
const hobbies = ["gym", "books", "skateboarding"];

hobbies.forEach(function (hobby) {
  console.log(`I like ${hobby}`);
});
```
Like a loop, but you don't manage the index yourself. `forEach` does not return a useful value —
use it when you just want side effects (like printing).

### map — transform each item into a new array
```js
const numbers = [1, 2, 3, 4];

const doubled = numbers.map(function (num) {
  return num * 2;
});

console.log(doubled); // [2, 4, 6, 8]
console.log(numbers); // [1, 2, 3, 4]  <- original is unchanged
```
**Important:** `.map()` always returns a **new array**. It does not change the original.

### filter — keep only items that pass a test
```js
const ages = [12, 18, 25, 16, 30];

const adults = ages.filter(function (age) {
  return age >= 18;
});

console.log(adults); // [18, 25, 30]
```
The callback must return `true` (keep it) or `false` (skip it).

### reduce — combine everything into one value
```js
const numbers = [4, 8, 15, 16, 23, 42];

const total = numbers.reduce(function (sum, num) {
  return sum + num;
}, 0);

console.log(total); // 108
```
`.reduce()` walks through the array and builds up one final result.
The second argument (`0` here) is the **starting value**.

Read it: "Start at 0. For each number, add it to the running total and return the new total."

---

## Step 3 — Your tasks
Open `script.js` and complete the TODOs. Save → refresh → check after each.

When done:
1. Write your Lesson 9 entry in `../progress.md` (Streak day 3 or 4 — whichever calendar day it is for you).
2. Explain in your own words: what's the difference between `.map()` and `.filter()`?
3. Tell me one thing that confused you.
