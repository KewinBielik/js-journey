// Lesson 41 — your Lesson 40 API. It can READ and CREATE.
// New job: a route that DELETES one note by id. Read ../LESSON.md
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
  if (req.body.title === undefined || req.body.description === undefined) {
    res.status(400).json("Missing title or description (or both)");
    return;
  }
  if (!req.body.title.trim()) {
    res.status(400).json("Bad input, title empty or missing");
    return;
  }
  //const nextId = notes.length ? Math.max(...notes.map((n) => n.id)) + 1 : 1;
  const nextId = crypto.randomUUID();
  const newNote = {
    id : nextId,
    title : req.body.title, 
    description : req.body.description};
  notes.push(newNote);
  saveNotes();
  res.status(201).json(newNote);
});

// TODO (Goal 1): app.delete("/notes/:id", ...) — read the id out of the URL,
// remove that note from `notes`, saveNotes(), and reply.
// TODO (Goal 2): reply 404 if no note has that id.

app.listen(3000, () => {
  console.log("API: http://localhost:3000/notes");
});
