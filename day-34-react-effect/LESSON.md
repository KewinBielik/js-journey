# Lesson 34 — `useEffect` (talk to `localStorage`)

Same link saver. One new hook. No rename, no extra components.

In vanilla you saved inside `render()` and loaded at the bottom of `script.js`. React has no `render()` you call — so save needs a new place.

---

## The one idea

**`useEffect` = “after React has updated the screen, also do this.”**

The “this” is a **side effect**: talking to the outside world (`localStorage`). Not “compute JSX.”

```js
import { useState, useEffect } from "react";

useEffect(() => {
  localStorage.setItem("links", JSON.stringify(links));
}, [links]);
```

Two parts:

1. A function — the work to do  
2. `[links]` — run after render **when `links` changed** (and once at the start)

Same `JSON.stringify` you already know.

---

## Load: not a second effect

If you load in one effect and save in another, they can race: save runs with `[]` and **wipes** what you had stored. Skip that.

Load as the **starting value** of state. `useState` can take a **function**; React calls it **only on the first render**:

```js
const [links, setLinks] = useState(() => {
  const raw = localStorage.getItem("links");
  if (raw === null) return [];
  return JSON.parse(raw);
});
```

That’s your old “load at the bottom of the file.” The `() => { ... }` is not an arrow handler — it’s “here’s how to compute the initial value.”

Do the same idea for `nextId` (default `0` if nothing saved).

Then the effect only **saves** when `links` (and `nextId`) change.

---

## Compared to vanilla

| Vanilla | React today |
|---------|-------------|
| `getItem` once at startup | `useState(() => { ... getItem ... })` |
| `setItem` inside `render()` | `useEffect(() => { setItem... }, [links])` |

---

## Why not `setItem` in the middle of `App()`?

The component function runs every time state changes. Putting `localStorage` in the body works for save, but it’s the wrong slot: mixing “describe UI” with “talk to the disk.” Effects are the slot for disk/network. (Also easier to forget `nextId` if you only save inside `submit`.)

---

## Run it

```powershell
cd C:\Users\kewin\Desktop\js-journey\day-34-react-effect
npm install
npm run dev
```

`App.jsx` is Lesson 33. You add load + one save effect. Leave `LinkItem.jsx` alone.

---

## Your goals

**Goal 1 — Load on first paint**

`useState(() => ...)` for `links` and `nextId`. Empty storage → `[]` and `0`.

**Goal 2 — Save after changes**

`useEffect` that `setItem`s when `links` / `nextId` change. Add a link, check DevTools → Application → Local Storage.

**Goal 3 — Prove it**

Refresh — list is still there. Delete one, refresh — still gone. Add after refresh — ids don’t collide.

---

## If logs run twice

In development, React **Strict Mode** can run effects extra times on purpose. Not a bug. Ignore it today.

---

## Skip

Two competing load/save effects, cleanup functions, fetching in `useEffect`.

---

## Checklist

- [ ] I can say `useEffect` in one sentence
- [ ] `[links]` means “run this after render if `links` changed”
- [ ] Initial data comes from `useState(() => ...)` not from a load effect
- [ ] Links and `nextId` survive refresh

---

## When you’re done

1. Lesson 34 in `../progress.md`
2. What is a side effect, in this lesson?
3. Why load with `useState(() => ...)` instead of a second `useEffect`?
