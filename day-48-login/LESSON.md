# Lesson 48 — Login checks the hash

Lesson 47 proved a password against a hash sitting in a variable. Today that hash
sits in a table, and a route does the check.

One new idea: **the database stores the salt and the hash, never the password.**
The login route is the `checkPassword` function you already wrote, with a `SELECT`
in front of it.

No React. No cookie. A successful login only means "that password was right."
Nothing is remembered yet. That's the next lesson.

---

## The table

```sql
CREATE TABLE IF NOT EXISTS users (
  username TEXT PRIMARY KEY,
  salt     BLOB NOT NULL,
  hash     BLOB NOT NULL
);
```

`BLOB` is the SQL type for raw bytes. Your salt and hash are bytes, so that's the
column. There is no `password` column. If you feel the urge to add one, that's the
bug this lesson exists to avoid.

SQLite gives the bytes back as a `Uint8Array`, not a `Buffer`. `scryptSync` and
`timingSafeEqual` both accept that. I checked on your Node. You don't need to
convert it.

---

## Creating a user

Same two lines as yesterday, then an `INSERT`:

```js
const salt = randomBytes(16);
const hash = scryptSync(password, salt, 32);
```

The salt is new **every time you create a user**, not every time they log in.
Login has to reuse the stored salt or the hash will never match. That's Goal 2
from Lesson 47, now with a row.

Call it once at startup for a single dev user so you have something to log in as.
Use a fake password. This repo is public.

If the username is already in the table, skip the insert. Otherwise every server
restart creates a new salt, and the password you set the first time stops working.

---

## POST /login

The body is `{ username, password }`. Three outcomes:

| Situation | Status | Why |
|---|---|---|
| `username` or `password` missing | **400** | The request itself is bad |
| No such user, or the password is wrong | **401** | Same status, same message, for both |
| Password matches | **200** | `{ ok: true }` |

The 401 rule is the one from Lesson 46. "Wrong key" and "no such user" must look
the same. If a missing user got a 404 and a wrong password got a 401, a stranger
could use your login form to learn which usernames exist.

The reply never includes `salt` or `hash`. Those stay on the server. Sending them
wouldn't reveal the password, but the client has no use for them, and a login
response is a bad place to hand out stored credentials.

Look the user up with `SELECT`. No row → 401. A row → hash the typed password with
**that row's salt** and `timingSafeEqual` it to **that row's hash**.

> A missing user returns before `scryptSync` runs, so it's faster than a wrong
> password. Someone timing the replies could still tell the two cases apart.
> Knowing that is enough for today. Don't try to fix it.

---

## Your goals

**Goal 1 — the table**
Create it at startup. `users.db` appears. No password column.

**Goal 2 — one dev user**
A `createUser` that inserts a new salt and hash. Restart the server twice and
confirm you still have one row, not two. You can check with a `SELECT` logged at
startup, or with a small `node` one-liner. Don't build a GET route that returns
the hashes.

**Goal 3 — POST /login works**
From the browser console on your Vite app (`localhost:5173` is fine; `cors()` is
already on). Stop the Lesson 46 server first. This one also wants port 3000.

```js
fetch("http://localhost:3000/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username: "kewin", password: "the-fake-one" }),
}).then((r) => r.json()).then(console.log);
```

Right password → `{ ok: true }`. Then try a wrong password and a username that
does not exist. Both should be 401 with the same body.

**Goal 4 — a bad request**
Send `{}`. That's a 400, not a 401.

**Skip:** cookies, sessions, "remember me", a React form, wiring this into the
notes app, replacing the API key. Login proving the password is the whole lesson.
Remembering the login is the next one.

---

## Run it

```bash
cd day-48-login
npm install
node server.js
```

One terminal. Restart it after editing `server.js`.

---

## Checklist

- [ ] The table has no password column
- [ ] Restarting the server does not create a second user or a new salt
- [ ] The right password gets 200
- [ ] An unknown user and a wrong password get the same 401
- [ ] The reply never contains the hash or the salt

---

## When you're done

1. Short notes in `progress.md`
2. Login used the stored salt, not a new one. What would the check do if you
   generated a fresh salt on every attempt?
3. This route returns `{ ok: true }` and then forgets you. What is still missing
   before `POST /notes` could trust that you logged in?
