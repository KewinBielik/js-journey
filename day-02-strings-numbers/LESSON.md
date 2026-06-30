# Day 2 — Numbers, Math, and a Better Way to Build Text

Yesterday you made variables. Today you make them *do things*: math with numbers,
and a much nicer way to build sentences than the `" + "` joining from Day 1.

## What you'll learn today
1. Arithmetic: `+  -  *  /` and two new ones: `%` (remainder) and `**` (power).
2. **Template literals** — the modern, clean way to put variables inside text.
3. Two everyday string tools: `.length` and `.toUpperCase()`.

---

## Step 1 — Open the playground
Open `index.html` (this folder) in your browser, press `F12`, click the **Console** tab.
Same loop as Day 1: **edit `script.js` → save → refresh → check the Console.**

---

## Step 2 — Concepts (read, then do)

### Math with numbers
JavaScript does math with the symbols you'd expect, plus two worth meeting:

```js
console.log(10 + 3);  // 13
console.log(10 - 3);  // 7
console.log(10 * 3);  // 30
console.log(10 / 3);  // 3.333...
console.log(10 % 3);  // 1   ← REMAINDER ("modulo"): what's left after dividing
console.log(10 ** 3); // 1000 ← POWER: 10 to the power of 3
```

`%` (remainder) looks weird now but is secretly everywhere — e.g. checking if a number
is even: a number is even when `number % 2` equals `0`.

### Template literals — the upgrade I promised
On Day 1 you joined text like this:

```js
console.log("Hi, my name is " + myName + " and I am " + age + " years old.");
```

That works, but the quotes and `+` signs are easy to mess up. The modern way uses
**backticks** ( ` ` — the key above Tab, left of `1`) and `${ }` to drop a variable
right into the text:

```js
console.log(`Hi, my name is ${myName} and I am ${age} years old.`);
```

Same result, far easier to read. You can even put math inside the `${ }`:

```js
console.log(`Next year I will be ${age + 1}.`);
```

Use template literals from now on — it's what professionals reach for.

### Two string tools
```js
const word = "JavaScript";
console.log(word.length);        // 10  ← how many characters
console.log(word.toUpperCase()); // "JAVASCRIPT"
```

A `.something()` with parentheses is called a **method** — an action you run *on* a value.
`.length` has no parentheses because it's a property (a fact about the value), not an action.
Don't worry about memorizing that distinction yet — just notice the pattern.

---

## Step 3 — Your tasks
Open `script.js` and complete the TODOs, one at a time: save, refresh, check the Console.

When done:
1. Write your Day 2 entry in `../progress.md` (and bump your streak to **2**!).
2. Tell me: paste your `script.js`, and explain in your own words what `%` (remainder) does.
3. Tell me one thing that confused you.
