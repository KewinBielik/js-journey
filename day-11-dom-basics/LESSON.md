# Lesson 11 — The DOM (JavaScript meets the webpage)

Until now, your JavaScript mostly talked to the **console**. Real websites work differently:
JavaScript reads and changes the **page itself** — text, buttons, colors, clicks.

The **DOM** (Document Object Model) is the browser's live representation of your HTML.
Your JS can **select** elements and **change** them.

This is how your laryngologist website's mobile menu, animations, and buttons actually work.

## What you'll learn today
1. Selecting elements: `document.querySelector()` and `document.getElementById()`.
2. Changing text: `.textContent`.
3. Listening for clicks: `.addEventListener()`.
4. Toggling styles/classes: `.classList`.

---

## Step 1 — Open the playground differently this time

Open `index.html` in your browser — but **don't just stare at the Console**.

You'll be changing what you **see on the page**. Keep DevTools open if you want, but the
main feedback is now visual: click buttons, watch text change.

Same loop: edit `script.js` → save → refresh the browser.

---

## Step 2 — Concepts (read, then do)

### Selecting an element
```js
const title = document.querySelector("h1");       // first <h1> on the page
const btn = document.getElementById("myButton"); // element with id="myButton"
```
- `querySelector("css-selector")` — flexible, uses CSS selector syntax.
- `getElementById("id")` — fast and direct when you have an `id`.

### Changing text
```js
title.textContent = "New title!";
```
Use `.textContent` for plain text. (There's also `.innerHTML` for HTML — avoid it for now
unless you specifically need tags inside.)

### Listening for clicks
```js
btn.addEventListener("click", function () {
  console.log("Button was clicked!");
});
```
"When the user clicks this button, run this function." The function you pass in is called
a **callback** — same idea as with array methods.

### Changing classes
```js
const box = document.querySelector(".box");
box.classList.add("highlight");     // add a CSS class
box.classList.remove("highlight");  // remove it
box.classList.toggle("highlight");  // add if missing, remove if present
```
CSS classes control styling. JavaScript toggles them to change appearance.

---

## Step 3 — Your tasks
Open `script.js`. The HTML and CSS are already set up — **you write all the JavaScript.**

When done:
1. Write your Lesson 11 entry in `../progress.md`.
2. Explain in your own words: what is the DOM?
3. Tell me one thing that confused you.
