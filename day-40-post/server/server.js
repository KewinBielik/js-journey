// Lesson 40 — your API can now RECEIVE data. Read ../LESSON.md
// Setup:  npm install express cors
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

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.post("/notes", (req, res) => {
  console.log(req.body);   // whatever the client sent
  // ...build the note, add it to the array, save the file
  if (req.body.title === undefined || req.body.description === undefined) {
    res.status(400).json("Missing title or description (or both)");
    return;
  }
  if (!req.body.title.trim()) {
    res.status(400).json("Bad input, title empty or missing");
    return;
  }
  const nextId = notes.length ? Math.max(...notes.map((n) => n.id)) + 1 : 1;
  const newNote = {
    id : nextId,
    title : req.body.title, 
    description : req.body.description};
  notes.push(newNote);
  saveNotes();
  res.status(201).json(newNote);
});


app.listen(3000, () => {
  console.log("API: http://localhost:3000/notes");
});
