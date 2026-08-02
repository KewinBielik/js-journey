# Lesson 28 — ES modules (splitting an app into files)

Same notes app as Lesson 27. New skill: **put code in separate files** and connect them with `import` / `export`.

This is how real projects are organized — and how React projects start (many files, one entry point).

You may look at `../day-27-forms/script.js` while you work. Goal is to **move and connect** that logic, not invent a new app.

---

## The one idea: export and import

Until now, one `<script src="script.js">` meant **one big file** sharing one global scope.

With modules, each file is its own box. Nothing leaks out unless you **export** it. Other files only see what they **import**.

```js
// storage.js
export function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

export function loadNotes() {
  // ...
}
```

```js
// main.js
import { saveNotes, loadNotes } from "./storage.js";

const notes = loadNotes();
```

Rules that matter today:

- The path needs `./` (same folder) and usually the `.js` ending
- Curly braces `{ saveNotes }` mean a **named** export — the name must match
- HTML must load the entry file as a module:

```html
<script type="module" src="main.js"></script>
```

(`index.html` already has this.)

---

## Important: open via a local server

Modules often **fail** if you double-click the HTML file (`file://...`). The browser blocks loading other `.js` files that way.

Use a tiny local server, for example in Cursor/VS Code:

- Install/use the **Live Server** extension → “Open with Live Server”, **or**
- In the `day-28-modules` folder, run: `npx --yes serve .`

Then open the URL it gives you (something like `http://localhost:3000`).

If the console says something about CORS / failed to load module — you’re still on `file://`. Switch to the server.

---

## Suggested file jobs

| File | Responsibility |
|------|----------------|
| `storage.js` | Talk to `localStorage` — load/save notes, load/save `nextId` |
| `render.js` | Build the DOM list (and call save when data changes, if that’s how you structure it) |
| `main.js` | Grab the form, listen for `submit`, validate, start the app on load |

You decide exactly what each file exports. The table is a guide, not a law.

One design question you’ll hit: **where does the `notes` array live?** Options people use:

- Keep `notes` (and `nextId`) in `storage.js` and export helpers that read/update them
- Keep them in `main.js` and pass them into `render(notes)` / save functions

Either is fine. Pick one and stay consistent.

---

## Your goals

**Goal 1 — Prove modules load**

With the local server running, open the page. You should see the `console.log` from `main.js`. If you don’t, fix the server / `type="module"` setup before writing more.

**Goal 2 — Move storage out**

Put load/save logic in `storage.js`. Export what `main` / `render` need. Import it where you use it. App doesn’t have to be fully working yet — but nothing should crash on load.

**Goal 3 — Move render out**

`render` lives in `render.js`. It must be able to draw notes and wire delete. Import whatever it needs.

**Goal 4 — Wire the form in `main.js`**

Submit, validate, add note, reset form, call render — same behavior as Lesson 27. Entry point is `main.js` only (HTML should not load three script tags).

**Goal 5 — Same checklist as Lesson 27**

Add / validate / delete / survive refresh. If it worked in Lesson 27, it should still work — just in three files.

---

## Things to think through

- Circular imports (`A` imports `B` and `B` imports `A`) get messy. If render needs to save, either import save from storage into render, or have render call a callback / have main own the flow. Prefer a one-way flow: `main` → `render` / `storage`.
- After delete, something must still call `render()` and save. Same as before — just maybe across files.
- You can export more than functions: `export let notes = []` works, but mutating shared state across files can get confusing. Functions are often clearer.

---

## Checklist

- [ ] Page runs over `http://localhost...`, not `file://`
- [ ] Only `main.js` is loaded from HTML (`type="module"`)
- [ ] Logic is split across at least `storage.js`, `render.js`, `main.js`
- [ ] Each shared function is `export`ed and `import`ed (no copy-paste of the same function into two files)
- [ ] Notes app still behaves like Lesson 27

---

## When you're done

1. Add Lesson 28 to `../progress.md`
2. In your own words: what problem do modules solve?
3. Why does the script tag need `type="module"`?
