# Lesson 41 — DELETE (the URL can carry data too)

In Lesson 40 the request carried data in its **body**. Today it carries data in its **URL**.

That's the one new idea: **route parameters.** Everything else — the `fetch` options object,
status codes, re-rendering the list — you already wrote last lesson.

---

## Why the body isn't the answer here

To delete a note the server needs one thing: *which one*. You could POST a body with
`{ id: 7 }`, and it would work. But that's not how the web does it, because a note is a
**thing at an address**:

```
GET    /notes        → give me all the notes
POST   /notes        → here's a new note for the collection
DELETE /notes/7      → delete the note at this address
```

`/notes/7` names one specific note. The method says what to do to it. Nothing else is
needed, so there's no body at all.

---

## Route parameters

You don't write a route for `/notes/7` and another for `/notes/8`. You write **one** route
with a placeholder:

```js
app.delete("/notes/:id", (req, res) => {
  console.log(req.params.id);
  // ...
});
```

The `:id` part means "match anything here, and call it `id`". Express puts it in
`req.params`. Request `/notes/7` and `req.params.id` is `"7"`.

Read that last sentence again — **`"7"`, the string.** URLs are text; there are no numbers
in a URL. Your notes have `id: 7`, the number. So this is `false`:

```js
note.id === req.params.id   // 7 === "7"
```

You've been bitten by `===` being strict since Lesson 3. This is the same rule showing up
somewhere new. Convert with `Number(req.params.id)` and compare like with like.

> Predict before you code: if you forget the conversion, what does your route do? Does it
> crash, delete the wrong note, or delete nothing? Then try it and see if you were right.

---

## Removing it from the array

Two honest options, both things you've written before:

```js
notes = notes.filter((note) => note.id !== id);   // Lesson 32, React delete
```

```js
const index = notes.findIndex((note) => note.id === id);
notes.splice(index, 1);                            // Lesson 12, shopping list
```

`filter` is cleaner. One catch: it makes a **new array**, so `notes` has to be `let`
(it is) and you must assign the result back. `splice` mutates in place but you need to
handle `findIndex` returning `-1`.

Either way: change the array, then `saveNotes()`.

---

## Replying to a DELETE

What do you send back? There's no obvious "the thing" to return — you just destroyed it.
Common answers, pick one and know why:

- `res.status(204).end()` — **204 No Content**: "done, and I have nothing to say." No body at all.
- `res.json(deletedNote)` — hand back what you removed.
- `res.json(notes)` — hand back the whole updated list.

And when the id doesn't exist:

```js
res.status(404).json({ error: "no note with that id" });
```

**404 is not an error in your code.** It's a normal, correct answer to a reasonable
question — "delete note 999" → "there is no note 999". You met 404 in Lesson 25 as
something that happened *to* you. Now you're the one sending it.

---

## Client side

The `fetch` options object again, minus the parts you don't need:

```js
await fetch(`${API_URL}/${id}`, { method: "DELETE" });
```

No `headers`, no `body` — there's nothing being sent except the URL and the method. Note
the backticks: the id goes **into the URL** now, which is exactly the difference from POST.

Then refresh the list. You already chose re-fetch over local updates last lesson — your
`load()` is sitting right there, and this is the payoff for having extracted it.

Two things that will trip you if you're quick about it:

- Your Delete button lives inside the `<form>`'s sibling list, but check its `type`
  anyway. Lesson 32 cost you real time on this.
- `onClick={deleteNote(note.id)}` calls it during render. You need
  `onClick={() => deleteNote(note.id)}` — Lesson 32/33 again.

---

## Your goals

**Goal 1 — `DELETE /notes/:id` works**
Test it *before* touching React. From the DevTools console on your Vite page:

```js
fetch("http://localhost:3000/notes/3", { method: "DELETE" })
  .then((r) => console.log(r.status));
```

Check `notes.json` on disk. Note 3 should be gone and the others untouched.

**Goal 2 — a missing id gives 404**
`DELETE /notes/999` → 404, and `notes.json` is unchanged.

**Goal 3 — the button**
A Delete button on every note in the list. Click it, the note disappears, no manual refresh.

**Goal 4 — reproduce your own bug** ← the interesting one

You predicted this at the end of Lesson 40:

> Downside: ids get **reused** after a delete.

Now make it happen. Delete your highest-numbered note, then add a new one through the
form. Watch the id it gets. Then answer: **what actually breaks because of this?** Think
about `key={listItem.id}` in your `.map()`, and think about two browser tabs open at once.

**Goal 5 — fix it**
`crypto.randomUUID()` works in Node with no install. Switch ids over to it and see what
else you have to change. (Your existing `notes.json` has number ids and new ones will be
strings — decide whether you care, and whether `Number()` in your DELETE route still makes
sense afterwards.)

**Skip:** PUT/PATCH, databases, login. Lesson 42.

---

## Two terminals

| Terminal | Folder | Command |
|---|---|---|
| 1 | `day-41-delete/server` | `npm install` then `node server.js` |
| 2 | `day-41-delete/client` | `npm install` then `npm run dev` |

Restart the server after editing `server.js`. React reloads itself.

---

## Checklist

- [ ] I can explain what `:id` does and where the value shows up
- [ ] I know why `req.params.id` needed converting
- [ ] DELETE removes the right note from `notes.json`
- [ ] A bad id gives 404 and changes nothing
- [ ] The button works without a refresh
- [ ] I made the id-reuse bug happen on purpose, and I can say what it breaks

---

## When you're done

1. Lesson 41 in `../progress.md`
2. Why does DELETE put the id in the URL, when POST put its data in the body?
3. `res.status(204).end()` vs `res.json(deletedNote)` — which did you pick, and why?
