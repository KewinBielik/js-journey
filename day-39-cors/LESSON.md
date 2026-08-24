# Lesson 39 — Fetch *your* API from React (CORS)

You have an Express server (Lesson 38) and a React `fetch` (Lesson 35). Today they talk to each other.

**One new idea:** the browser will **block** that `fetch` until the **server** allows it. That rule is called **CORS**.

No POST, no database, no new React hooks.

---

## Why it breaks (do this first)

The React dev server is something like `http://localhost:5173`.  
Express is `http://localhost:3000`.

To the browser those are **different origins** (the **port** counts). A page on 5173 may not read a response from 3000 unless 3000 says “yes.”

That’s not Express being broken. It’s the browser protecting you from random sites reading other sites’ APIs.

**Goal 0 — See the error**

1. Start the Lesson 39 **server** (`node server.js` in `server/`).
2. Start the **React** app (`npm run dev` in `client/`).
3. Wire `fetch("http://localhost:3000/notes")` like Lesson 35 (in `useEffect`).
4. Open the React app, check DevTools → **Console**.

You should see something about **CORS** / **Access-Control-Allow-Origin**. Then fix it on the **server**, not by deleting `fetch`.

---

## The fix (server only)

Install `cors` in the **server** folder and use it **before** your routes:

```js
import cors from "cors";

app.use(cors());
```

That sends a header: “browsers from other origins may read this.” Fine for localhost learning. Real apps later lock it to one frontend URL — skip that today.

Restart the server after changing it.

---

## Two terminals (always)

| Terminal | Folder | Command |
|----------|--------|---------|
| 1 | `day-39-cors/server` | `npm install` then `node server.js` |
| 2 | `day-39-cors/client` | `npm install` then `npm run dev` |

If React says network error and CORS is already on: the **server isn’t running**.

---

## Your goals

**Goal 1 — Server runs**  
`GET http://localhost:3000/notes` in the browser still shows JSON (same as Lesson 38). There’s a starter `notes.json` in `server/`.

**Goal 2 — React fetches it**  
`useEffect` loads `/notes` into state and you **list the titles** on the page. Same pattern as Lesson 35 (`try` / `catch`, skip nonsense). Loading / error message is enough.

**Goal 3 — CORS**  
Without `cors`: console error. With `cors` + restart: list appears.

**Skip:** POST, `credentials`, `origin: "http://localhost:5173"` config, putting React and Express on one port.

---

## Checklist

- [ ] I can explain why 5173 and 3000 are different origins
- [ ] I saw the CORS error, then fixed it on the **server**
- [ ] React shows notes from Express, not hardcoded JSX
- [ ] Two processes stay running while I test

---

## When you’re done

1. Lesson 39 in `../progress.md`
2. Who must allow the request — the React app or Express?
3. What is an “origin” in one sentence?
