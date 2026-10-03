// Lesson 46 — your finished Lesson 45 API. Read ../LESSON.md
// New job: a middleware that refuses requests with no key.
// This time the React client DOES change: it has to send the key.
// Run:  node server.js

import express from "express";
import cors from "cors";
import { deleteNote, readNotes, addNote, changeNote} from "./db.js";

const app = express();


app.use(cors());
app.use(express.json());
app.use(logRequests);

const API_KEY = "HardPassword123";

function requireKey(req, res, next) {
  const header = req.get("x-api-key");
  if (header !== API_KEY) {
    res.status(401).json("Wrong key");
    return;
  }
  next();
}


function logRequests(req, res, next){
  console.log(req.method, req.url, req.body);
  next();
}

function requireValidNote(req, res, next){
  const error = validateNote(req.body);
  if (error === null) return next();
  res.status(400).json(error);
}


function validateNote(body) {
  if (body.title === undefined || body.description === undefined) {
    return "Missing title or description (or both)";
  }
  if (!body.title.trim() || !body.description.trim()) {
    return "Bad input, title or description empty";
  }
  return null;
}

app.delete("/notes/:id", requireKey, (req, res) => {
  
  const deleted = deleteNote(req.params.id);

  if (!deleted) {
    res.status(404).json({ error: "no note with that id"});
    return
  }
  res.status(204).end();

});

app.get("/notes", (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

app.post("/notes", requireKey, requireValidNote, (req, res) => {

  const newNote = {
    id : crypto.randomUUID(),
    title : req.body.title,
    description : req.body.description
  }

  addNote(newNote);

  res.status(201).json(newNote);
});

app.put("/notes/:id", requireKey, requireValidNote, (req, res) => {

  const changed = changeNote(req.body.title, req.body.description, req.params.id);

  if (!changed) {
    res.status(404).json("Unknown id");
    return;
  } 
  res.status(204).end();
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json(`There was an error somewhere`);
})

app.use((req, res) => {
  console.log(req.url);
  res.status(404).json("Unknown path");
})

app.listen(3000, () => {
  console.log("API: http://localhost:3000/notes");
});