// Lesson 42 — your Lesson 41 API. It can READ, CREATE and DELETE.
// New job: a route that UPDATES one note. Read ../LESSON.md
// Setup:  npm install
// Run:    node server.js
// Stop:   Ctrl+C

import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());


let notes = [];

try {
  const raw = fs.readFileSync("notes.json", "utf8");
  notes = JSON.parse(raw);
} catch (error) {
  console.log("no notes.json (or bad JSON) — using []");
  notes = [];
}

function saveNotes() {
  fs.writeFileSync("notes.json", JSON.stringify(notes, null, 2));
}

function validateNote(body) {
  if (body.title === undefined || body.description === undefined) {
    return "Missing title or description (or both)";
  }
  if (!body.title.trim()) {
    return "Bad input, title empty or missing";
  }
  return null;
}

app.delete("/notes/:id", (req, res) => {
  console.log(req.params.id);
  
  if (!notes.some(note => note.id === req.params.id)) {
    res.status(404).json({ error: "no note with that id"});
    return;
  }
  
  notes = notes.filter((note) => note.id !== req.params.id);
  console.log(notes);
  saveNotes();
  res.status(204).end()
});

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.post("/notes", (req, res) => {
  
  const errorMessage = validateNote(req.body);
  if (errorMessage) {
    res.status(400).json(errorMessage);
    return;
  }

  const nextId = crypto.randomUUID();
  const newNote = {
    id : nextId,
    title : req.body.title, 
    description : req.body.description};
  notes.push(newNote);
  saveNotes();
  res.status(201).json(newNote);
});

app.put("/notes/:id", (req, res) => {

  const errorMessage = validateNote(req.body);
  if (errorMessage) {
    res.status(400).json(errorMessage);
    return;
  }

  const targetNote = notes.find((n) => n.id === req.params.id);
  if (targetNote === undefined) {
    res.status(404).json("Unknown id");
    return;
  }
  targetNote.title = req.body.title;
  targetNote.description = req.body.description;
  saveNotes();
  res.status(201);
})

// TODO (Goal 1): app.put("/notes/:id", ...) — id from the URL, new values from the
// body. Find the note, change it, saveNotes(), send the updated note back.
// 404 if there is no such note. Validate the body like POST does.

app.listen(3000, () => {
  console.log("API: http://localhost:3000/notes");
});
