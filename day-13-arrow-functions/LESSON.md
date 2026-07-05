# Lesson 13 — Arrow Functions (modern shorthand)

You've been writing functions like this:

```js
function add(a, b) {
  return a + b;
}
```

Modern JavaScript has a shorter syntax called **arrow functions**. You'll see them everywhere —
especially inside `.forEach()`, `.map()`, `.filter()`, and `.addEventListener()`.

## What you'll learn today
1. Arrow function syntax: `() => {}`
2. One-line implicit return (no `{` or `return` needed).
3. Refactoring your existing callbacks to use arrows.

---

## Step 1 — Open the playground
Open `index.html`, press `F12` if you want the Console. Save → refresh.

---

## Step 2 — Concepts (read, then do)

### Basic conversion
```js
// Old way
function double(n) {
  return n * 2;
}

// Arrow way
const double = (n) => {
  return n * 2;
};
```

Read `(n) =>` as "takes n, then does..."

### One parameter — parentheses optional
```js
const double = n => n * 2;   // same thing, shorter
```

### One-line implicit return
If the body is **one expression**, skip `{ }` and `return` — the result is returned automatically:

```js
const add = (a, b) => a + b;
const isEven = n => n % 2 === 0;
```

### Multiple lines — need braces and explicit return
```js
const greet = name => {
  const message = `Hello, ${name}!`;
  return message;
};
```

### No parameters
```js
const sayHi = () => console.log("Hi!");
```

### In callbacks (where you'll use them most)
```js
// Before
numbers.forEach(function (n) {
  console.log(n);
});

// After
numbers.forEach(n => console.log(n));

// Before
const evens = numbers.filter(function (n) {
  return n % 2 === 0;
});

// After
const evens = numbers.filter(n => n % 2 === 0);
```

**Rule of thumb:** arrow functions are great for short callbacks. For now, use them inside
`.forEach()`, `.map()`, `.filter()`, and `.addEventListener()`. You'll see them constantly
in real codebases and React.

---

## Step 3 — Your tasks
Open `script.js`. Each TODO asks you to rewrite code using arrow functions.

When done:
1. Write your Lesson 13 entry in `../progress.md`.
2. Explain in your own words: when can you skip `{` and `return` in an arrow function?
3. Tell me one thing that confused you.
