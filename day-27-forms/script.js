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
const notesList = document.getElementById("notesList");

let notes = [];
let nextID = 1;

function render() {
    notesList.innerHTML = "";

    localStorage.setItem("notes", JSON.stringify(notes));

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
            render();
        })


        li.appendChild(header);
        li.appendChild(meta);
        li.appendChild(body);
        li.appendChild(deleteButton);
        notesList.appendChild(li);
    })
}

noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = noteForm.title.value.trim();
    const category = noteForm.category.value;
    const body = noteForm.body.value.trim();
    if (!title || !category || !body) {
        formError.textContent = "You must fill in all values";
        return;
    }   

    notes.push({id: nextID, title: noteForm.title.value, category: noteForm.category.value, body: noteForm.body.value });
    nextID += 1;
    localStorage.setItem("nextID", JSON.stringify(nextID));

    render();
    noteForm.reset();
    formError.textContent = "";
})

let storage = JSON.parse(localStorage.getItem("notes"));
nextID = JSON.parse(localStorage.getItem("nextID"));
if (!nextID) nextID = 1;
if (storage){
    console.log(`next id set to ${nextID}`);
    console.log(storage);
    notes = storage;
    render();
}