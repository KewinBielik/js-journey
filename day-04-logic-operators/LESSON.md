# Day 4 — Combining Conditions (&&, ||, !)

Day 3 taught your code to ask ONE question at a time. Today it asks *combined* questions:
"is this true AND that true?", "is this true OR that true?", "is this NOT true?"

## What you'll learn today
1. `&&` (AND) — true only when **both** sides are true.
2. `||` (OR) — true when **at least one** side is true.
3. `!` (NOT) — flips a boolean: `!true` is `false`.
4. Using them inside `if` statements to make smarter decisions.

> Style note: write your braces in JavaScript house style from now on:
> `if (x) {` ... `} else {` ... `}` (opening brace on the same line, `} else {` together).

---

## Step 1 — Open the playground
Open `index.html`, press `F12`, click **Console**. Edit → save → refresh → check.

---

## Step 2 — Concepts (read, then do)

### && (AND) — both must be true
```js
const age = 20;
const hasTicket = true;

if (age >= 18 && hasTicket) {
  console.log("You may enter.");
}
```
Read it: "if age is 18+ AND they have a ticket." If *either* part is false, the whole
thing is false and the block is skipped.

A quick mental model:
```js
console.log(true  && true);  // true
console.log(true  && false); // false
console.log(false && true);  // false
```

### || (OR) — at least one must be true
```js
const isWeekend = false;
const isHoliday = true;

if (isWeekend || isHoliday) {
  console.log("No work today! 🎉");
}
```
"if it's the weekend OR a holiday." Only **one** side needs to be true.
```js
console.log(true  || false); // true
console.log(false || false); // false
```

### ! (NOT) — flips it
```js
const isLoggedIn = false;

if (!isLoggedIn) {
  console.log("Please log in.");
}
```
`!isLoggedIn` means "NOT logged in." `!` turns `true` into `false` and `false` into `true`.

---

## Step 3 — Your tasks
Open `script.js` and complete the TODOs. Use JS-style braces. Save → refresh → check after each.

When done:
1. Write your Day 4 entry in `../progress.md` (streak → **4**!).
2. Paste me your `script.js`, and explain in your own words the difference between `&&` and `||`.
3. Tell me one thing that confused you.
