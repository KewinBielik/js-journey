# Lesson 46 — A key on the write routes

Lesson 45 ended with this question: if some routes should require a password, where
does that check live?

In middleware. Same shape as `requireValidNote`. The one new idea is **where the
proof travels**: in a **header**, not in the URL and not in the body.

Reading notes stays open. Creating, editing, and deleting require a key.

---

## Why a header

A request already has three places you could hide a secret:

| Place | What goes wrong |
|---|---|
| The URL, `?key=...` | Shows up in logs, browser history, and the address bar |
| The body | DELETE has no body. And the body is the note, not the proof |
| A header | Sent on every method, not stored in the URL, not mixed into the note |

Headers are how `Content-Type` already travels. A key is the same kind of thing:
information *about* the request, not the note itself.

```js
req.get("x-api-key")
```

`req.get` is the safe way to read a header. HTTP header names are case-insensitive,
and Express stores them lowercased. `req.get` hides that.

---

## 401 is a new status

You know 400 (bad body) and 404 (nothing there). A missing or wrong key is neither.

**401** means "you didn't prove you're allowed." The route never runs.

Don't reuse 404 for this. A 404 would tell the client the note doesn't exist, which
is a lie, and it hides the real problem.

---

## One fix before you start

In the copied `server.js`, `requireValidNote` replies **404** for an empty title.
That was a slip while fixing the unknown-path status. A bad body is still **400**.
Change that one number, then leave validation alone.

---

## Your goals

**Goal 1 — the middleware**

```js
const API_KEY = "dev-key";

function requireKey(req, res, next) {
  // read the header
  // missing or wrong → 401 and stop
  // right → next()
}
```

Use a boring fake string. This repo is public on GitHub. Never a real password.

Attach `requireKey` to POST, PUT, and DELETE. Leave GET alone, so the list still
loads for anyone.

`requireValidNote` stays. A route can have both, in this order:

```js
app.post("/notes", requireKey, requireValidNote, handler);
```

Think about why the key check comes first. A request with no key shouldn't get a
"title is required" error.

**Goal 2 — prove it from the console, before React**

From your Vite page:

```js
fetch("http://localhost:3000/notes", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "x", description: "y" }),
}).then((r) => console.log(r.status));
```

That should be 401, and `notes.db` should not grow.

Then send the same request with `"x-api-key": "dev-key"` in `headers`. That should
be 201.

Try a wrong key too. Same 401. The server should not say whether the key was missing
or just wrong. "Wrong" is enough information for an attacker.

**Goal 3 — the React app sends it**

A controlled input for the key, held in state. POST, PUT, and DELETE each add the
header. DELETE currently sends no `headers` at all, so that one is a new object,
not an extra field.

GET does not send the key.

Wrong or empty key: the status line should say the server refused it, not "loading
error". You already branch on `response.ok`. 401 is just another not-ok status.
You can read `response.status` if you want a clearer message.

**Goal 4 — say what this does not protect**

The key will live in your React source, which the browser downloads. Anyone can
open DevTools and read it. So this lesson is the *shape* of the check, not real
security. Write one sentence in `progress.md` about what would have to change
before this could protect anything. (Hint: the secret can't live in the client.)

**Skip:** users, signup, hashing passwords, cookies, JWT, sessions. That's the
real version of this, and it's more than one lesson.

---

## Two terminals

| Terminal | Folder | Command |
|---|---|---|
| 1 | `day-46-auth/server` | `npm install` then `node server.js` |
| 2 | `day-46-auth/client` | `npm install` then `npm run dev` |

---

## Checklist

- [x] A bad body is 400 again, a missing note is 404, a missing key is 401
- [x] POST, PUT, and DELETE refuse a request with no key, and change nothing
- [x] GET still works with no key
- [x] The React app can create, edit, and delete when the key is filled in
- [x] I can say why the key is a header, and why this version isn't real security

---

## When you're done

1. Short notes in `progress.md`, same as last time
2. Why does `requireKey` come *before* `requireValidNote`?
3. Your Lesson 44 note said anyone who can reach the URL can delete everything.
   What, exactly, is still true after today?
