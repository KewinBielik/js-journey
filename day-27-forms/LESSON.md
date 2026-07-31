# Lesson 27 — Forms (submit, validation, save)

You've used a single text input + a button click (todo app, repo explorer). Real apps usually use a **`<form>`**.

Today you build a small **notes** app: title + category + body → list of notes → survive refresh.

Reuses things you already know: render pattern, `localStorage`, guard clauses. Looking at Lesson 12 / 24 while you work is fine.

---

## The one idea: forms fire `submit`

A `<form>` has a special event: **`submit`**.

It fires when:
- the user clicks a `type="submit"` button, **or**
- the user presses **Enter** inside a text field

That's why forms beat "button click only" — keyboard users get the same behavior for free.

There's a catch: the browser's default submit behavior is to **reload the page** (old-school HTML form posting). For a JavaScript app you don't want that. You stop it with:

```js
event.preventDefault();
```

Listen on the **form**, not only on the button:

```js
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // read inputs, validate, update data, render
});
```

---

## Your goals

**Goal 1 — Submit without a page reload**

Wire up `#noteForm` so submitting runs your code and the page does **not** refresh. Prove it with a `console.log` of the three field values.

**Goal 2 — Validate before adding**

Don't add a note unless:
- title is not empty (trim spaces — `"   "` should count as empty)
- category is chosen (not the blank "Choose one…" option)
- body is not empty

If validation fails, show a clear message in `#formError`. If it passes, clear that message.

You decide the exact wording and whether to check fields one-by-one or all at once.

**Goal 3 — Add + render**

Store notes in an array of objects. Each note needs at least: title, category, body, and some kind of `id` (same idea as the todo app).

Write a `render()` that draws the list into `#notesList`. After a successful add: push the note, clear the form fields, render.

**Goal 4 — Persist**

Save notes to `localStorage`. Load them on startup. Same round-trip as Lesson 24 (`JSON.stringify` / `JSON.parse` + `null` check).

**Goal 5 — Delete**

Each note gets a delete button. Remove from the array, save, re-render. You already know this pattern.

---

## Things to think through

- `.value` on a `<select>` is the chosen `option`'s `value` attribute — look at the HTML if that surprises you.
- Trimming: `titleInput.value.trim()` — useful so spaces-only titles fail validation.
- After a successful submit, clearing the form: you can set each `.value` to `""`, or look up `form.reset()` and try it.
- Where's the best place to save? Same question as Lesson 24 / 26.

---

## What you don't need yet

- Sending the form to a real server
- Fancy password rules or email regex
- Libraries

---

## Checklist

- [ ] Enter in the title field submits the form (and does not reload the page)
- [ ] Invalid submit shows an error and does **not** add a note
- [ ] Valid submit adds a note, clears the form, updates the list
- [ ] Notes survive a refresh
- [ ] Delete works and stays deleted after refresh

---

## When you're done

1. Add Lesson 27 to `../progress.md`
2. In your own words: why listen for `submit` on the form instead of `click` on the button?
3. What does `preventDefault()` stop in this lesson?
