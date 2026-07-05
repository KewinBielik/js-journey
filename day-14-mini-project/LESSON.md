# Lesson 14 — Mini-Project: Todo List (on the page)

Your second real project. This combines **everything** since Lesson 10:
objects, arrays, render pattern, DOM, buttons, arrow functions.

**Less scaffolding than Lesson 10.** The HTML is provided. **You design and write all the JavaScript.**

---

## The app

A todo list that lives on the webpage. Users can add tasks, mark them done, and delete them.

Each task is an object:
```js
{ id: 1, title: "Study JavaScript", completed: false }
```

All tasks live in one array. You keep a `nextId` counter (same idea as the task manager).

---

## Requirements

### Must have
1. **Add a task** — type in the input, click Add (or press Enter as bonus). Empty input → do nothing.
2. **Render the list** — show every task. Completed tasks look different (e.g. line-through text or a "done" class).
3. **Toggle complete** — click a "Done" / checkbox / or the task itself to flip `completed` true/false, then re-render.
4. **Delete a task** — remove it from the array (`splice`), then re-render.
5. **Task counter** — show something like `"3 tasks remaining"` (only count incomplete ones).

### Technical requirements
- Use the **render pattern** (clear container → rebuild from array).
- Use `document.createElement` for list items and buttons.
- Use **arrow functions** in at least two places (callbacks, listeners, or helpers).
- Use `.value` for the input, not `.textContent`.

---

## Suggested build order

1. Set up: `tasks` array, `nextId`, select DOM elements.
2. Write `render()` — get something on screen even before add works.
3. Wire up **Add**.
4. Wire up **Toggle complete**.
5. Wire up **Delete**.
6. Add the **remaining count** display.
7. Run through the acceptance checklist below.

---

## Acceptance checklist

- [ ] Page loads without errors.
- [ ] Can add multiple tasks.
- [ ] Empty input doesn't add a blank task.
- [ ] Can mark a task complete and incomplete again.
- [ ] Completed tasks look visually different.
- [ ] Can delete any task.
- [ ] Remaining count updates correctly.
- [ ] Used arrow functions at least twice.

---

## When you're done

1. Write your Lesson 14 entry in `../progress.md`.
2. Tell me: what was harder — the task manager (Lesson 10) or this one? Why?
3. Commit: `Lesson 14: todo list mini-project`

This is the closest you've come to a real app. Build it like you're shipping it. 🚀
