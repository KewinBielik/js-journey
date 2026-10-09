// Lesson 52 — add a username column and filter every query by it.
// CREATE TABLE IF NOT EXISTS will not alter notes.db if the file already exists.
import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("notes.db");
db.exec(`CREATE TABLE IF NOT EXISTS notes ( 
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  username    TEXT NOT NULL
  )`);

export function deleteNote(id, username) {
    
    const result = db.prepare(
        `DELETE FROM notes WHERE id = ? AND username = ?;`
        ).run(id, username);
    
    if (result.changes === 0){
        return false;
    }
    return true;
}

export function readNotes(username) {
    const notes = db.prepare(
        `SELECT * FROM notes WHERE username = ? ORDER BY created_at;`
        ).all(username);
    
    return notes;
} 

export function addNote(note) {
    db.prepare(
        `INSERT INTO notes (id, title, description, username) VALUES (?, ?, ?, ?);`
        ).run(note.id, note.title, note.description, note.username);
}

export function changeNote(title, description, id, username) {
    
    const result = db.prepare(
        `UPDATE notes SET title = ?, description = ? WHERE id = ? AND username = ?;`
        ).run(title, description, id, username);

    if (result.changes === 0){
        return false;
    }
    return true;
}