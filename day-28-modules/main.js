// Lesson 28 — main.js
// Job: wire up the form, start the app.
// Import from storage.js and render.js. This file is loaded by index.html.
// See LESSON.md.


import {loadNextID, loadNotes, saveNextID} from "./storage.js";
import { render } from "./render.js";

const noteForm = document.getElementById("noteForm");
const formError = document.getElementById("formError");


let notes = loadNotes();
let nextID = loadNextID();

noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = noteForm.title.value.trim();
    const category = noteForm.category.value;
    const body = noteForm.body.value.trim();
    if (!title || !category || !body) {
        formError.textContent = "You must fill in all values";
        return;
    }   

    notes.push({ id: nextID, title, category, body });
    nextID += 1;
    saveNextID(nextID);

    render(notes);
    noteForm.reset();
    formError.textContent = "";
})

render(notes);
