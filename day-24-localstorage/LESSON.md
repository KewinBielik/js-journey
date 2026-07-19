# Lesson 24 — Making things stick (localStorage)

Back to JavaScript. One new idea today, and it's a big "aha" one.

Your todo app works — but open it, add a task, then **refresh the page**. Everything resets. That's because your `tasks` array lives in memory, and memory is wiped every time the page loads.

Real apps *remember*. Today you make yours do the same.

---

## The one idea: localStorage

The browser gives every site a tiny built-in storage box called **`localStorage`**. Whatever you put in it survives refreshes, tab closes, even restarting the computer. It lives on *this* browser, for *this* site.

Three things you can do with it:

```js
localStorage.setItem("key", "some string");   // save
localStorage.getItem("key");                   // read (returns the string, or null)
localStorage.removeItem("key");                // delete
```

Think of it as a notepad with named lines. You write to a line by name, and read it back later by the same name.

---

## The catch you'll hit (read this before you start)

`localStorage` can **only store strings**. Not arrays. Not objects. Just text.

But your `tasks` is an array of objects. So you can't hand it over directly — you have to **convert it to a string first**, and **convert it back** when you read it. JavaScript has two built-in tools for exactly this:

```js
JSON.stringify(value)   // turns an array/object INTO a string
JSON.parse(text)        // turns a string BACK INTO an array/object
```

- **Saving:** array → `JSON.stringify` → string → `setItem`
- **Loading:** `getItem` → string → `JSON.parse` → array

That round-trip is the whole trick. If you understand those two arrows, you understand today's lesson.

> Try it in the console once to *see* it:
> `JSON.stringify([{a: 1}])` → `'[{"a":1}]'` (notice the quotes — it's text now)

---

## Your goals

You already have a working app in `script.js`. You're **adding two behaviors** to it. You decide where the code goes and what to name things.

**Goal 1 — Save whenever data changes**  
Every time `tasks` changes (add, delete, toggle done), write it to `localStorage`. Think about *where* the single best place to save is, so you don't have to repeat `setItem` in five different spots. (Hint: what function already runs after every change?)

**Goal 2 — Load on startup**  
When the page first loads, check `localStorage`. If there's saved data, use it as your starting `tasks` instead of the hard-coded three. If there's nothing saved yet, keep the current default list.

**Goal 3 — Prove it works**  
Add a task, refresh, and confirm it's still there. Mark one done, refresh — the "done" state should persist too. Delete one, refresh — it should stay gone.

---

## Things to think through (not steps to copy)

- What key name will you store it under? (e.g. something like `"tasks"`)
- `getItem` returns `null` when nothing is saved yet. How will your load code handle that so it doesn't crash on first visit?
- You save the whole `tasks` array. Do you also need to save `nextId`? What happens to new-task IDs after a refresh if you don't? (Try it both ways and observe — this is a good experiment.)

---

## How to inspect what you saved (DevTools)

You can *see* your storage:

1. `F12` → **Application** tab (Chrome/Edge) or **Storage** tab (Firefox)
2. Expand **Local Storage** → click your site
3. You'll see your key and its stringified value
4. You can delete it here to simulate a "first visit" again

---

## What you don't need yet

- No database, no server, no accounts — that's much later
- No libraries — `localStorage` and `JSON` are built into every browser

---

## Checklist

- [ ] I can explain why `localStorage` needs `JSON.stringify` / `JSON.parse`
- [ ] Tasks survive a page refresh (add, done-state, and deletes)
- [ ] First-ever visit (empty storage) still works, no crash
- [ ] I looked at my saved data in the DevTools Application/Storage tab

---

## When you're done

1. Add Lesson 24 to `../progress.md`
2. In your own words: why can't you store the array directly?
3. Did you save `nextId` too? What did you decide and why?
