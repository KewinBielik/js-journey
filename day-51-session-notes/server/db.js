import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("notes.db");
db.exec(`CREATE TABLE IF NOT EXISTS notes ( 
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);

export function deleteNote(id) {
    
    const result = db.prepare(
        `DELETE FROM notes WHERE id = ?;`
        ).run(id);
    
    if (result.changes === 0){
        return false;
    }
    return true;
}

export function readNotes() {
    const notes = db.prepare(
        `SELECT * FROM notes ORDER BY created_at;`
        ).all();
    
    return notes;
} 

export function addNote(note) {
    db.prepare(
        `INSERT INTO notes (id, title, description) VALUES (?, ?, ?);`
        ).run(note.id, note.title, note.description);
}

export function changeNote(title, description, id) {
    
    const result = db.prepare(
        `UPDATE notes SET title = ?, description = ? WHERE id = ?;`
        ).run(title, description, id);

    if (result.changes === 0){
        return false;
    }
    return true;
}