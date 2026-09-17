  # Lesson 44 — Putting the database under the API

Yesterday you wrote SQL in a script with nothing around it. Today it goes underneath the
real thing.

**The client does not change.** Not one line. That's the whole idea, and it's worth
sitting with for a second: you are about to replace how every note is stored, and the
React app — the form, the edit mode, the delete buttons — will carry on as if nothing
happened.

That's what an API *is*. `GET /notes` is a promise about what goes in and what comes out.
Everything behind it is yours to change.

---

## Most of today is deleting

Open `server/server.js` and find these:

```js
import fs from "fs";

let notes = [];

try {
  const raw = fs.readFileSync("notes.json", "utf8");
  notes = JSON.parse(raw);
} catch (error) { ... }

function saveNotes() {
  fs.writeFileSync("notes.json", JSON.stringify(notes, null, 2));
}
```

All of it goes. In its place:

```js
import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("notes.db");
db.exec(`CREATE TABLE IF NOT EXISTS notes ( ... )`);
```

Same schema as yesterday. `IF NOT EXISTS` is doing the job the `try`/`catch` used to.

### What that deletion actually buys you

Notice what's gone: **the server no longer holds your notes in memory.** There's no
`notes` array living between requests. Every route asks the database fresh and the
database is the only copy.

That is the concurrency bug from Lesson 42, fixed — not patched, but made impossible.
There's nothing left to overwrite, because nothing reads the whole collection, edits a
copy, and writes it back.

---

## The routes, one at a time

Don't do all four then start the server. Do one, test it, move on.

| Route | Was | Becomes |
|---|---|---|
| `GET /notes` | `res.json(notes)` | `SELECT` all rows, send them |
| `POST /notes` | `notes.push(...)`, `saveNotes()` | `INSERT`, then send the note back |
| `PUT /notes/:id` | `find`, assign, `saveNotes()` | `UPDATE ... WHERE id = ?` |
| `DELETE /notes/:id` | `filter`, `saveNotes()` | `DELETE ... WHERE id = ?` |

Everything else in each route stays exactly as it is: `validateNote`, the status codes,
the shape of what you send back. Only the middle changes.

### The one genuinely new trick — 404 without a lookup

Your PUT and DELETE currently check existence first:

```js
const targetNote = notes.find((n) => n.id === req.params.id);
if (targetNote === undefined) { /* 404 */ }
```

You don't need that anymore. `.run()` tells you what it did:

```js
const result = db.prepare("DELETE FROM notes WHERE id = ?").run(req.params.id);
// result.changes → 1 if a row matched, 0 if none did
```

So `changes === 0` **is** your 404. One statement instead of a search followed by an
operation — and no window between checking and acting.

This is the same `some()`-then-`filter()` duplication you spotted in Lesson 41, dissolved
rather than refactored.

### POST still owns the id

`crypto.randomUUID()` stays exactly where it is. Nothing about the database changes who
decides the id — and now `id TEXT PRIMARY KEY` means the database would reject a duplicate
even if something tried.

Your POST replies with the created note. You already have every field it needs without
asking the database for it — think about why, and don't do a `SELECT` you don't need.

---

## Two things that will catch you

**Rows aren't objects, quite.** `SELECT` gives you `[Object: null prototype] { ... }`.
`res.json()` serialises them perfectly, so this only matters if you're squinting at a
`console.log`.

**`SELECT * FROM notes` has no promised order.** Your array had insertion order for free;
a table does not guarantee anything unless you ask:

```sql
SELECT * FROM notes ORDER BY title;
```

In practice SQLite will hand them back in insertion order here, which makes this exactly
the kind of bug that works fine until it doesn't. Decide what order your list should be in
and say so.

---

## Your goals

**Goal 1 — table at startup, `fs` gone**
Server starts, `notes.db` is created, no `fs` import anywhere. `GET /notes` returns `[]`.

**Goal 2 — GET and POST**
Create notes through the React form. They appear. Restart the server — still there.

**Goal 3 — DELETE with `changes`**
Delete works from the UI. A made-up id still gives 404, via `changes === 0` rather than a
lookup.

**Goal 4 — PUT with `changes`**
Editing works. Unknown id → 404. Empty title → 400, same as before.

**Goal 5 — prove the contract held**
`git diff` the client folder. It should be empty. If you had to touch React, find out
what the server changed about its replies and fix it there.

**Goal 6 — order**
Give `GET /notes` a deliberate `ORDER BY`.

### Stretch (pick one if you have time)

**A — migrate the old data.** `notes.json` is still sitting in the server folder with your
real notes in it. Write a one-off `migrate.js` that reads it and INSERTs each note, then
delete the JSON file. You wrote in Lesson 41 that "a real app would need a migration
script" — this is that.

**B — move the database out of the routes.** A `db.js` that exports `getAllNotes()`,
`addNote()`, `updateNote()`, `deleteNote()`, so `server.js` contains no SQL at all. Same
split as Lesson 28's `storage.js`, and it's how real projects are laid out.

**Skip:** multiple tables, JOINs, users/login, ORMs, hosting.

---

## Two terminals

| Terminal | Folder | Command |
|---|---|---|
| 1 | `day-44-db/server` | `npm install` then `node server.js` |
| 2 | `day-44-db/client` | `npm install` then `npm run dev` |

`notes.db` is gitignored.

---

## Checklist

- [ ] No `fs`, no `saveNotes()`, no module-level `notes` array
- [ ] All four routes run SQL
- [ ] 404 comes from `changes === 0`
- [ ] Every value reaches SQL through `?`
- [ ] The client folder has no changes at all
- [ ] I can explain why the two-writers bug can't happen now

---

## When you're done

1. Lesson 44 in `../progress.md`
2. You changed the entire storage layer and the front end never noticed. What does that
   tell you about where to put a boundary in a program?
3. What can this API still not survive? (Think about what happens to `notes.db` the day
   you want to run this on a real server rather than your laptop.)
