# Lesson 30 — React intro (components, JSX, useState)

> **Read [`REFERENCE.md`](REFERENCE.md) instead of this file if React feels confusing.**
> This spec moved too fast — it introduced Node, npm, Vite, JSX, components and `useState`
> all at once. `REFERENCE.md` is the slow version, with everything compared against the
> vanilla JS you already know. This file is kept only as the task list.

You've been writing the **render pattern** by hand for weeks:

1. Data lives in a variable / array  
2. Something changes the data  
3. You call `render()` to rebuild the page  

React's job is: **when the data changes, update the UI for you.** You describe what the screen should look like for the current data; React handles the DOM.

Today is setup + the smallest useful piece of React: **`useState`**.

---

## Goal 0 — Install Node.js (required once)

This machine doesn't have Node/npm yet. React projects need them.

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** version (the recommended one)
3. Install with defaults
4. **Close and reopen** the terminal (and Cursor, if the terminal was already open)
5. Check:

```powershell
node -v
npm -v
```

Both should print version numbers. If not, Node isn't on your PATH yet — reopen Cursor fully and try again.

---

## Goal 1 — Run this project

In a terminal:

```powershell
cd C:\Users\kewin\Desktop\js-journey\day-30-react-intro
npm install
npm run dev
```

- `npm install` downloads React and Vite into `node_modules/` (can take a minute)
- `npm run dev` starts a local dev server and prints a URL like `http://localhost:5173`

Open that URL. You should see the starter text from `src/App.jsx`.

Leave the terminal running while you work. Saving a file should refresh the page (same idea as Live Server).

> **Note:** `node_modules` is huge and gitignored — don't commit it. Anyone who clones runs `npm install` themselves.

---

## The one idea: state

In vanilla JS you did:

```js
let count = 0;
// ... later
count += 1;
render();
```

In React:

```js
import { useState } from "react";

const [count, setCount] = useState(0);
```

| Piece | Meaning |
|-------|---------|
| `useState(0)` | "Remember this value across re-renders. Start at `0`." |
| `count` | The current value (read it) |
| `setCount` | The only way you should update it |

When you call `setCount(newValue)`, React **re-runs your component function** and updates the page. That re-run *is* your `render()` — you don't call it yourself.

**Important:** don't do `count = count + 1`. Mutating state by hand won't reliably update the UI. Always use `setCount(...)`.

---

## JSX in 60 seconds

The HTML-looking syntax inside React files is **JSX**. Examples that trip people up:

| JSX | Why |
|-----|-----|
| `className="hint"` | `class` is reserved in JS — use `className` |
| `{count}` | Curly braces embed a JS expression |
| `onClick={handleClick}` | CamelCase events; pass a function, don't call it |

A **component** is a function whose name starts with a **Capital letter** and returns JSX:

```js
function App() {
  return <h1>Hello</h1>;
}
```

---

## Your goals (after the app runs)

**Goal 2 — Counter**

In `src/App.jsx`, build a counter that shows a number and has:

- a button that increases by 1  
- a button that decreases by 1  
- a button that resets to 0  

Use `useState`. No `document.getElementById`, no `innerHTML`, no manual `render()`.

**Goal 3 — Explain it back**

In your own words (progress notes or chat): what happens when you click "+1"? Trace it: `setCount` → React re-runs `App` → new JSX → screen updates.

**Goal 4 (optional stretch)**

Add a text input that stores its value in state (`value={...}` + `onChange={...}`). Show the typed text live below the input. This is a **controlled input** — same idea as reading `.value`, but React owns the value.

---

## Files you care about

| File | Role |
|------|------|
| `src/App.jsx` | **You edit this** — your UI |
| `src/main.jsx` | Boots React into `#root` (leave it) |
| `index.html` | Almost empty shell — React fills `#root` |
| `package.json` | Lists dependencies and scripts |

---

## What you don't need yet

- Multiple components / props  
- `useEffect`  
- React Router  
- CSS frameworks  

One component + `useState` is enough for Lesson 30.

---

## Checklist

- [ ] `node -v` and `npm -v` work
- [ ] `npm install` + `npm run dev` show the app in the browser
- [ ] Counter works with `useState` (inc / dec / reset)
- [ ] I can explain why we use `setCount` instead of `count++`
- [ ] No vanilla DOM APIs in `App.jsx`

---

## When you're done

1. Add Lesson 30 to `../progress.md`
2. What felt weird coming from vanilla JS?
3. In one sentence: what does `useState` replace from your old apps?
