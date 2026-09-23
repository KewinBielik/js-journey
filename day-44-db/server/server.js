import express from "express";
import cors from "cors";
import { deleteNote, readNotes, addNote, changeNote} from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());



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

  addNote(newNote);

  res.status(201).json(newNote);
});

app.put("/notes/:id", (req, res) => {

  const errorMessage = validateNote(req.body);
  if (errorMessage) {
    res.status(400).json(errorMessage);
    return;
  }

  const changed = changeNote(req.body.title, req.body.description, req.params.id);

  if (!changed) {
    res.status(404).json("Unknown id");
    return;
  } 
  res.status(204).end();
})


app.listen(3000, () => {
  console.log("API: http://localhost:3000/notes");
});
