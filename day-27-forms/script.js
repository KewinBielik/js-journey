// ============================================
// Lesson 27 — Forms
// ============================================
// Read LESSON.md first. You write the JavaScript.
//
// Available ids: noteForm, titleInput, categoryInput, bodyInput,
//                formError, notesList

// Suggested order:
// 1. Data + load from localStorage
// 2. Listen for the form's "submit" event (not just a button click)
// 3. Validate → add note → clear form → render
// 4. Delete notes

const noteForm = document.getElementById("noteForm");
const formError = document.getElementById("formError");

let notes = [];
let nextID = 1;

noteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!noteForm.title.value || !noteForm.category.value || !noteForm.body.value || !noteForm.title.value.trim() || !noteForm.title.value.trim()) {
        formError.textContent = "You must fill in all values";
        return;
    }
    notes.push({id: nextID, title: noteForm.title.value, category: noteForm.category.value, body: noteForm.body.value });
    console.log(notes);
    formError.textContent = "";
})