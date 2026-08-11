# Lesson 29 — From-memory challenge: Link saver

No new syntax today. The point is to **rebuild something you already know** without leaning on old folders first.

You said Lesson 26 felt like you remembered almost nothing. That’s normal. This lesson is practice for *recall* — the skill that makes knowledge stick.

---

## The challenge rules

1. Read this spec once.
2. Write the app in `script.js` (or split into modules if you want — optional).
3. **Don’t open** `day-12` … `day-28` until you’re stuck for a few minutes.
4. If you’re stuck: peek at **one** old file, close it, then write from what you remember. Don’t copy-paste whole functions.

Looking things up on MDN or using the browser console is fine. Peeking at *your* old projects is the thing to delay.

---

## What you’re building

A **link saver**:

- Form: title + URL
- On submit: validate → add to a list → clear the form
- Each item: clickable link (opens in a new tab) + Delete button
- Survive refresh (`localStorage`)

The HTML/CSS are already done. Ids: `linkForm`, `formError`, `linkList`. Fields use `name="title"` and `name="url"`.

---

## Spec (done means all of these)

- [ ] `submit` on the form + `preventDefault` (Enter in a field works, page doesn’t reload)
- [ ] Empty title or empty URL → error message, nothing added
- [ ] Valid submit → item appears in the list
- [ ] Link uses the URL, shows the title, `target="_blank"` + `rel="noopener"`
- [ ] Delete removes the item and updates the page
- [ ] Links (and deletes) survive a refresh

That’s it. No categories, no fetch, no favourites — keep it small.

---

## Optional stretch (only if the main spec feels easy)

- Split into modules (`storage` / `render` / `main`) like Lesson 28  
- Trim whitespace on title/URL before validating  
- Reject URLs that don’t start with `http://` or `https://`

---

## When you’re done

1. Be honest in `../progress.md`: how often did you peek? What did you forget first?
2. In your own words: what pattern do almost all your list apps share?

Then ping me for a quick review.
