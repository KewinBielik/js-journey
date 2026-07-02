# Lesson 8 — Objects (describing one thing with many properties)

An array is an ordered *list* (item 0, item 1, item 2). But often you want to describe a
single *thing* that has several named details — a person has a name, an age, an email.
That's an **object**: a collection of **key: value** pairs. Objects + arrays together are
how every real app stores its data.

## What you'll learn today
1. Creating an object with properties (`key: value`).
2. Reading properties with **dot notation** (`person.name`) and **bracket notation** (`person["name"]`).
3. Adding and changing properties.
4. The real payoff: an **array of objects**, looped over — what real data actually looks like.

---

## Step 1 — Open the playground
Open `index.html`, press `F12`, click **Console**. Edit → save → refresh → check.

---

## Step 2 — Concepts (read, then do)

### Creating and reading an object
```js
const person = {
  name: "Kewin",
  age: 26,
  isStudent: false
};

console.log(person);        // the whole object
console.log(person.name);   // "Kewin"   <- dot notation
console.log(person.age);    // 26
```

Each entry is a **key** (like `name`) and a **value** (like `"Kewin"`), joined by a colon,
separated by commas. The keys are the *names* of the pieces of data.

### Two ways to read a property
```js
console.log(person.name);      // dot notation  (use this by default — cleaner)
console.log(person["name"]);   // bracket notation (same result)
```
Dot notation is what you'll use 95% of the time. Bracket notation matters when the key name
is stored in a variable — you'll appreciate it later; just know it exists.

### Adding and changing properties
```js
person.age = 27;          // change an existing property
person.email = "k@x.com"; // add a brand-new property that didn't exist before
console.log(person);
```
Like arrays, you can modify a `const` object's *contents* — you just can't reassign the
whole variable.

### The real payoff: an array of objects
This is what real data looks like — a *list* of *things*, each with properties:
```js
const people = [
  { name: "Kewin", age: 26 },
  { name: "Ada",   age: 30 },
  { name: "Sam",   age: 17 }
];

for (const person of people) {
  console.log(`${person.name} is ${person.age} years old.`);
}
```
Loop over the list, and reach into each object with dot notation. This pattern —
*loop over an array of objects and use their properties* — is something you'll write
thousands of times as a developer.

---

## Step 3 — Your tasks
Open `script.js` and complete the TODOs. Save → refresh → check after each.

When done:
1. Write your Lesson 8 entry in `../progress.md` (Streak day 3).
2. Explain in your own words: what's the difference between an array and an object?
3. Tell me one thing that confused you.
