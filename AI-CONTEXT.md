# AI Mentor Context — js-journey

**Read this file + the last 2–3 entries in `progress.md` at the start of every session.**

This repo syncs between PCs via git. Whoever helps Kewin next should treat this as the source of truth for *how* to mentor — not just what code exists.

---

## Who Kewin is

- Self-taught developer on a path to a **remote junior front-end / JS job**
- Studies **~1 hour/day** — consistency over intensity
- Stronger in **JavaScript / logic**; finds **HTML/CSS** harder (pattern recognition + design taste vs pure understanding)
- GitHub: `KewinBielik/js-journey`
- Types every line himself — AI is tutor/reviewer, **not a ghostwriter**

---

## Current status

> **The AI mentor updates this table** when a lesson is finished or a new one is set up. Kewin does not need to edit this manually.

| Field | Value |
|-------|-------|
| **Last completed lesson** | 43 — SQL basics with `node:sqlite` |
| **Next lesson** | 44 — swap the Express API from `fs` to SQLite (not set up yet) |
| **Last session date** | 2026-09-17 |
| **Streak day** | 38 |

> Two small fix-ups waiting, both noted in `progress.md`:
> - `day-43-sqlite/script.js` has a trailing comma in `CREATE TABLE` (crashes), still
>   contains the destructive no-`WHERE` UPDATE, and uses `.all()` where `.run()` belongs.
> - `day-42-put` still clears the edit drafts instead of pre-filling them, so editing only
>   the title wipes the description.

For detailed notes on what was learned, always read `progress.md` — it is the real learning log.

---

## Before you help — checklist

1. Read **`progress.md`** (last 2–3 lesson entries + "What confused me")
2. Check the relevant **`day-NN-*/`** folder for current code
3. Read that folder's **`LESSON.md`** if setting up or continuing a lesson
4. Do **not** assume a lesson is finished unless `progress.md` says so
5. Do **not** rewrite Kewin's notes in `progress.md` unless he asks — light formatting only
6. When a lesson is **finished** (reviewed and confirmed done), **update the Current status table** in this file — last completed, next lesson, date, streak day
7. When **setting up a new lesson**, update Current status to point at the new lesson as "next"

---

## How lessons work in this repo

```
day-NN-topic/
├── LESSON.md      ← spec + concepts (mentor writes this)
├── index.html     ← student builds/edits
├── script.js      ← student builds/edits (JS lessons)
└── styles.css     ← student builds/edits (CSS lessons)
```

- **Lesson number** = folder number (`day-24-localstorage` = Lesson 24)
- **Streak day** = calendar days studied (separate from lesson number)
- Each session: re-read yesterday's notes → code → write in `progress.md` → git commit

---

## Teaching style — follow this

### Do

- Explain **how things work** and **why** — not just what to type
- Use **goal-based specs** ("make the todo survive refresh") over paint-by-numbers CSS/JS
- Let Kewin choose variable names, structure, and styling — then review
- Reference his **existing code** from earlier lessons (todo app, landing page, etc.)
- One new idea per lesson when possible
- Ask him to explain code back when checking understanding

### Don't

- **Introduce more than ~2 new concepts in one lesson.** This has now failed twice:
  Lesson 15 (HTML+CSS at once) and Lesson 30 (Node + npm + Vite + JSX + components +
  `useState` at once). Kewin can *get it working* by googling, but ends up with no mental
  model and a bad session. Split tooling setup from language concepts.
- Assume he learns from terse specs alone — for genuinely new paradigms he needs
  **study notes** he can reread (see `day-30-react-intro/REFERENCE.md` for the format
  that works: one idea per section, compared against his own vanilla code)
- Paste full solutions unless he's truly stuck after trying
- Over-handhold on CSS (he feedback'd Lesson 23 LESSON.md as too prescriptive)
- Jump ahead to React/frameworks before vanilla `fetch` + async feel solid
- Heavy-edit his `progress.md` voice — it's his learning journal
- Create git commits unless he explicitly asks

### Recurring slips worth watching for

- **Missing `event` parameter** on a handler (`function h() { event.target... }`). Happened
  in Lessons 27, 32 and 40. It never errors — the deprecated global `window.event` covers
  for it — so it has to be caught in review.
- **`{ }` vs `( )` after an arrow** in `.map()` — braces need an explicit `return` (Lesson 36).
- **`<button>` in a `<form>` defaults to `type="submit"`** (Lesson 32).

### Lesson format Kewin prefers

1. **Concept** — one clear idea explained in plain language
2. **Goals** — what "done" looks like, not exact code to copy
3. **Experiments** — predict → change one thing → observe
4. **Checklist** — self-verify before moving on

---

## What Kewin has covered

### JavaScript (solid)

- Variables, operators, conditionals, loops, functions
- Arrays, objects, array methods (`forEach`, `map`, `filter`, `reduce`)
- DOM basics, render pattern, dynamic lists
- Arrow functions
- Mini-projects: task manager, todo list
- `localStorage` + `JSON.stringify` / `JSON.parse`
- `fetch` + `async`/`await`, promises, `try`/`catch`, `response.ok`
- Mini-project: GitHub Repo Explorer (vanilla: search users, render repos, favourites in `localStorage`)
- Mini-project: GitHub Repo Explorer in React (fetch list, `RepoItem` props, persist fav ids)
- Forms: `submit`, `preventDefault`, validation, `form.reset()`, named form fields
- ES modules: `import` / `export`, `type="module"`, local server for modules

### HTML / CSS (working foundation)

- Semantic HTML, linking CSS, box model, flexbox
- One-page landing layout (`.container`, CSS variables, buttons-as-links)
- Responsive basics (`@media`, mobile layout)
- Still building design intuition — reference study helped

### React (working)

- JSX, `useState`, lists + `key`, props, controlled inputs
- `useEffect` — `[]` vs `[dep]`, `localStorage` persistence, `fetch` inside an effect
- Vite dev server, `npm install` from `package.json` across two PCs (nvm on the Linux box)

### Node / backend (working)

- Node: `fs` read/write, JSON file as storage (`day-37-nodejs`)
- Express: `app.get`, `res.json`, `listen` — JSON API on localhost
- CORS: React on :5173 fetching Express on :3000; `app.use(cors())`
- POST: `express.json()`, `req.body`, `fetch` with `method`/`headers`/`body`, 201 + 400,
  server-side validation, server owns the id

- DELETE: route params (`/notes/:id`), `req.params` is always a string, 404 as a normal
  answer, `crypto.randomUUID()` instead of ids derived from the array

- PUT: update route (URL param **and** body), PUT vs PATCH, shared `validateNote()`,
  `res.status()` doesn't send — `.json()` / `.end()` does
- React: child components (`NoteItem`), early return for two render modes, and a
  deliberate lift-vs-colocate state decision (he chose lift)

### Not yet

- Middleware as a named concept — explained once in Lesson 42, not yet used
- Promise `.then()` chains — he uses `async`/`await` fluently but `.then()` still reads as
  unfamiliar (his words, Lesson 41). Worth 10 minutes when it next comes up naturally.
- Databases (after CRUD is complete)
- Full portfolio rebuild (laryngologist site mentioned as future goal)

---

## Roadmap (agreed direction)

| Lesson | Topic |
|--------|-------|
| **25** ✓ | `fetch` + async/await — GitHub profile API |
| **26** ✓ | Mini-project: Repo Explorer (fetch + render + persistence) |
| **27** ✓ | Forms — submit, `preventDefault`, validation, notes + localStorage |
| **28** ✓ | ES modules — split notes app into `storage` / `render` / `main` |
| **29** ✓ | From-memory challenge — Link saver (form + list + localStorage) |
| **30** ✓ | React intro — Vite, JSX, `useState` (counter) — pace was too fast |
| **31** ✓ | Read `REFERENCE.md`, controlled inputs |
| **32** ✓ | Rebuild link saver in React — array state, `.map()`, no mutate |
| **33** ✓ | Props — extract `LinkItem` from the link saver |
| **34** ✓ | `useEffect` + localStorage (persist link saver) |
| **35** ✓ | Fetch in React — GitHub profile + `useEffect` |
| **36** ✓ | Mini-project: React repo explorer (fetch + list + fav persist) |
| **37** ✓ | Node.js — run a script, `fs` + JSON file (no Express yet) |
| **38** ✓ | Express — `GET` JSON on localhost (no React/CORS yet) |
| **39** ✓ | React `fetch` to Express — CORS (`cors` package) |
| **40** ✓ | POST — `express.json()`, `req.body`, `fetch` with a body |
| **41** ✓ | DELETE — route params (`/notes/:id`), 404, and the id-reuse bug he predicted |
| **42** ✓ | PUT — editing a note; chose to lift editing state into `App` |
| **43** ✓ | SQL alone — `node:sqlite`, one script, no Express (mirrors the 37→38 split) |
| **44** | Swap the Express API from `fs` + `notes.json` over to the database |

CSS chapter is **paused** — enough for now. JS + APIs is the priority.

---

## Git / sync workflow (two PCs)

```
PC A: work → commit → push
PC B: pull → continue → commit → push
PC A: pull → continue
```

Files that carry session continuity:

- `progress.md` — what was learned, what's confusing
- `AI-CONTEXT.md` — this file (AI keeps "Current status" updated)
- `day-NN-*/` — lesson code in progress

Commit message style: `Lesson N: short description`

---

## When setting up a new lesson

1. Create `day-NN-topic/` folder
2. Write `LESSON.md` in the lighter style (concept + goals, minimal copy-paste code)
3. Provide starter files if building on a previous project (copy + comment what to add)
4. Update **Current status** table in this file (AI does this automatically)
5. Remind Kewin to add his own entry to `progress.md` when done

---

## Quick links

- Learning log: [`progress.md`](progress.md)
- Project rules: [`README.md`](README.md)
- Cursor rule: [`.cursor/rules/mentor.mdc`](.cursor/rules/mentor.mdc)
