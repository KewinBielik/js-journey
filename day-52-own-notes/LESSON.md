# Lesson 52 — Notes belong to a user

Lesson 51 asks "are you logged in?" It does not ask "whose note is this?"

`requireLogin` sets `req.username`, then `readNotes()` returns every row. Log in as
someone else and you see the same list. You can also delete a note if you know
its id, because `DELETE` only checks the id.

Today each note stores an owner, and every query uses **the username the server
already proved**, `req.username`. The React app barely changes. If the browser
could hide other people's notes while the JSON still contains them, that is not
a fix. Look at the Network tab if you are tempted.

You already noticed `requireLogin` and `GET /me` repeat the same lookup. That is
real. It is a stretch at the bottom, not today's idea.

Read Part 1 first. After that: what to write, what to do, what you should see.

---

## Part 1 — The owner is not in the body

A logged-in request already has a username. `requireLogin` put it on `req`.

The client must not be allowed to choose the owner. If `POST /notes` trusted
`req.body.username`, anyone who can log in could send:

```json
{ "title": "hi", "description": "hi", "username": "kewinDev" }
```

and the note would land in your list. The password check would not matter.

So:

| Who says the owner? | What happens |
|---|---|
| The body | The client can name anybody |
| `req.username` | Only a correct password put that name on the request |

Same rule on read, update, and delete. The id in the URL is not enough. Ids are
not secrets: they show up in the JSON your own browser already received.

Someone else's id should look like a missing id. Reply **404**, the same message
you already use. A **403** ("that's not yours") tells a stranger the note exists.

---

## Part 2 — Two users, empty notes table

**Terminal 1:**

```bash
cd day-52-own-notes/server
npm install
```

Do **not** start the server until Part 3 has changed `CREATE TABLE`. If
`notes.db` appears early, `CREATE TABLE IF NOT EXISTS` will keep the old table
and ignore your new column (Lesson 44). If that file already exists, delete it
before the first start after the schema change.

**Add a second dev user** next to the existing `createUser` call. Another fake
username and fake password. This repo is public.

**Terminal 2:**

```bash
cd day-52-own-notes/client
npm install
npm run dev
```

You will start the server in Part 3.

---

## Part 3 — Store the owner, filter the list

In `db.js`, add `username TEXT NOT NULL` to the `notes` table.

Then:

- `readNotes` takes a username and `SELECT`s `WHERE username = ?`
- `addNote` inserts that username too

In `server.js`:

- `GET /notes` calls `readNotes(req.username)`
- `POST /notes` saves `req.username`. Do not read an owner from `req.body`.

If you start the server and SQLite says the table has no such column, the old
`notes.db` is still there. Stop, delete that file, start again.

**Do:** log in as `kewinDev`, add a note called `mine`. Log out. Log in as the
second user.

**You should see:** an empty list. Log out, log back in as `kewinDev`, and
`mine` is there again.

The heading can show `me` if you want to see which account is open. The list
itself should not need a React filter.

---

## Part 4 — Update and delete must check the owner too

Filtering `GET` is not enough. `DELETE /notes/:id` and `PUT /notes/:id` still
match on id alone. A logged-in user who copied an id from the Network tab can
remove the other person's note.

Change `deleteNote` and `changeNote` so the `WHERE` is the id **and** the
username. `changes === 0` stays a 404. That covers "no such id" and "not yours"
with one answer.

Pass `req.username` in from the route. The URL still only has the id.

### The stolen-id test

1. As `kewinDev`, add `mine` if it is not there. DevTools → **Network** → the
   `notes` response → copy that note's `id`.
2. Log out. Log in as the second user.
3. In the console on `http://localhost:5173`:

```js
fetch("http://localhost:3000/notes/PASTE_THE_ID", {
  method: "DELETE",
  credentials: "include",
})
  .then((r) => console.log(r.status));
```

**You should see:** `404`

4. Log out. Log in as `kewinDev`.

**You should see:** `mine` is still in the list.

Do the same idea with PUT if you want: the second user edits that id, gets 404,
and `kewinDev`'s title is unchanged.

---

## Checklist

- [x] `notes` has a `username` column, and `notes.db` was recreated after that change
- [x] `GET /notes` as the second user does not include `kewinDev`'s notes
- [x] New notes are stored under `req.username`, not a field from the body
- [x] Deleting the other user's id returns 404, and their note is still there
- [x] Editing the other user's id does the same

**Stretch, not required:** `requireLogin` and `GET /me` repeat the cookie → token
→ row → expiry lookup. One function both can call. `/me` still sends
`{ username }` or 401. `requireLogin` still calls `next()` or 401.

**Skip:** a register form, a foreign key from notes to users, separate databases
per user.

---

## When you're done

1. Short notes in `progress.md`, same as usual
2. Why is the owner `req.username` and not `req.body.username`?
3. Why is a stolen id a 404 and not a 403?
