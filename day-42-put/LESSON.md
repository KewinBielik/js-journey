# Lesson 42 — PUT (the last letter of CRUD)

You can Create, Read and Delete. Today: **Update**. After this your API is complete and
you've built every operation a real backend does.

The server half is genuinely small — it's Lesson 40's body plus Lesson 41's URL parameter,
combined. **The interesting half is React**, and it's one real new idea: *where should a
piece of state live?*

---

## Server side

### The route

```js
app.put("/notes/:id", (req, res) => {
  // id  → req.params.id   (Lesson 41)
  // new values → req.body (Lesson 40)
});
```

That's it, conceptually. Update is just "find it, change it, save it."

### PUT vs PATCH — the honest version

Two methods exist for updating, and the difference is **replace** vs **merge**:

| | Means | Body |
|---|---|---|
| `PUT /notes/7` | "make note 7 look exactly like this" | the **whole** note |
| `PATCH /notes/7` | "change just these fields" | only what changed |

With PUT, anything missing from the body is supposed to be *erased*. With PATCH, anything
missing is *left alone*.

Use **PUT** today — your form always sends both fields anyway, so there's nothing partial
about it. But know the distinction, because "I sent only the title and the description got
wiped" is a classic real bug, and now you know which method causes it.

> Experiment once it works: PUT a body with only `{ "title": "x" }` from the console.
> What happens to the description? Is that what a strict PUT *should* do? Is it what your
> code does?

### Finding and changing

`filter` removed a note last lesson. Now you need to reach *into* one. Options you know:

```js
const note = notes.find((n) => n.id === req.params.id);
note.title = req.body.title;        // objects are references — this edits the array's note
```

```js
const i = notes.findIndex((n) => n.id === req.params.id);
notes[i] = { ...notes[i], ...req.body, id: notes[i].id };
```

The first works because of something from Lesson 28: `find` hands you a **reference** to
the object that's in the array, not a copy. Mutating it mutates the array's note. (Your
note from that lesson: *"if an array is passed and we call its function then it will
operate on the original variable."* Same rule.)

The second builds a replacement. Note the `id:` at the end — think about why it's there,
and what a malicious client could do by including `"id"` in the body if it weren't.

Either way: **the client must not be able to change the id.** Same principle as Lesson 40,
where you decided the server owns the id.

### Validation is now written twice

Your POST route validates the body. PUT needs the identical check. You've hit this shape
three times now — the duplicated `load()` in Lesson 40, `some`+`filter` in Lesson 41, and
now this.

Pull it into a function. Something like `validateNote(body)` returning an error string or
`null`, used by both routes. This is the point of Lesson 28's module thinking, applied
inside one file.

---

## Client side — the actual lesson

To edit a note in place you need a row that can be in one of two modes:

```
  reading:   Tool - Pneuma    Progressive Metal    [Edit] [Delete]
  editing:   [Tool - Pneuma ] [Progressive Metal ] [Save] [Cancel]
```

So something has to remember *which* row is being edited, and *what's been typed so far*.
That's new state. The question is **where it goes**, and there are two defensible answers.

### Option A — keep it in `App`

```js
const [editingId, setEditingId] = useState(null);
const [draftTitle, setDraftTitle] = useState("");
const [draftDesc, setDraftDesc] = useState("");
```

A row renders as inputs when `note.id === editingId`. `null` means nobody's editing.

- Only one note can be edited at a time (which is probably what you want).
- All the state is in one place, same as `list` and `status`.
- `App` grows; `NoteItem` needs several more props.

### Option B — each `NoteItem` owns its own

```js
function NoteItem(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(props.title);
  // ...
}
```

- `App` doesn't grow at all; each row minds its own business.
- Several rows can be in edit mode at once — feature or bug, you decide.
- New: a **child component with its own state**. Until now your components have been
  `LinkItem`-style — props in, JSX out, no memory.

**Pick one on purpose and write down why.** This choice — lift state up vs keep it local —
is one of the things React interviews actually ask about. There's no universal right
answer; there's a right answer *for what you want the UI to do*.

> Hint if you're torn: what should happen to a half-typed edit if you click Edit on a
> different note? Your answer tells you which option you want.

### The PUT from React

```js
await fetch(`${API_URL}/${id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title, description }),
});
```

Both halves at once: the id in the URL like DELETE, the data in the body like POST. Then
`load()`, as usual.

### Where the Lesson 41 bug would have bitten

Remember the two-tab experiment. Now that rows hold their own state, a `key` collision
wouldn't just show the wrong text — it would leave you typing into one note and saving
onto another, because React would keep the component (and its half-typed draft) alive
while swapping the underlying note.

Your UUIDs already make that impossible. Worth noticing that you fixed this bug *before*
writing the code that would have suffered from it.

---

## Your goals

**Goal 1 — `PUT /notes/:id` works**
Test from the console before touching React:

```js
fetch("http://localhost:3000/notes/PASTE-A-REAL-UUID", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "edited", description: "edited too" }),
}).then((r) => r.json()).then(console.log);
```

Check `notes.json`. The note changed, its **id did not**, and no other note moved.

**Goal 2 — the edge cases**
- Unknown id → 404.
- Empty title → 400, nothing saved.
- Validation logic written **once** and shared with POST.

**Goal 3 — extract `NoteItem`**
Move the `<li>` into its own component file, like `LinkItem` in Lesson 33. Do this
*before* adding edit mode — a clean move with no behaviour change. Confirm the app still
works exactly as before.

**Goal 4 — edit mode in the UI**
Edit button → inputs + Save + Cancel. Cancel restores the original text and changes
nothing on the server.

**Goal 5 — wire up the PUT**
Save sends the change, the list refreshes, the row returns to reading mode.

**Goal 6 — write down your state decision**
One or two lines in `progress.md`: A or B, and why. This is the part of today worth
remembering.

**Skip:** databases, login, search/filter. Your API is complete after this — a database is
the next real step.

---

## Two terminals

| Terminal | Folder | Command |
|---|---|---|
| 1 | `day-42-put/server` | `npm install` then `node server.js` |
| 2 | `day-42-put/client` | `npm install` then `npm run dev` |

---

## Checklist

- [ ] I can explain PUT vs PATCH in one sentence
- [ ] PUT changes a note without changing its id
- [ ] A client can't overwrite the id by putting one in the body
- [ ] Validation exists in exactly one place
- [ ] `NoteItem` is its own component
- [ ] Edit → Save updates the server; Edit → Cancel doesn't
- [ ] I can say why I put the editing state where I put it

---

## When you're done

1. Lesson 42 in `../progress.md`
2. Why does PUT need both a URL parameter *and* a body, when DELETE needed only the URL
   and POST needed only the body?
3. Your app now does all four of CRUD. What's the strongest argument for replacing
   `notes.json` with a database?
