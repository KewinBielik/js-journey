# Lesson 43 — SQL, on its own

Your API is finished. The thing underneath it isn't: `notes.json` plus `fs`.

This lesson is **only the database**. No Express, no React, no browser — one script you run
in the terminal, exactly like Lesson 37. Lesson 44 swaps the real API over to it.

That split is deliberate. Lesson 30 tried to teach tooling and a language at the same time
and it went badly. SQL *is* a second language, so it gets a lesson to itself.

---

## What actually changes

You already know the shape of the data. Here it is in both worlds:

| Your JSON | A database |
|---|---|
| the `notes` array | a **table** called `notes` |
| one note object | a **row** |
| `title`, `description` keys | **columns**, fixed for every row |
| any note can have any keys | the **schema** decides, up front |

The big one is the last row of that table. Your JSON array would happily accept
`{ id, title, colour: "blue" }`. A table won't — you declare the columns once and every
row has exactly those.

That sounds like a restriction. It's the feature. The structure stops being something you
remember to enforce and starts being something that can't be violated.

### The line that disappears

```js
function saveNotes() {
  fs.writeFileSync("notes.json", JSON.stringify(notes, null, 2));
}
```

This function does not exist in a database world. There is no "now write everything back".
You tell the database *what changed* and it deals with the file.

That's the fix for the bug you identified at the end of Lesson 42: two requests can no
longer read the whole array, each edit their own copy, and both write — because nobody
ever writes the whole array.

---

## SQLite and `node:sqlite`

SQLite is a real SQL database that lives in **one file**, with no server to run and nothing
to install. That makes it the honest next step from `notes.json`: same idea, a file on
disk, but now something competent manages the writes.

Node has it built in since 22.5 (you're on 24), so there's no `npm install` today.

```js
import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("notes.db");
```

Four methods are all you need:

```js
db.exec(sql);                        // run SQL, ignore any result (table creation)
db.prepare(sql).run(...values);      // INSERT / UPDATE / DELETE
db.prepare(sql).get(...values);      // SELECT → the first row, or undefined
db.prepare(sql).all(...values);      // SELECT → an array of rows
```

`get` and `all` map onto things you already reach for: `get` is your `.find()`, `all` is
the whole array.

> It's synchronous — `db.prepare(...).all()` returns rows directly, no `await`. That
> matches `readFileSync` from Lesson 37. Don't add `async` out of habit.

---

## The SQL itself

You know these four operations cold. This is just their other name.

### Creating the table — once, at startup

```sql
CREATE TABLE IF NOT EXISTS notes (
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT
);
```

`IF NOT EXISTS` is what makes it safe to run on every start — the same job as the
`try`/`catch` around `readFileSync` in Lesson 37, done properly.

Read those three columns again, because **two of them are doing work you wrote by hand**:

- `PRIMARY KEY` — this id must be unique. The database will refuse a duplicate. That's the
  Lesson 41 id-reuse bug, made structurally impossible instead of merely avoided.
- `NOT NULL` on the title — a note without a title cannot be stored. That's half of your
  `validateNote()`, enforced one layer deeper, where no route can forget it.

Schema design is partly about deciding which of your rules are important enough to be
impossible to break.

> `description` has no `NOT NULL`, so it's optional. That's a real answer to the question
> you were left with on Tuesday — but it's *your* call. Decide, then write the schema to
> match.

### The other four

```sql
INSERT INTO notes (id, title, description) VALUES (?, ?, ?);

SELECT * FROM notes;
SELECT * FROM notes WHERE id = ?;

UPDATE notes SET title = ?, description = ? WHERE id = ?;

DELETE FROM notes WHERE id = ?;
```

Line them up against what you wrote in Lessons 40–42:

| Your code | SQL |
|---|---|
| `notes.push(newNote)` | `INSERT` |
| `notes` | `SELECT *` |
| `notes.find((n) => n.id === id)` | `SELECT * FROM notes WHERE id = ?` |
| `targetNote.title = "x"` | `UPDATE ... SET title = ? WHERE id = ?` |
| `notes.filter((n) => n.id !== id)` | `DELETE FROM notes WHERE id = ?` |
| `saveNotes()` | — nothing — |

**Forget the `WHERE` on an UPDATE or DELETE and it hits every row.** It's valid SQL and the
database will do it without complaint. This is the SQL equivalent of your Lesson 12 note
about `delete items[index]` — a thing that runs fine and destroys your data.

---

## The `?` is not optional

```js
// Do this
db.prepare("SELECT * FROM notes WHERE title = ?").all(userInput);

// Never this
db.prepare(`SELECT * FROM notes WHERE title = '${userInput}'`).all();
```

In the second version the user's text becomes *part of the query*. Feed it
`x' OR '1'='1` and the condition is always true; feed it something worse and you're
running commands you never wrote. This is **SQL injection**, and it's still one of the
most common ways real applications get broken into.

With `?`, the value is handed over separately from the query. It can never be read as SQL,
no matter what's in it.

Same instinct as "don't trust the client" from Lesson 40 — you already have this reflex,
it just needs a new place to fire.

---

## Your goals

Build up `script.js` one step at a time, running `node script.js` after each.

**Goal 1 — the table**
Create it with `IF NOT EXISTS`. Run the script twice; the second run must not error.
`notes.db` appears on disk. (It's gitignored — a binary file, not something to commit.)

**Goal 2 — insert**
Add a note with a `crypto.randomUUID()` id, using `?` placeholders.

**Goal 3 — read it back**
`SELECT` the notes and log them. Then run the whole script a few times and watch the rows
pile up — note that you never read the file, edited an array, and wrote it back.

> Rows log as `[Object: null prototype] { ... }`. That's normal and harmless — they're
> plain data without the usual `Object` prototype. `JSON.stringify` and `res.json()` treat
> them exactly like objects.

**Goal 4 — update one**
Copy an id out of your output and `UPDATE` just that row. Confirm the others are untouched.

**Goal 5 — delete one**
Same, with `DELETE`. Confirm the count drops by exactly one.

**Goal 6 — the experiment**
Deliberately run an `UPDATE` with **no `WHERE`**. Look at what happened to every row. Then
delete `notes.db` and start over — this is exactly why you're practising on a throwaway
script and not on your API.

**Skip:** JOINs, multiple tables, foreign keys, indexes, transactions, ORMs. All real,
none of it today.

---

## Checklist

- [ ] I can say what a table, a row, a column and a schema are
- [ ] I know why `saveNotes()` has no equivalent here
- [ ] All five statements work from my script
- [ ] I can explain what `?` prevents, and what happens without it
- [ ] I saw what a missing `WHERE` does
- [ ] I know which of my hand-written rules the schema now enforces for me

---

## When you're done

1. Lesson 43 in `../progress.md`
2. Which parts of `validateNote()` could the schema take over, and which ones must stay in
   your code?
3. Your `GET /notes` currently returns the whole array. With SQL, what could it do instead
   once there are 10,000 notes?
