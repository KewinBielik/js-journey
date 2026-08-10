// Lesson 28 — render.js
// Job: draw the notes list into the page.
// Import whatever you need from storage.js. Export render.
// See LESSON.md.
import {saveNotes} from "./storage.js";

const notesList = document.getElementById("notesList");


export function render(notes) {
    notesList.innerHTML = "";

    console.log("attempting to render:");
    console.log(notes);

    //localStorage.setItem("notes", JSON.stringify(notes));
    saveNotes(notes);

    notes.forEach((note, index) => {
        
        const li = document.createElement("li");
        li.classList.add("note-item");
        
        const header = document.createElement("h2");
        header.textContent = note.title;

        const meta = document.createElement("p");
        meta.classList.add("note-meta");
        meta.textContent = note.category;

        const body = document.createElement("p");
        body.classList.add("note-body");
        body.textContent = note.body;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn-delete");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            notes.splice(index, 1);
            render(notes);
        })


        li.appendChild(header);
        li.appendChild(meta);
        li.appendChild(body);
        li.appendChild(deleteButton);
        notesList.appendChild(li);
    })
}