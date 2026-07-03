# Lesson 12 — Dynamic Lists (data + DOM)

In Lesson 11 you changed existing elements. Today you **create and remove** elements
based on a JavaScript array — the pattern behind every todo app, shopping cart, and feed.

**The core idea:** keep your data in an **array**, then **render** it to the page.
When data changes → update the array → re-render.

## What you'll learn today
1. `document.createElement()` — build new HTML elements in JS.
2. `.appendChild()` — add them to the page.
3. The **render pattern** — loop over an array and build the UI each time.
4. Connecting user input → data → DOM.

---

## Step 1 — Open the playground
Open `index.html` in your browser. Save `script.js` → refresh → watch the page.

---

## Step 2 — Concepts (read, then do)

### Creating elements
```js
const li = document.createElement("li");
li.textContent = "Buy milk";
list.appendChild(li);
```
You built a `<li>` in JavaScript and attached it to the page. The HTML file didn't change —
the DOM did.

### The render pattern (memorize this)
Real apps don't manually tweak one `<li>` at a time. They:

1. Store data in an array.
2. Write a `render()` function that **clears** the list and **rebuilds** it from the array.
3. Whenever data changes (add, delete), update the array and call `render()` again.

```js
const items = ["Eggs", "Bread"];

function render() {
  list.innerHTML = "";                    // clear old HTML
  items.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

render();  // initial draw
```

Why clear and rebuild? It's the simplest reliable approach at your level. (Later you'll
learn fancier update strategies — for now this works great.)

### Adding from input
```js
function addItem(text) {
  if (text === "") return;
  items.push(text);
  render();
}
```
Data first, then re-render. Always.

---

## Step 3 — Your tasks
Open `script.js`. Build the shopping list app described in the TODOs.

When done:
1. Write your Lesson 12 entry in `../progress.md` (Streak day 4).
2. Explain in your own words: why do we call `render()` again after adding an item?
3. Tell me one thing that confused you.
