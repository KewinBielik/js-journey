// Lesson 44 — your finished Lesson 42 API, unchanged. Read ../LESSON.md
//
// New job: rip out `fs` + notes.json and put SQLite underneath instead.
// The routes keep the same paths, methods and status codes — the React client
// must keep working without a single edit.
//
// Most of this lesson is DELETING code. Things that should be gone by the end:
//   - the `fs` import
//   - the module-level `notes` array and the try/catch that loads it
//   - saveNotes()
//
// Setup:  npm install
// Run:    node server.js
// Stop:   Ctrl+C

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("notes.db");
db.exec(`CREATE TABLE IF NOT EXISTS notes ( 
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL
  )`);



function validateNote(body) {
  if (body.title === undefined || body.description === undefined) {
    return "Missing title or description (or both)";
  }
  if (!body.title.trim() || !body.description.trim()) {
    return "Bad input, title or description empty";
  }
  return null;
}

app.delete("/notes/:id", (req, res) => {
  console.log(req.params.id);
  
  const result = db.prepare(
    `DELETE FROM notes WHERE id = ?;`
    ).run(req.params.id);

  if (result.changes === 0) {
    res.status(404).json({ error: "no note with that id"});
    return
  } else {
    res.status(204).end();
  }
});

app.get("/notes", (req, res) => {
  const notes = db.prepare(
    `SELECT * FROM notes ORDER BY title;`
    ).all();  
  res.json(notes);
});

app.post("/notes", (req, res) => {
  
  const errorMessage = validateNote(req.body);
  if (errorMessage) {
    res.status(400).json(errorMessage);
    return;
  }

  const result = db.prepare(
    `INSERT INTO notes (id, title, description) VALUES (?, ?, ?);`
    ).run(crypto.randomUUID(), req.body.title, req.body.description);

  res.status(201).json(result);
});

app.put("/notes/:id", (req, res) => {

  const errorMessage = validateNote(req.body);
  if (errorMessage) {
    res.status(400).json(errorMessage);
    return;
  }

  const result = db.prepare(
    `UPDATE notes SET title = ?, description = ? WHERE id = ?;`
    ).run(req.body.title, req.body.description, req.params.id);

  if (result.changes === 0) {
    res.status(404).json("Unknown id");
    return;
  } else {
    res.status(204).end();
  }
})

// TODO (Goal 1): app.put("/notes/:id", ...) — id from the URL, new values from the
// body. Find the note, change it, saveNotes(), send the updated note back.
// 404 if there is no such note. Validate the body like POST does.

app.listen(3000, () => {
  console.log("API: http://localhost:3000/notes");
});
