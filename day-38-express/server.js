// Lesson 38 — Express. Read LESSON.md.
// Run: npm install express   (once)
// Then: node server.js
// Browser: http://localhost:3000/notes
// Stop: Ctrl+C

import express from "express";
import fs, { readFileSync } from "fs";

const app = express();

let array = [];

try {
    const raw = fs.readFileSync("notes.json", "utf-8");
    const notes = JSON.parse(raw);
    array = notes;
    console.log(notes);
} catch (Error) {
    console.log(Error);
}


app.get("/notes", (req, res) => {
    res.json(array);

});

app.get("/hello", (req, res) => {
    res.json([{title: "helloooo"}, {title : "Hellllloo"}, {title: "How low"}]);
});

app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});