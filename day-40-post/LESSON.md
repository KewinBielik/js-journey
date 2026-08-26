# Lesson 40 — POST (requests can carry data)

Everything you've fetched so far only **asked** for data: GitHub, then your own `/notes`. Today the request **carries something with it**.

That's the one idea: **a request can have a body.** Both halves of this lesson are that same idea — the server learns to read a body, the client learns to send one.

---

## GET vs POST

| | What it means | Body? |
|---|---|---|
| `GET /notes` | "give me the notes" | no |
| `POST /notes` | "here is a new note, add it" | **yes** |

Same URL, different **method**. The method is how the server knows which of your functions to run — `app.get(...)` vs `app.post(...)` can both be `/notes` and they don't collide.

---

## Server side

### The gotcha that catches everyone

Express does **not** read JSON bodies unless you tell it to:

```js
app.use(express.json());
```

Without that line, `req.body` is `undefined` and you'll stare at it for twenty minutes. Put it near `app.use(cors())`, **above** your routes.

### The route

```js
app.post("/notes", (req, res) => {
  console.log(req.body);   // whatever the client sent
  // ...build the note, add it to the array, save the file
  res.status(201).json(newNote);
});
```

- `req.body` — the parsed JSON the client sent
- `res.status(201)` — 201 means "created" (200 works too; 201 is the honest one for POST)
- Send the created note back so the client knows what it got (including the `id` **the server** picked)

**The server owns the id.** The client shouldn't invent it — two browsers could pick the same number. Same reasoning as `nextId` in Lesson 24, just moved to the server.

**Don't trust the client.** If `title` is missing or empty, reply with an error instead of saving junk:

```js
res.status(400).json({ error: "title is required" });
```

400 = "your request was bad." You did this validation in Lesson 27; it belongs on the server too, because anyone can call your API without your form.

---

## Client side

`fetch` takes a **second argument** — an options object. You've only used the one-argument version so far:

```js
await fetch(API_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(newNote),
});
```

Three parts, each doing one job:

- `method` — without it, `fetch` sends GET
- `headers` — tells the server "this body is JSON" (this is what makes `express.json()` parse it)
- `body` — a **string**, so `JSON.stringify` again. Same round-trip as `localStorage`.

Then update `list` so the page shows it. Two ways, both fine:

- take the note from the response and add it (`setList([...list, created])`)
- or just re-fetch the whole list

Pick one deliberately.

---

## Test the server before touching React

If you wire both halves at once and it breaks, you won't know which half. So test the API alone first — open **`http://localhost:3000/notes`** (or your Vite app at `localhost:5173`), press `F12`, and in the **Console** run:

```js
fetch("http://localhost:3000/notes", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "from console", description: "test" }),
}).then((r) => r.json()).then(console.log);
```

If that logs your new note and `notes.json` grows, the server is done. Then go build the form.

> It has to be a real `http://` page. A blank new tab is a `chrome://` internal page, and Chrome's **Content Security Policy** forbids it from connecting anywhere outside `chrome://` — you'd get "Refused to connect" no matter how correct your server is. That's CSP (*this page* may only talk to X), not CORS (*this server* may be talked to by X).

---

## Two terminals

| Terminal | Folder | Command |
|---|---|---|
| 1 | `day-40-post/server` | `npm install express cors` then `node server.js` |
| 2 | `day-40-post/client` | `npm install` then `npm run dev` |

Restart the server after editing `server.js`. React reloads itself.

---

## Your goals

**Goal 1 — `express.json()`**
Add it. Then in your POST route `console.log(req.body)` and confirm you see an object, not `undefined`.

**Goal 2 — `POST /notes` works**
Server builds the note (its own `id`), pushes it, calls `saveNotes()`, sends it back. Test from the DevTools console as above. Check `notes.json` on disk.

**Goal 3 — Reject bad input**
Empty or missing `title` → status 400 + a message. Nothing saved.

**Goal 4 — The form**
In React: title + description, submit + `preventDefault` (Lesson 27), POST it, clear the fields, and make the new note appear in the list without a manual refresh.

**Goal 5 — Prove it persisted**
Refresh the page. Still there. Stop the server, start it again. Still there — because it's in the file, not in memory.

**Skip:** DELETE, PUT, databases, login. Later.

---

## Checklist

- [ ] I can say what `express.json()` does
- [ ] `req.body` logs a real object
- [ ] POST from the console adds a line to `notes.json`
- [ ] Empty title is rejected by the **server**
- [ ] The React form adds a note and the list updates
- [ ] Data survives a server restart

---

## When you're done

1. Lesson 40 in `../progress.md`
2. Why does `fetch` need `method`, `headers` and `body` here, when GET needed none of them?
3. Why should the **server** decide the `id`?
