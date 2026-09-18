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
import { DatabaseSync } from "node:sqlite";

const app = express();

app.use(cors());
app.use(express.json());

const db = new DatabaseSync("notes.db");
db.exec(`CREATE TABLE IF NOT EXISTS notes ( 
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
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
  
  const result = db.prepare(
    `DELETE FROM notes WHERE id = ?;`
    ).run(req.params.id);

  if (result.changes === 0) {
    res.status(404).json({ error: "no note with that id"});
    return
  }
  res.status(204).end();

});

app.get("/notes", (req, res) => {
  const notes = db.prepare(
    `SELECT * FROM notes ORDER BY created_at;`
    ).all();  
  console.log(notes);
  res.json(notes);
});

app.post("/notes", (req, res) => {
  
  const errorMessage = validateNote(req.body);
  if (errorMessage) {
    res.status(400).json(errorMessage);
    return;
  }

  const newNote = {
    id : crypto.randomUUID(),
    title : req.body.title,
    description : req.body.description
  }



  db.prepare(
    `INSERT INTO notes (id, title, description) VALUES (?, ?, ?);`
    ).run(newNote.id, newNote.title, newNote.description);

  res.status(201).json(newNote);
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
  } 
  res.status(204).end();
})


app.listen(3000, () => {
  console.log("API: http://localhost:3000/notes");
});
