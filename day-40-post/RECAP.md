# Lesson 40 — Recap after a week off

You wrote all of this. Nothing here is new material — it's a walkthrough of your own
`server/server.js` and `client/src/App.jsx` so you can pick up where you stopped
without re-reading four old lessons.

Read this, then go to **"Where you actually stopped"** at the bottom.

---

## The shape of what you built

Two programs, two terminals, talking over HTTP.

```
  BROWSER  (localhost:5173)              NODE  (localhost:3000)
  ┌──────────────────────────┐           ┌────────────────────────┐
  │  client/src/App.jsx      │  fetch    │  server/server.js      │
  │  React: useState, list   │ ────────► │  Express: routes       │
  │                          │ ◄──────── │  fs: notes.json        │
  └──────────────────────────┘   JSON    └────────────────────────┘
                                                   │
                                              notes.json  ← real file on disk
```

The thing worth holding onto: **the browser no longer owns your data.** In Lessons 24–36
the data lived in `localStorage`, which is per-browser, per-machine. Now it lives in a
file that a server owns, and the browser only ever gets a copy of it.

That's also why there are two terminals. Two separate programs, each has to be running.

---

## Server side — walking your `server.js`

### 1. Imports and the app object

```js
import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
```

`fs` is the same module from Lesson 37 — read and write files from Node. `express` is the
web server. `app` is the object you hang routes on.

### 2. The middleware — the two `app.use` lines

```js
app.use(cors());
app.use(express.json());
```

These run on **every** incoming request, before your routes. That's what `app.use` means:
"for all requests, do this first."

- `cors()` — from Lesson 39. Adds a header saying "browsers may let pages from other
  origins read my replies." Remember the direction: the **browser** does the blocking,
  the **server** does the allowing. Nothing in React fixes CORS.
- `express.json()` — **this is Lesson 40's line.** A request body arrives as a raw string.
  This reads it and parses it into a real JS object on `req.body`. Without this line
  `req.body` is `undefined`.

Both must sit **above** your routes, or they never run for them.

> The TODO comment in your file above `express.json()` is stale — you already did Goal 1.
> Delete it when you're next in there.

### 3. Loading the file once, at startup

```js
let notes = [];

try {
  const raw = fs.readFileSync("notes.json", "utf8");
  notes = JSON.parse(raw);
} catch (error) {
  console.log("no notes.json (or bad JSON) — using []");
  notes = [];
}
```

Reads the file **once**, when the server boots. After that, `notes` is the live array in
memory and everything works against that. The `try`/`catch` is the `ENOENT` lesson from
Lesson 37: first run there's no file, and you want the server to start anyway instead of
crashing.

`JSON.parse` here, `JSON.stringify` on the way out — the same round trip as
`localStorage`, just with a file instead of the browser.

### 4. Saving

```js
function saveNotes() {
  fs.writeFileSync("notes.json", JSON.stringify(notes, null, 2));
}
```

`null, 2` pretty-prints so the file is readable when you open it. Note that
`writeFileSync` **overwrites** the whole file every time — there's no "append one note."
You mutate the `notes` array first, then dump the whole thing.

Also: the path `"notes.json"` is relative to **the folder you ran `node` from**, not to
where `server.js` lives. That's what bit you in Lesson 38. Always `cd` into
`day-40-post/server` before `node server.js`.

### 5. The GET route

```js
app.get("/notes", (req, res) => {
  res.json(notes);
});
```

"When someone GETs `/notes`, send them the array as JSON." `res.json()` does the
`stringify` and sets the `Content-Type` header for you.

### 6. The POST route — the new one

```js
app.post("/notes", (req, res) => {
  if (!req.body.title.trim()) {
    res.status(400).json("Bad input, title empty or missing");
    return;
  }
  const nextId = notes.length ? Math.max(...notes.map((n) => n.id)) + 1 : 1;
  const newNote = { id: nextId, title: req.body.title, description: req.body.description };
  notes.push(newNote);
  saveNotes();
  res.status(201).json(newNote);
});
```

Same path as the GET, different **method** — that's why they don't collide. `app.get` and
`app.post` are two different doors with the same street address.

Four things happen, in order:

1. **Validate.** Bad input gets a 400 and `return` — the `return` matters, without it the
   function keeps going and tries to send a second reply.
2. **Pick the id.** The *server* decides, never the client. Two browsers posting at once
   would both invent id 7.
3. **Mutate + save.** `push` into the in-memory array, then write the whole file.
4. **Reply 201 with the created note** — so the client learns the id it didn't choose.

Status codes as sentences: **201** "created it", **400** "your request was wrong",
**500** "I broke".

### Your own open question from last time

You noted that deriving `nextId` from `Math.max(...)` means ids get **reused after a
delete**. Correct, and it doesn't matter yet because there's no DELETE route. When you add
one you'll want either a stored counter or `crypto.randomUUID()`.

### One thing to actually test tomorrow

Your guard is `!req.body.title.trim()`. That handles `title: ""`. Trace it by hand for a
body with **no `title` key at all**:

- what is `req.body.title`?
- what does calling `.trim()` on that do?
- does the client get a 400, or something else?

Then POST `{"description": "no title here"}` from the console and see whether you were
right. Watch the server terminal, not just the browser.

---

## Client side — walking your `App.jsx`

### State

```js
const [list, setList] = useState([]);
const [status, setStatus] = useState(defaultStatus);
```

`list` is the notes from the API. `status` is your loading/error message — the React
version of the `Loading...` text from Lesson 25.

`useState([])` starting as an empty array is deliberate: `list.map(...)` on the very first
render has to work before any data has arrived. An empty array maps to zero `<li>`s.
`null` would crash.

### The load effect

```js
useEffect(() => {
  async function load() {
    try {
      setStatus("Loading...");
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(response.status);
      const data = await response.json();
      setList(data);
      setStatus("Loading successful");
    } catch (error) {
      console.log(error);
      setStatus("loading error");
    }
  }
  load();
}, []);
```

Three details you worked out the hard way:

- **The effect callback can't be `async`.** So you declare `async function load()` inside
  and call it. (Lesson 35.)
- **`[]` means "after the first paint, once."** Not a loop. A loop would be `[list]` as
  the dependency *and* `setList` inside. (Lesson 39 — this is the one you thought would
  loop forever.)
- **Two awaits, two different things.** `await fetch(...)` gives the *response* (status,
  headers). `await response.json()` gives the *data*. And `fetch` only rejects on network
  failure, so you check `response.ok` yourself and `throw`. (Lesson 25.)

### Rendering

```jsx
{list.map((listItem) => (
  <li key={listItem.id}>
    <p>{listItem.title}</p>
    <p className="hint">{listItem.description}</p>
  </li>
))}
```

`( )` after the arrow, not `{ }` — parens return the JSX, braces would need an explicit
`return`. That's the Lesson 36 trap.

`key={listItem.id}` — you upgraded this from Lesson 39, which keyed on `title`. Better,
because your `notes.json` currently has four notes titled `"from console"` and duplicate
keys confuse React.

---

## What GET needs vs what POST needs

This is the question the lesson leaves you with, and it's the core of the whole day.

```js
// GET — one argument. "Give me what's at this URL."
await fetch(API_URL);

// POST — second argument, because now you're handing something over.
await fetch(API_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(newNote),
});
```

Each option has exactly one job:

| Option | Why it's there |
|---|---|
| `method` | Without it `fetch` sends GET, and your `app.post` route never runs |
| `headers` | Declares the body is JSON — this is what makes `express.json()` parse it |
| `body` | The actual payload, as a **string**, so `JSON.stringify` again |

GET needs none of them because a GET carries nothing. There's no body to describe.

---

## Where you actually stopped

Goals 1–3 are **done** (server reads bodies, POST works, empty title rejected — you
confirmed it by POSTing from the DevTools console and watching `notes.json` grow to 6
notes).

Left to do:

- **Goal 4 — the form.** The two TODO comments in `App.jsx`. Title + description inputs,
  submit with `preventDefault`, POST it, clear the fields, and the new note shows up in
  the list without a manual refresh.
- **Goal 5 — prove it persisted.** Refresh the page: still there. Then stop the server
  with `Ctrl+C`, start it again, refresh: still there. Because it's in a file, not memory.

### For Goal 4, everything you need you've already done once

- Controlled inputs — `value={...}` + `onChange` (Lesson 31)
- A form with `submit` and `event.preventDefault()` (Lesson 27, and Lesson 32 in React)
- Adding to a state array without mutating — `setList([...list, created])` (Lesson 32/34)
- The POST `fetch` — the table above

One decision to make on purpose rather than by accident: after a successful POST, do you
(a) take the created note out of the response and append it, or (b) re-fetch the whole
list from the API? Both are fine. Know why you picked yours.

And one trap from Lesson 32 that will absolutely happen again: a `<button>` inside a
`<form>` is `type="submit"` by default.

---

## Getting running on this PC

Node was not installed here. Once it is:

```bash
# terminal 1 — the API
cd ~/Projects/js-journey/day-40-post/server
npm install
node server.js          # → "API: http://localhost:3000/notes"

# terminal 2 — React
cd ~/Projects/js-journey/day-40-post/client
npm install
npm run dev             # → http://localhost:5173
```

`npm install` with no package name reads `package.json` and installs what's listed —
that's why `node_modules` being gitignored is fine when you switch machines.

Restart the server by hand after editing `server.js`. React reloads itself.

**First check before writing any code:** open `http://localhost:3000/notes` in the
browser. Six notes as JSON means the server half still works and you can go straight to
the form.
