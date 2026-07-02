# Lesson 10 — Mini-Project: Task Manager

This is your first **real project**. No more isolated TODOs — you're building a small but
complete tool that combines everything you've learned so far.

Treat this like a ticket from a real team: read the requirements, build the features,
test them, and make it work end-to-end.

## The app: Console Task Manager

A simple task manager that lives in the browser console. It stores tasks in memory
(no database yet) and lets you add, complete, filter, and display them.

Each task is an **object** with:
- `id` — a unique number
- `title` — what needs to be done (string)
- `completed` — `true` or `false`
- `priority` — `"low"`, `"medium"`, or `"high"`

All tasks live in one **array**.

---

## Requirements (build these functions)

### 1. `addTask(title, priority)`
- Creates a new task object and adds it to the tasks array.
- Auto-assigns the next `id` (start at 1, increment for each new task).
- New tasks start with `completed: false`.
- Returns the new task.

### 2. `completeTask(id)`
- Finds the task with the matching `id` and sets `completed` to `true`.
- If no task is found, print a message like `"Task not found."`

### 3. `printAllTasks()`
- Uses `.forEach()` to print every task in a readable format, e.g.:
  `[1] Buy groceries (high) — pending`
  `[2] Walk the dog (low) — done`

### 4. `getActiveTasks()`
- Uses `.filter()` to return all tasks where `completed` is `false`.

### 5. `getCompletedTasks()`
- Uses `.filter()` to return all tasks where `completed` is `true`.

### 6. `getHighPriorityTasks()`
- Uses `.filter()` to return all tasks where `priority` is `"high"`.

### 7. `getTaskCount()`
- Uses `.reduce()` or another approach to return an object like:
  `{ total: 5, completed: 2, pending: 3 }`

---

## How to approach this (read before coding)

1. **Start with the data** — create the `tasks` array and a `nextId` counter.
2. **Build one function at a time.** Test each one with `console.log` before moving on.
3. **Use what you know** — functions, objects, arrays, `.filter()`, `.forEach()`, `.reduce()`.
4. **Don't copy-paste full solutions.** Type it yourself.
5. At the bottom, run the **demo scenario** (already written in `script.js`) to prove everything works.

---

## Acceptance criteria (how you know you're done)

- [ ] You can add tasks with different priorities.
- [ ] You can mark a task as complete by id.
- [ ] `printAllTasks()` shows all tasks clearly.
- [ ] Filter functions return the correct tasks.
- [ ] `getTaskCount()` returns accurate totals.
- [ ] The demo scenario at the bottom runs without errors.

---

## When you're done

1. Write your Lesson 10 entry in `../progress.md`.
2. Tell me: what was the hardest part of building this?
3. Commit with: `Lesson 10: mini-project task manager`

This is the milestone where you stop doing exercises and start **programming**. 🚀
