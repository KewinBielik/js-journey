# Lesson 7 — Arrays (lists of things)

So far each variable holds ONE value. But real programs deal with *lists*: all the users,
all the prices, all the messages. An **array** is a single variable that holds an ordered
list of values. Combine arrays with the loops and functions you already know, and you can
start processing real data.

## What you'll learn today
1. Creating an array and reading items by their **index** (position).
2. `.length`, and why the last item is at `length - 1`.
3. Changing arrays: `.push()` (add to end) and `.pop()` (remove from end).
4. Looping over an array to do something with every item.

---

## Step 1 — Open the playground
Open `index.html`, press `F12`, click **Console**. Edit → save → refresh → check.

---

## Step 2 — Concepts (read, then do)

### Creating and reading an array
```js
const fruits = ["apple", "banana", "cherry"];

console.log(fruits);      // the whole array
console.log(fruits[0]);   // "apple"  <- FIRST item
console.log(fruits[1]);   // "banana"
```

**The most important thing to burn in: arrays start counting at 0, not 1.**
So the first item is `fruits[0]`, the second is `fruits[1]`, and so on. This is called
**zero-based indexing** and it trips up every beginner. `[0]` = first. Always.

### length, and getting the last item
```js
console.log(fruits.length);           // 3  (how many items)
console.log(fruits[fruits.length - 1]); // "cherry"  <- LAST item
```
Why `length - 1`? There are 3 items at positions 0, 1, 2. The last position is `3 - 1 = 2`.
This `array[array.length - 1]` pattern for "the last item" is worth memorizing.

### Changing an array
```js
fruits.push("date");   // add "date" to the END -> ["apple","banana","cherry","date"]
fruits.pop();          // remove the LAST item -> ["apple","banana","cherry"]

fruits[0] = "avocado"; // replace the first item
```
Notice you can `.push()`/`.pop()` even though `fruits` is `const` — `const` stops you from
*reassigning the whole variable*, but you're allowed to change what's *inside* the array.
(That's the subtle `const` wrinkle I mentioned back on Day 1 — now it's relevant.)

### Looping over an array
The classic way — loop while `i` is a valid index:
```js
const fruits = ["apple", "banana", "cherry"];
for (let i = 0; i < fruits.length; i++) {
  console.log(`Item ${i}: ${fruits[i]}`);
}
```
Note: `i` starts at 0 and the condition is `i < fruits.length` (less-than, not `<=`),
because the last valid index is `length - 1`.

There's also a cleaner loop when you just want each item and don't need the index:
```js
for (const fruit of fruits) {
  console.log(fruit);
}
```

---

## Step 3 — Your tasks
Open `script.js` and complete the TODOs. Save → refresh → check after each.

When done:
1. Write your Lesson 7 entry in `../progress.md` (Streak day 3).
2. Explain in your own words: why is the last item at index `length - 1` and not `length`?
3. Tell me one thing that confused you.
