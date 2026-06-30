# Day 3 — Making Decisions (if / else)

So far your code runs top to bottom, doing every line. Today it learns to **choose**:
"IF this is true, do this; OTHERWISE, do that." This is where programming starts to feel powerful.

## What you'll learn today
1. **Comparisons** — asking true/false questions: `===`, `!==`, `>`, `<`, `>=`, `<=`.
2. **if / else if / else** — running different code depending on the answer.
3. Putting it together with `%` from Day 2 (the classic even/odd check).

---

## Step 1 — Open the playground
Open `index.html`, press `F12`, click **Console**. Same loop: edit → save → refresh → check.

---

## Step 2 — Concepts (read, then do)

### Comparisons produce booleans
Remember booleans (`true` / `false`) from Day 1? Comparisons are how you *generate* them.
Type these in and watch what prints:

```js
console.log(5 > 3);    // true
console.log(5 < 3);    // false
console.log(5 >= 5);   // true
console.log(4 === 4);  // true   ← "is exactly equal to?"
console.log(4 !== 9);  // true   ← "is NOT equal to?"
```

**Critical detail:** to check if two things are equal, use **three equals signs `===`**, not one.
- `=` (one) means **assign** ("put this value in the box") — that's what you've used to create variables.
- `===` (three) means **compare** ("are these equal?").

Mixing them up is the #1 beginner bug. You may also see `==` (two) in old code — avoid it; it does
weird type conversions. **Always use `===`.** Your C#/C++ brain will like that `===` is strict.

### if / else
An `if` runs its block **only when** the question inside `( )` is true:

```js
const temperature = 30;

if (temperature > 25) {
  console.log("It's hot. 🥵");
} else {
  console.log("It's not hot.");
}
```

Read it out loud: "IF temperature is greater than 25, print hot; OTHERWISE print not hot."
Note the shape: `if ( condition ) { ...code... }`. The `{ }` curly braces hold the code to run.

### else if — more than two options
```js
const score = 75;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 70) {
  console.log("Grade: B");
} else {
  console.log("Grade: C or lower");
}
```

JavaScript checks each condition top to bottom and runs the **first** one that's true,
then skips the rest.

---

## Step 3 — Your tasks
Open `script.js` and complete the TODOs, one at a time: save, refresh, check the Console.

When done:
1. Write your Day 3 entry in `../progress.md` (streak → **3**!).
2. Paste me your `script.js`, and explain in your own words the difference between `=` and `===`.
3. Tell me one thing that confused you.
