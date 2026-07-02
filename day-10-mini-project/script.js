// ============================================
// Lesson 10 — Mini-Project: Task Manager
// ============================================
// Read LESSON.md for the full spec. Build each function below.
// Test as you go: save → refresh → check the Console.

console.log("=== Task Manager ===\n");


// --------------------------------------------
// DATA — your task storage (already set up for you)
// --------------------------------------------

const tasks = [];
let nextId = 1;


// --------------------------------------------
// YOUR FUNCTIONS — implement these one at a time
// --------------------------------------------

function addTask(title, priority) {
  // TODO: create a task object, push it to tasks, increment nextId, return the task
  const newTask = {id: nextId, title: title, priority: priority, completed: false};
  tasks.push(newTask);
  nextId++;
  return newTask;
}


function completeTask(id) {
  // TODO: find the task by id, set completed to true
  // If not found, console.log("Task not found.")
  for (let i = 0; i < tasks.length; i++){
    if (tasks[i].id === id){
      tasks[i].completed = true;
      console.log(`Task with id ${id} completed`);
      return;
    }
  }
  console.log(`Task with id ${id} not found.`);
  return;
}


function printAllTasks() {
  // TODO: use forEach to print each task like:
  // [1] Buy groceries (high) — pending
  //[1] Buy groceries (high) — pending [2] Walk the dog (low) — done
  tasks.forEach(function(task){
    if (task.completed){
      console.log(`[${task.id}] ${task.title} (${task.priority}) - done`);
    } else {
      console.log(`[${task.id}] ${task.title} (${task.priority}) - pending`);
    }
  })
}


function getActiveTasks() {
  // TODO: return tasks where completed is false
  const activeTasks = tasks.filter(function(task){
    return !task.completed;
  })
  return activeTasks;
}


function getCompletedTasks() {
  // TODO: return tasks where completed is true
  const completedTasks = tasks.filter(function(task){
    return task.completed;
  })
  return completedTasks;
}


function getHighPriorityTasks() {
  // TODO: return tasks where priority is "high"
  const highPriorityTasks = tasks.filter(function(task){
    return task.priority === "high";
  })
  return highPriorityTasks;
}


function getTaskCount() {
  // TODO: return { total: X, completed: Y, pending: Z }
  let completedCount = 0;
  tasks.forEach(function(task){
    if (task.completed){
      completedCount++;
    }
  })
  return {
    total: tasks.length,
    completed: completedCount,
    pending: tasks.length - completedCount
  };
}


// --------------------------------------------
// DEMO — run this after all functions are built
// (Don't edit this section until you're done)
// --------------------------------------------

console.log("--- Adding tasks ---");
addTask("Buy groceries", "high");
addTask("Walk the dog", "low");
addTask("Study JavaScript", "high");
addTask("Reply to emails", "medium");
addTask("Clean desk", "low");

console.log("\n--- All tasks ---");
printAllTasks();

console.log("\n--- Completing task #2 ---");
completeTask(2);

console.log("\n--- All tasks after completing #2 ---");
printAllTasks();

console.log("\n--- Active tasks ---");
console.log(getActiveTasks());

console.log("\n--- High priority tasks ---");
console.log(getHighPriorityTasks());

console.log("\n--- Task counts ---");
console.log(getTaskCount());

console.log("\n--- Completing non-existent task ---");
completeTask(99);

console.log("\n=== Demo complete ===");
