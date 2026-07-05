// ============================================
// Lesson 14 — Mini-Project: Todo List
// ============================================
// Read LESSON.md for the full spec.
// YOU write all the JavaScript below this line.

console.log("Lesson 14 — Todo list. Your turn to build it.");

// Start here:
// 1. Data (tasks array, nextId)
// 2. Select DOM elements
// 3. render()
// 4. add, toggle, delete
// 5. remaining count

let tasks = [
    { id: 1, title: "Study JavaScript", completed: false },
    { id: 2, title: "Cleah House", completed: false },
    { id: 3, title: "Do Laundry", completed: true }
]

let nextId = 4;
let counter = 0;


const tasksList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const remainingCount = document.getElementById("remainingCount");


function render(){
    
    counter = tasks.reduce((sum, task) => {
        if (!task.completed) return sum += 1;
        return sum;
    }, 0)

    remainingCount.textContent = `${counter} tasks remaining`;

    tasksList.innerHTML = "";

    tasks.forEach((t, index) => {
        
        const li = document.createElement("li");
        li.classList.add("task-item");
        if (t.completed) li.classList.add("done");
        //li.textContent = t.title;

        const span = document.createElement("span");
        span.classList.add("task-title");
        span.textContent = t.title;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("btn-delete");
        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            render();
        })

        const doneBtn = document.createElement("button");
        doneBtn.textContent = "Done";
        doneBtn.classList.add("btn-done");
        doneBtn.addEventListener("click", () => {
            t.completed = !t.completed;
            render();
        })


        li.appendChild(span);
        li.appendChild(deleteBtn);
        li.appendChild(doneBtn);
        tasksList.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {
    if (taskInput.value === "" ) return;
    tasks.push({id: nextId, title: taskInput.value, completed: false});
    nextId++;
    taskInput.value = "";
    render();
})

render();
