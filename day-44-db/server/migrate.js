import { DatabaseSync } from "node:sqlite";
import fs from "fs";

const db = new DatabaseSync("notes.db");

let notes =[];

try {
    const raw = fs.readFileSync("notes.json", "utf8");
    notes = JSON.parse(raw);
  } catch (error) {
    console.log("no notes.json (or bad JSON) — using []");
  }

  db.exec("BEGIN");

  try {

  db.exec(`CREATE TABLE notes_new ( 
    id          TEXT PRIMARY KEY,
    title       TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`);

db.prepare(`
    INSERT INTO notes_new (id, title, description, created_at)
    SELECT id, title, description, COALESCE(created_at, CURRENT_TIMESTAMP)
    FROM notes;`
    ).run();
db.prepare(`DROP TABLE notes`).run();
db.prepare(`ALTER TABLE notes_new RENAME TO notes`).run();

notes.forEach(note => {
    const newID = crypto.randomUUID();
    db.prepare(
        `INSERT INTO notes (id, title, description) VALUES (?, ?, ?);`
        ).run(newID, note.title, note.description);
});

db.exec("COMMIT");
} catch (error) {
    console.log(error);
    db.exec("ROLLBACK");
}

db.close();