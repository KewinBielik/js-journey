// Lesson 28 — storage.js
// Job: load and save notes (+ nextId) in localStorage.
// Export the functions (and any shared state) that other files need.
// See LESSON.md.

export function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

export function loadNotes() {
    const storage = JSON.parse(localStorage.getItem("notes"));
    if (!storage) {
        return [];
    } else {
        return storage;
    }
    
}

export function saveNextID(nextID) {
    localStorage.setItem("nextID", JSON.stringify(nextID));
}

export function loadNextID() {
    const storage = JSON.parse(localStorage.getItem("nextID"));
    if (!storage) {
        return 1;
    } else {
        return storage;
    }
}