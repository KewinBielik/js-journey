# Lesson 50 — Sessions that survive a restart

Lesson 49's cookie still works. The guest list does not. Restart the server and
the `sessions` Map is empty, so every ticket looks unknown.

You already named the fix: **put the Map in the database.** A file outlives the
process.

The second idea today is **expiry.** A ticket that never dies is a ticket a
stolen laptop can keep using. Each row gets a "valid until" number, and `/me`
treats an old row the same as a missing one.

Read Part 1 before touching code. After that, every step has three parts: what to
write, what to type, and what you should see.

Two new ideas. The SQL is INSERT / SELECT / DELETE, which you already know.

---

## Part 1 — The Map was already a table

Your Map is:

```txt
"9f2c4a..."  →  "kewinDev"
"b81e03..."  →  "kewinDev"
```

That is two rows:

| token | username |
|---|---|
| 9f2c4a... | kewinDev |
| b81e03... | kewinDev |

Same guest list. The cookie and `getToken` do not change. Login still creates a
random token and still sends `Set-Cookie`. The only swap is where that pair is
stored:

| Lesson 49 | Lesson 50 |
|---|---|
| `sessions.set(token, username)` | `INSERT` a row |
| `sessions.get(token)` | `SELECT` that row |
| `sessions.delete(token)` | `DELETE` that row |

Two logins by the same user are two rows, two tokens. That is on purpose. Logging
in from a second browser should not kick the first one out.

---

## Part 2 — Same test page as last time

**Terminal 1:**

```bash
cd day-50-sessions-db
npm install
node server.js
```

Stop anything else on port 3000 first.

**Terminal 2**, any Vite app on 5173. Same as Lesson 49:

```bash
cd day-46-auth/client
npm run dev
```

Open `http://localhost:5173`, press `F12` → **Console**, paste:

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

const logout = () =>
  fetch(api + "/logout", { method: "POST", credentials: "include" })
    .then((r) => console.log(r.status));
```

The starter is your Lesson 49 server, Map still in place. Confirm it before you
change storage:

**Do:** `login()` then `me()`

**You should see:** `200 {"ok":true}` then `200 {"username":"kewinDev"}`

---

## Part 3 — Replace the Map with a table

### The table

Next to the `users` `CREATE TABLE`, add a second one:

```sql
CREATE TABLE IF NOT EXISTS sessions (
  token    TEXT PRIMARY KEY,
  username TEXT NOT NULL
);
```

`token` is the primary key because that is how you look a session up, the same
way the Map used the token as the key. There is no unique constraint on
`username`. Same person, two tokens, two rows.

### Swap the three Map calls

Keep `getToken`. Keep the cookie headers. Change only the three Map lines.

**Login**, where you currently `sessions.set(...)`: insert a row of `(token, username)`.
Use `?` placeholders (Lesson 43).

**`GET /me`**, where you currently `sessions.get(...)`: select the username for
that token. `.get()` returns one row or `undefined`, same as looking up a user.
No row → 401. A row → `{ username }` from that row.

**Logout**, where you currently `sessions.delete(...)`: delete the row for that
token. Then clear the cookie the same way as Lesson 49.

Then delete `const sessions = new Map()`. If anything still mentions `sessions`,
the server will crash, and that crash is telling you which line you missed.

Restart the server after each swap if you want, or do all three and restart once.

### Prove the file outlives the process

**Do:**

1. `login()` then `me()` — should be 200 with your username
2. Stop the server with `Ctrl+C`. Start it again.
3. `me()` again. Do **not** log in.

**You should see:** `200 {"username":"kewinDev"}`

Lesson 49's restart gave 401. Today the cookie still holds the ticket, **and**
the guest list is still in `users.db`.

If you get 401, the cookie is probably fine and the INSERT never ran, or `/me`
is still reading a Map that no longer exists. Check the server terminal for a
crash on startup.

---

## Part 4 — Tickets that expire

A row that stays forever means a token stolen last year still works. Add a third
column: **when this ticket stops counting.**

### The number

`Date.now()` is milliseconds since 1 January 1970. It is a plain number, so store
it as `INTEGER`. "Valid for 24 hours" means:

```txt
expires_at = Date.now() + (24 hours in milliseconds)
```

You write the 24-hours expression. Put that lifetime in a constant near the top
of the file (`SESSION_MS` or whatever you name it) so you can shorten it for the
test below without hunting through the routes.

### The table already exists

`CREATE TABLE IF NOT EXISTS` will **not** add a column (Lesson 44). Drop the
sessions table and create it again, now with three columns: `token`, `username`,
`expires_at INTEGER NOT NULL`. Then restart. Old session rows are gone, so log
in again after this change.

### What changes in the routes

**Login** — the INSERT now also writes `expires_at`.

**`GET /me`** — a row whose `expires_at` is in the past is not a login. Two
honest ways to do that:

- check `expires_at` in JavaScript after the SELECT, or
- add `AND expires_at > ?` to the SELECT and pass `Date.now()`

Either is fine. Missing row and expired row both reply 401, same message.

**Logout** does not need the time. Delete the row the same as Part 3.

An expired row can sit in the table until something deletes it. `/me` must still
say 401. Cleaning it up on the way through is optional (checklist stretch).

### The short-lifetime test

You are not going to wait 24 hours.

**Do:**

1. Set your lifetime constant to `3 * 1000` (three seconds). Restart.
2. `login()` then `me()` — should be 200.
3. Wait four seconds. `me()` again.

**You should see:** `401 "Not logged in"`

The browser still has the cookie. The row is still in the table. The number on
that row is in the past, so the ticket is worthless.

Then put the constant back to 24 hours, restart, `login()`, `me()`, and confirm
200 again.

---

## Checklist

- [x] I can explain why Lesson 49's restart logged everyone out, and why this one doesn't
- [x] After a restart, `me()` still returns my username
- [x] `logout()` then `me()` is 401, same as Lesson 49
- [x] With a 3-second lifetime, `me()` is 200 right after login and 401 four seconds later
- [x] Lifetime is back to 24 hours before I stop
- [x] `const sessions = new Map()` is gone

**Stretch, not required:**

- On `/me`, `DELETE` the row if it is expired, so the table does not keep dead tickets
- Set `Max-Age` on the login `Set-Cookie` to the same lifetime (in **seconds**, not ms), so the browser throws the cookie away when the server would too

**Skip:** wiring this into the notes app, `express-session`, JWT, foreign keys.

---

## When you're done

1. Short notes in `progress.md`, same as usual
2. Same user, two browsers, two tokens, two rows. Why not one row per username?
3. If `/me` never deletes expired rows, what happens to the `sessions` table after months of logins?
