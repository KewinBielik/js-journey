# Lesson 5 — Loops (doing things many times)

Until now, one line of code = one action. To print something 100 times you'd write 100 lines.
**Loops** let you say "repeat this" — and suddenly the computer does the boring work for you.
This is one of the most powerful ideas in all of programming.

## What you'll learn today
1. The **`for` loop** — repeat a set number of times.
2. What the three parts of a `for` loop actually do.
3. The **`while` loop** — repeat *until* a condition changes.
4. Combining loops with `if` / `%` from earlier lessons.

---

## Step 1 — Open the playground
Open `index.html`, press `F12`, click **Console**. Edit → save → refresh → check.

---

## Step 2 — Concepts (read, then do)

### The for loop
```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
// prints: 1 2 3 4 5
```

That `for (...)` has **three parts**, separated by semicolons:
1. **`let i = 1`** — the START. Create a counter, begin at 1. (Runs once, at the very beginning.)
2. **`i <= 5`** — the CONDITION. Keep looping *while* this is true. (Checked before each round.)
3. **`i++`** — the STEP. After each round, do this. `i++` is shorthand for `i = i + 1` (add 1).

Read it out loud: "Start i at 1. While i is 5 or less, run the block, then add 1 to i."
When `i` becomes 6, the condition `6 <= 5` is false, and the loop stops.

> `i` is just a conventional name for a loop counter ("index"). You could call it anything,
> but `i` is what everyone uses.

### Watch out for the infinite loop
If the condition never becomes false, the loop runs forever and freezes the page.
Example of a BUG: `for (let i = 1; i <= 5; i--)` — here `i` goes *down*, never reaches 6,
and loops forever. Always make sure your step moves *toward* ending the loop.
(If you ever freeze the page, just close the tab.)

### The while loop
Use `while` when you don't know the exact number of repeats up front — you loop
*until* something changes:

```js
let count = 3;
while (count > 0) {
  console.log(count);
  count = count - 1;   // MUST change something, or it loops forever
}
// prints: 3 2 1
```

---

## Step 3 — Your tasks
Open `script.js` and complete the TODOs, one at a time. Save → refresh → check the Console.

When done:
1. Write your Lesson 5 entry in `../progress.md` (Streak day 2!).
2. Paste me your `script.js`, and explain in your own words what the three parts of a `for` loop do.
3. Tell me one thing that confused you.
