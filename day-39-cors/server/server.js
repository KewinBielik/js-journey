// Lesson 39 — copy of your Express GET /notes idea.
// 1. npm install express
// 2. See the CORS error from React first
// 3. npm install cors  →  app.use(cors())  → restart
// Read ../LESSON.md

import express from "express";
import fs from "fs";
import cors from "cors";


const app = express();

app.use(cors());

let notes = [];

try {
  const raw = fs.readFileSync("notes.json", "utf8");
  notes = JSON.parse(raw);
} catch (error) {
  console.log("no notes.json (or bad JSON) — using []");
  notes = [];
}

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.listen(3000, () => {
  console.log("API: http://localhost:3000/notes");
});
