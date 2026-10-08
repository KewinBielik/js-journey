# Lesson 51 — The notes app uses the session

The API key from Lesson 46 sits in the React source. Anyone can read it in
DevTools. You already wrote the real proof: a password check, then a cookie.

Today those two servers become **one**. Login is already in the starter (your
Lesson 50 routes). The new work is:

1. A middleware that asks "is this request logged in?" the same way `GET /me` does.
2. The React app logs in, then talks to `/notes` with the cookie, and the key goes.

Everyone's notes are still one shared list. Splitting notes per user is the next
lesson. Today is only "are you logged in?"

Read Part 1 first. After that, every step has: what to write, what to type, what
you should see.

---

## Part 1 — The key vs the cookie

**Lesson 46.** The client sends a string it already knows:

```js
headers: { "x-api-key": key }
```

That string lives in `App.jsx`. The browser downloads it. It is not a secret.

**Lessons 48–50.** The client sends a username and password **once**. The server
sets a cookie. Later requests carry that cookie because of `credentials: "include"`.
Your fetch code never mentions the token.

`requireKey` and `requireLogin` have the same shape. Both are middleware: wrong
or missing → 401 and stop. Right → `next()`. The only change is **what counts as
proof**: a header that was baked into the page, or a ticket the server issued
after a correct password.

`GET /login` would be nonsense — you cannot demand a session to *create* a
session. `/login`, `/me`, and `/logout` stay public. The notes routes do not.

---

## Part 2 — Two terminals, confirm the starter

**Terminal 1:**

```bash
cd day-51-session-notes/server
npm install
node server.js
```

Stop anything else on port 3000 first.

**Terminal 2:**

```bash
cd day-51-session-notes/client
npm install
npm run dev
```

Open `http://localhost:5173`. The notes list should load. The key is still there,
so adding a note in the UI should still work. CORS is already the Lesson 49
version (`origin` + `credentials`). Do not change it back to `cors()`.

**Console helpers** — paste once into DevTools on that page:

```js
const api = "http://localhost:3000";

const login = () =>
  fetch(api + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username: "kewinDev", password: "veryHardPassword" }),
  }).then((r) => r.text().then((t) => console.log(r.status, t)));

const me = () =>
  fetch(api + "/me", { credentials: "include" })
    .then((r) => r.text().then((t) => console.log(r.status, t)));

const notes = () =>
  fetch(api + "/notes", { credentials: "include" })
    .then((r) => r.text().then((t) => console.log(r.status, t)));

const add = () =>
  fetch(api + "/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ title: "from console", description: "no key" }),
  }).then((r) => r.text().then((t) => console.log(r.status, t)));
```

**Do:** `login()` then `me()` then `add()`

**You should see:** `200` for login and `/me`. `add()` should be **401** — the
write routes still want `x-api-key`, and these helpers do not send it. That 401
is the starting line.

---

## Part 3 — `requireLogin`

`GET /me` already does the lookup: cookie → token → sessions row → expiry.
`requireLogin` is that same lookup, but instead of `res.json({ username })` it
calls `next()`.

You can copy the lookup, or pull it into a helper both `/me` and `requireLogin`
use. Either is fine. Do not hang `requireLogin` on `/me` if `/me` still does the
lookup itself — pick one place that replies, or share the helper.

After a valid row, set `req.username` to the username on that row, then `next()`.
The notes handlers will not use it today. It is how middleware hands the identity
to the route for later.

Missing cookie, unknown token, expired token: same 401 and the same message, then
`return` (no `next()`).

### Hang it on the notes routes

Replace `requireKey` on POST, PUT, and DELETE with `requireLogin`. Put
`requireLogin` on `GET /notes` too. Then delete `requireKey` and `API_KEY`.

Order on POST/PUT is still: login first, then `requireValidNote`. A stranger
should not get "title is required".

Restart the server.

**Do:** `notes()` without logging in.

**You should see:** `401`

**Do:** `login()` then `notes()` then `add()`

**You should see:** `200` with the list, then `201` with the new note. No
`x-api-key` anywhere.

The React app will start showing a loading error. GET `/notes` now needs the
cookie, and `load()` does not send `credentials` yet. That is Part 4.

---

## Part 4 — The React app logs in

Three jobs. Do them in this order so each one is testable.

### 4a — `credentials: "include"` on every fetch to this server

`load`, `sendNote`, `deleteNote`, `editNote`, and the new login/logout fetches.
Miss one and that request arrives with no cookie.

Keep the key headers for a moment. Restart is not needed (Vite reloads).

**Do:** `login()` in the console, then click around in the UI, or just reload
after logging in.

**You should see:** the list loads again, because `load()` now sends the cookie.

### 4b — Throw the key away

Delete `key` state and every `"x-api-key"` header. The server no longer reads
that header. A 401 now means "not logged in", so change those status strings.

You will want a base URL like `http://localhost:3000`, because login is `/login`,
not `/notes`.

### 4c — A login screen

You already know early return from `NoteItem`: if you are not logged in, return
the login form and nothing else. Ugly is fine. No new CSS lesson.

You need:

- state for the username and password fields (controlled inputs, Lesson 31)
- state for "who am I?" — `null` until `/me` or login succeeds
- a form that `POST`s `/login` with `{ username, password }` and
  `credentials: "include"`. On 200, either call `/me` or set the logged-in state
  yourself, then `load()`
- `useEffect` on mount: `GET /me` with credentials. 200 → you are logged in,
  `load()` the notes. 401 → stay on the login form. That is how a refresh keeps
  you logged in (the cookie is still there)
- a Log out button that `POST`s `/logout`, clears the logged-in state, and
  clears the list

Wrong password: show a status message, stay on the form.

**You should see:**

| Do | What happens |
|---|---|
| Open the app logged out | Login form, no notes |
| Log in with `kewinDev` / `veryHardPassword` | Notes list, you can add/edit/delete |
| Refresh | Still logged in, list loads |
| Log out | Back to the login form |
| Log in with a wrong password | Error status, still the form |

---

## Checklist

- [ ] `requireKey` and `API_KEY` are gone
- [ ] `/login`, `/me`, `/logout` do **not** use `requireLogin`
- [ ] `notes()` without a cookie is 401; after `login()` it is 200
- [ ] Every notes fetch in React has `credentials: "include"`
- [ ] There is no `x-api-key` in the client
- [ ] Logged out → form. Logged in → notes. Refresh stays logged in. Logout returns to the form

**Skip:** notes per user, a register form, hashing on the client, `express-session`.

---

## When you're done

1. Short notes in `progress.md`, same as usual
2. Why must `/login` not use `requireLogin`?
3. After you log in, `sendNote` has no key and no token in your code. Who is
   sending the proof, and where does it travel?
