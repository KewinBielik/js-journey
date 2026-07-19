// ============================================
// Lesson 24 — localStorage (make the todo app remember)
// ============================================
// This is your working Lesson 14 todo app. It works — but refresh
// the page and everything resets. Your job: make it REMEMBER.
// Read LESSON.md first. You decide where the new code goes.

let tasks = [
    { id: 1, title: "Study JavaScript", completed: false },
    { id: 2, title: "Clean House", completed: false },
    { id: 3, title: "Do Laundry", completed: true }
];

let nextId = 4;
let counter = 0;

const tasksList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const remainingCount = document.getElementById("remainingCount");

function render() {

    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("nextID", JSON.stringify(nextId));

    counter = tasks.reduce((sum, task) => {
        if (!task.completed) return sum += 1;
        return sum;
    }, 0);

    remainingCount.textContent = `${counter} tasks remaining`;

    tasksList.innerHTML = "";

    tasks.forEach((t, index) => {

        const li = document.createElement("li");
        li.classList.add("task-item");
        if (t.completed) li.classList.add("done");

        const span = document.createElement("span");
        span.classList.add("task-title");
        span.textContent = t.title;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("btn-delete");
        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            render();
        });

        const doneBtn = document.createElement("button");
        doneBtn.textContent = "Done";
        doneBtn.classList.add("btn-done");
        doneBtn.addEventListener("click", () => {
            t.completed = !t.completed;
            render();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        li.appendChild(doneBtn);
        tasksList.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {
    if (taskInput.value === "") return;
    tasks.push({ id: nextId, title: taskInput.value, completed: false });
    nextId++;
    taskInput.value = "";
    render();
});

let storage = JSON.parse(localStorage.getItem("tasks"));
if (storage == null) {
    console.log(`storage is empty, storage = ${storage}`);
} else {
    tasks = storage;
    nextId = JSON.parse(localStorage.getItem("nextID"));
}
render();

