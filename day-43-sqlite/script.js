// Lesson 43 — SQL, on its own. No Express, no React. Read ../LESSON.md
// Run:  node script.js     (run it more than once — that's part of the point)
//
// Nothing to install. `node:sqlite` ships with Node 22.5+.

import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("notes.db");

// TODO (Goal 1): CREATE TABLE IF NOT EXISTS notes (...)
// Columns: id, title, description. Think about which ones are TEXT,
// which is the PRIMARY KEY, and which should be NOT NULL.

db.exec(`CREATE TABLE IF NOT EXISTS notes (
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL
);`
    
);

// TODO (Goal 2): insert a note. Use ? placeholders — never build the SQL
// string yourself.

db.prepare(
`INSERT INTO notes (id, title, description) VALUES (?, ?, ?);`
).run(crypto.randomUUID(), "Tytul", "Opis");

// TODO (Goal 3): read the notes back out and log them.

const notes = db.prepare(
`SELECT * FROM notes;`
).all();

console.log(notes);

// TODO (Goal 4): update one note by id.

db.prepare(
`UPDATE notes SET title = ?, description = ? WHERE id = ?;`
).run("Nowy tytul", "Nowy opis", notes[2].id);

// TODO (Goal 5): delete one note by id.

db.prepare(
`DELETE FROM notes WHERE id = ?;`
).run(notes[5].id);


db.close();
