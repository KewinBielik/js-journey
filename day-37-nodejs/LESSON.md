# Lesson 37 — Node.js (JS on your computer)

React chapter pause. You already **run** Node every time you `npm run dev`. Today Node runs **your** file — no browser, no React, no Vite.

One new idea.

---

## The one idea

**The browser runs JS on a webpage. Node runs JS on your machine.**

No `document`, no `window`, no `localStorage`. Instead you get things the browser is not allowed to do, like **read and write files**.

Run a file:

```powershell
cd C:\Users\kewin\Desktop\js-journey\day-37-nodejs
node script.js
```

Output goes to the **terminal**, not a webpage. Change the file, run `node script.js` again (no Live Server).

---

## Disk instead of `localStorage`

Same JSON round-trip as Lesson 24. Different box:

| Browser | Node |
|---------|------|
| `localStorage.setItem("notes", JSON.stringify(notes))` | write a file |
| `localStorage.getItem("notes")` | read that file |

Node’s built-in **`fs`** (filesystem) module:

```js
import fs from "fs";

fs.writeFileSync("notes.json", JSON.stringify(notes, null, 2));
const raw = fs.readFileSync("notes.json", "utf8");
const notes = JSON.parse(raw);
```

- `"utf8"` = read as text, not a binary blob  
- `null, 2` in `stringify` = pretty-print so you can open `notes.json` and read it  
- If the file doesn’t exist, `readFileSync` **throws** — same family as fetch failing. Use `fs.existsSync("notes.json")` or `try` / `catch`.

This file is **`type: "module"`** (see `package.json`) so `import` works like in the browser. If you used `require`, that’s the older style — skip it today.

---

## Your goals

**Goal 1 — Prove Node runs the file**

In `script.js`, `console.log` something. Run `node script.js`. See it in the terminal.

**Goal 2 — Write a file**

An array of a few note objects (title + body is enough). `writeFileSync` to `notes.json`. Open that file in Cursor — it should look like JSON.

**Goal 3 — Read it back**

A second run (or later in the same script): `readFileSync` + `JSON.parse` + `console.log` the titles. If the file is missing, don’t crash — empty array or a message.

**Goal 4 — Add one note in code, save again**

Push a new object onto the array, write the file again. Run twice and confirm `notes.json` grew. That’s “server memory” in a file.

**Skip:** Express, databases, `fetch` from Node, putting this on the internet. Next lessons.

---

## Checklist

- [ ] `node script.js` prints something
- [ ] `notes.json` exists and I can read it
- [ ] I can explain `fs` vs `localStorage` in one sentence
- [ ] Missing file doesn’t kill the program

---

## When you’re done

1. Lesson 37 in `../progress.md`
2. What can Node do that the browser cannot (in this lesson)?
3. Why `JSON.stringify` before writing the file?
