# Lesson 33 — Props (components can take arguments)

Same link saver as Lesson 32. One new idea: **split a piece of UI into its own function** and pass it data.

You've been stuffing everything into `App`. That works until the file is a mess. Real React apps are many small components.

---

## The one idea: props = function parameters

A normal function:

```js
function greet(name) {
  return "Hello " + name;
}
greet("Kewin");
```

A component is a function too. Its arguments come in as **one object**, usually named `props`:

```jsx
function LinkItem(props) {
  return <a href={props.url}>{props.title}</a>;
}

<LinkItem title="MDN" url="https://developer.mozilla.org" />
```

The attributes (`title="..."`, `url="..."`) become `props.title` and `props.url`. Same idea as `greet("Kewin")`, different spelling.

You can unpack the object (destructuring, like `useState`):

```jsx
function LinkItem({ title, url }) {
  return <a href={url}>{title}</a>;
}
```

Either style is fine. Pick one and stick with it today.

**State stays in `App`.** `LinkItem` does not need `useState` for the list. It just **displays** what `App` gives it. If it needs to delete, `App` still owns `deleteLink` — you **pass the function** as a prop, the same way you pass `onClick={addCount}` to a button.

```jsx
<LinkItem
  title={link.title}
  url={link.url}
  onDelete={() => deleteLink(link.id)}
/>
```

Inside `LinkItem`, the button is `onClick={onDelete}` (or `props.onDelete`). You already know that pattern.

---

## Run it

```powershell
cd C:\Users\kewin\Desktop\js-journey\day-33-react-props
npm install
npm run dev
```

`App.jsx` is your working Lesson 32 app. `LinkItem.jsx` is an empty stub. CSS is unchanged.

---

## Your goals

**Goal 1 — Make `LinkItem` show one row**

It should return the `<li>` (link + delete button). It needs at least: title, url, and a way to delete.

**Goal 2 — Use it from `App`**

Import it in `App.jsx`. Inside `.map()`, render `<LinkItem ... />` instead of writing the `<li>` there.

Keep `key={link.id}` on `<LinkItem>` (the thing in the list), not hidden inside `LinkItem`.

**Goal 3 — Prove props work**

Add three links, delete the middle one. If the wrong row disappears, `key` or `id` is off.

**Skip today:** moving the form into another file (lots of props at once). `localStorage`. New hooks.

---

## Checklist

- [ ] `LinkItem` lives in its own file and is imported
- [ ] The list still looks and behaves like Lesson 32
- [ ] Delete still works
- [ ] `links` / `useState` still live in `App`, not in `LinkItem`

---

## When you're done

1. Lesson 33 in `../progress.md`
2. In your own words: what is a prop?
3. Why does `deleteLink` stay in `App` instead of inside `LinkItem`?
