# Lesson 38 — Express (your computer answers HTTP)

Yesterday Node wrote a file. Today Node waits for a **browser request** and sends **JSON** back.

That’s what GitHub’s API does. You’re making a tiny version on `localhost`.

**One idea. No React, no CORS, no database.** You’ll open the URL in the browser like Lesson 25’s GitHub JSON.

---

## The one idea

**Express** is a Node library. You describe routes: “when someone asks for this path, run this function.”

```js
import express from "express";

const app = express();

app.get("/notes", (req, res) => {
  res.json([{ title: "hello" }]);
});

app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
```

| Piece | Meaning |
|--------|--------|
| `app.get("/notes", ...)` | GET request to `/notes` |
| `req` | the incoming request (ignore most of it today) |
| `res` | the response you send |
| `res.json(...)` | send a JS value as JSON (Express stringifies it) |
| `app.listen(3000)` | stay running; wait on port 3000 |

The process **does not exit** after one run. That’s right. Stop with `Ctrl+C`.

---

## Setup (once)

```powershell
cd C:\Users\kewin\Desktop\js-journey\day-38-express
npm install express
```

That adds Express to this folder (`node_modules` — still gitignored if you add a `.gitignore`; I’ll include one).

`package.json` has `"type": "module"` so `import` works like Lesson 37.

---

## Run

```powershell
node server.js
```

or `npm start`. Leave it running. In the **browser** open:

```
http://localhost:3000/notes
```

You should see JSON. Change the code, **stop and start** the server again (it doesn’t auto-reload unless you add a tool — skip that).

If the page doesn’t load: something else may be using port 3000, or the server isn’t running, or the path is wrong (`/` vs `/notes`).

---

## Your goals

**Goal 1 — Listen**  
`server.js` creates `app`, `listen` on 3000, `console.log` that it’s up.

**Goal 2 — One JSON route**  
`GET /notes` sends an array of a few objects (`res.json`). Open it in the browser.

**Goal 3 — A second path**  
e.g. `GET /` or `GET /hello` with different JSON or a short message. `res.json` or look up `res.send` — your choice. Prove **the URL picks the function**.

**Goal 4 (optional)**  
Read `notes.json` with `fs` (Lesson 37) and `res.json` that data. File missing → send `[]` or an error message, don’t crash.

**Skip:** POST, `fetch` from React, CORS, `req.params`, databases.

---

## Checklist

- [ ] Terminal says the server is listening
- [ ] Browser shows JSON at `http://localhost:3000/notes`
- [ ] A second URL does something different
- [ ] I can say what `res.json` does
- [ ] I know `Ctrl+C` stops the server

---

## When you’re done

1. Lesson 38 in `../progress.md`
2. How is this different from `node script.js` in Lesson 37?
3. What does a “route” mean here?
