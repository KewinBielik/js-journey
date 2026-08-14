# Lesson 32 — A list in React (same app, new tool)

Lesson 31 was reading. Today you **use** `useState` on something you already built: the **link saver** from Lesson 29.

No Node/npm/Vite lecture. No new hooks. Two ideas only, both compared to vanilla.

---

## Run it

```powershell
cd C:\Users\kewin\Desktop\js-journey\day-32-react-list
npm install
npm run dev
```

Edit `src/App.jsx`. CSS classes are ready: `hint`, `error`, `item`, `btn-delete`.

---

## Idea 1 — Don’t mutate the array

In vanilla you did this and it worked:

```js
links.push(newLink);
render();
```

`push` changed the same array, then you redraw.

React state is different. If you `push` / `splice` the array React gave you, React often **doesn’t notice** — same as `count = count + 1`. You have to hand it a **new** array:

```js
setLinks([...links, newLink]);           // add: copy old items, then the new one
setLinks(links.filter((link) => ...));   // remove: .filter returns a NEW array
```

`...links` is **spread** — “put every item from `links` into this new array.” You used spread-adjacent ideas with arrays before; here it means *copy, don’t mutate*.

`.filter()` you already know from Lesson 9. Same callback, new array, `setLinks` of that result.

That’s the whole idea: **setters get a new value, not a mutated old one.**

---

## Idea 2 — `.map()` returns JSX, not DOM nodes

Vanilla:

```js
links.forEach((link) => {
  const li = document.createElement("li");
  // ...
  linkList.appendChild(li);
});
```

React: you **return** the list from the component. `{ }` in JSX can hold an array of elements. `.map()` (Lesson 9) builds that array:

```jsx
{links.map((link) => (
  <li key={link.id} className="item">
    ...
  </li>
))}
```

**`key={link.id}`** — React’s extra ask. When you delete item 2 of 5, React needs an id to know *which* `<li>` disappeared. Use a unique `id` on each link (same as your todo `nextId`), not the array `index` if you can help it — index breaks when you delete from the middle.

Give each link `{ id, title, url }`. Keep `nextId` in a `useState` too, or compute `Date.now()` — your choice.

---

## Your goals

**Goal 1 — Form that doesn’t reload**

`<form onSubmit={...}>`. Still need `event.preventDefault()`. Title + URL fields. Validate empty (and trim). Show an error in a `<p className="error">`.

Controlled inputs (`value` + `onChange`) are the right fit here — you already know why: after a successful add you’ll want to **clear** the boxes with `setTitle("")` / `setUrl("")`.

**Goal 2 — Add to the list**

State holds an **array**. Add without `push`. After add, the new link should appear.

**Goal 3 — Draw the list**

Each item: title as a link (`href={url}`, `target="_blank"`, `rel="noopener"`) + a Delete button. Use `.map()` and `key`.

**Goal 4 — Delete**

No `splice`. Filter out the one you clicked, `setLinks` the result.

**Skip for today:** `localStorage` in React (that usually wants a new hook). In-memory is enough. Refresh will empty the list — that’s expected.

---

## Checklist

- [ ] Add a valid link → it shows up
- [ ] Empty submit → error, nothing added
- [ ] After add, the inputs clear
- [ ] Delete removes the right item
- [ ] No `.push` / `.splice` on the state array
- [ ] No `document.getElementById` / `innerHTML`

---

## When you’re done

1. Lesson 32 in `../progress.md`
2. In your own words: why doesn’t `links.push(...)` work like it did in vanilla?
3. What is `key` for?
