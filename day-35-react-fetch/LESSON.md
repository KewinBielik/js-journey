# Lesson 35 — Fetch in React

Same GitHub API as Lesson 25. Same `async` / `await` / `response.ok` / `try` / `catch`.

The new question is only: **when is it legal to call `fetch`?**

---

## Don’t fetch while rendering

This is illegal in the same way as `localStorage.setItem` in the middle of `App()`:

```js
function App() {
  const data = fetch(url); // ❌ every render, and you don't even await it
  return <p>...</p>;
}
```

`App()` must **describe UI** from state. `fetch` is a side effect (talks to the network). Side effects go in **`useEffect`** — after paint — or in an event handler (click/submit).

Today we use **`useEffect`**, so loading follows **state**, not only a click buried in a handler.

---

## The pattern

1. Form submit → `preventDefault` → `setUsername(...)` (and maybe clear the input).  
2. `useEffect` with `[username]` → when `username` changes, fetch  
   `https://api.github.com/users/${username}`  
3. Put the result in state (`setProfile`, `setStatus`, …).  
4. JSX reads that state (avatar, login, repo count).

If `username` is `""`, **don’t fetch** — `return` at the top of the effect.

You already know the fetch body from Lesson 25. Peek at `day-25-fetch-api/script.js` if you blank on `response.json()`.

---

## `async` gotcha (one line)

The function you pass to `useEffect` **cannot** be `async` itself (React forbids it). Inside it, define a normal async function and call it:

```js
useEffect(() => {
  async function load() {
    // await fetch ...
  }
  load();
}, [username]);
```

That’s a React rule, not a JS rule. Don’t fight it.

---

## Run it

```powershell
cd C:\Users\kewin\Desktop\js-journey\day-35-react-fetch
npm install
npm run dev
```

Wire up `src/App.jsx`. CSS: `.panel`, `.status`, `.avatar`, `.error`.

Show the image with something like: if you have an avatar URL, render `<img className="avatar" ... />`. No `display: none` required.

---

## Your goals

**Goal 1 — Controlled username + submit**  
Typing goes into state. Submit sets the username you’ll fetch (could be the same state, or a second `username` vs `input` — your choice).

**Goal 2 — Effect fetches when `username` changes**  
Empty username → skip. Loading message while waiting.

**Goal 3 — Show profile**  
Avatar, login or name (`name || login` from Lesson 25), public repo count.

**Goal 4 — Errors**  
`try` / `catch` and `response.ok`. Bad username → friendly message, not a crash.

**Skip:** abort/cleanup, fetching lists of repos, `localStorage`.

---

## Checklist

- [ ] No `fetch` in the body of `App()` outside an effect or handler
- [ ] Submit `KewinBielik` shows a real profile
- [ ] A nonsense username shows an error
- [ ] I can explain why the effect lists `[username]`

---

## When you’re done

1. Lesson 35 in `../progress.md`
2. Why not call `fetch` at the top of `App()`?
3. What does `[username]` tell `useEffect`?
