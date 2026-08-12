# React — study notes

The Lesson 30 spec moved too fast. This file is the slow version.

**How to read this:** one part per sitting if you want. Nothing here asks you to write code. The goal is that the code you already wrote in `src/App.jsx` stops feeling like magic.

Every part compares React against **your own vanilla JS** from earlier lessons, because you already know how to do all of this the hard way.

---

## Part 1 — The problem React solves

Here's your link saver from Lesson 29, simplified:

```js
let links = [];                     // 1. data

function render() {                 // 2. a function that rebuilds the page
  linkList.innerHTML = "";
  links.forEach(link => { /* build elements */ });
}

linkForm.addEventListener("submit", (event) => {
  links.push(newLink);              // 3. change the data
  render();                         // 4. YOU remember to redraw
});
```

You wrote this shape five times: todo list, shopping list, notes, repo explorer, link saver. It works, but two things are annoying:

**You have to remember to call `render()`.** Forget it once and the screen silently lies about your data. You hit exactly this in Lesson 26.

**You wipe and rebuild everything.** `innerHTML = ""` destroys the whole list to change one item. Fine for ten links, wasteful for a real app.

React's pitch is: *you describe what the screen should look like for the current data, and React figures out the DOM updates.* Step 4 disappears. You never call `render()` again.

That is genuinely the whole point. Everything else — JSX, components, `useState` — is machinery to make that possible.

---

## Part 2 — A component is a function that returns markup

```jsx
function App() {
  return <h1>Hello</h1>;
}
```

That's a component. Three rules:

1. **It's a normal JavaScript function.** Not a class, not a special React thing.
2. **The name must start with a capital letter.** `App`, not `app`. React uses the capital to tell your components apart from real HTML tags.
3. **It returns markup** describing what should appear on screen.

React calls your function to find out what to draw. When your data changes, React calls it **again** to find out what should be on screen now.

So `App()` is doing the job your `render()` function did — except React decides when to call it, not you.

That last sentence is the single most important idea on this page. Read it again if it slid past.

---

## Part 3 — JSX, one rule at a time

The HTML-looking stuff inside a `.jsx` file is called **JSX**. It is not HTML and it is not a string. It's a JavaScript syntax extension that a tool (Vite) converts into normal JavaScript before the browser sees it.

You don't need to understand the conversion. You do need four rules.

### Rule 1 — Curly braces drop JavaScript into markup

```jsx
<p>{count}</p>
```

Anything inside `{ }` is evaluated as a JavaScript expression and its result gets displayed. Same idea as `${count}` in a template literal — different punctuation.

```jsx
<p>{count}</p>                    {/* a variable */}
<p>{count * 2}</p>                {/* an expression */}
<p>{user.name}</p>                {/* a property */}
<p>Hello {name}, you have {n}</p> {/* mixed with text */}
```

It has to be an *expression* (something producing a value). An `if` statement doesn't work there; a ternary `condition ? a : b` does.

### Rule 2 — `className`, not `class`

```jsx
<p className="hint">…</p>
```

Because JSX becomes JavaScript, and `class` is a reserved word in JavaScript. React had to pick a different name. Nothing deeper than that.

Same reason `for` on a label becomes `htmlFor`.

### Rule 3 — Events are camelCase, and you pass the function

```jsx
<button onClick={addCount}>+1</button>
```

Compare to your vanilla version:

```js
deleteButton.addEventListener("click", () => { … });
```

Two differences:

- `onclick` → `onClick` (capital C)
- You **pass** the function; you don't call it

`onClick={addCount}` hands React the function so it can call it later, when a click happens. `onClick={addCount()}` would call it *immediately during render* and hand React the result — a classic bug. The missing `()` is the entire difference.

### Rule 4 — One parent element

A component must return a single top-level element. This is why your `App` wraps everything in one `<div>`.

```jsx
return (
  <div>        {/* one parent */}
    <h1>…</h1>
    <p>…</p>
  </div>
);
```

Two siblings at the top with no wrapper is an error.

---

## Part 4 — `useState`, taken apart slowly

This line does a lot, so let's dismantle it:

```jsx
const [count, setCount] = useState(0);
```

### The right-hand side

`useState(0)` means: *"React, remember a value for me. Start it at `0`."*

React stores that value **outside** your function. This matters — your component function runs over and over, and a normal `let count = 0` inside it would reset to 0 every single time. React keeps state somewhere safe between calls.

`useState(0)` returns an array of exactly two things: the current value, and a function to change it.

### The left-hand side

```js
const [count, setCount] = useState(0);
```

Those square brackets are **array destructuring** — unpacking an array into variables. This is plain JavaScript, not React:

```js
const colors = ["red", "blue"];
const [first, second] = colors;
// first === "red", second === "blue"
```

So the line above is shorthand for:

```js
const result = useState(0);
const count = result[0];      // the current value
const setCount = result[1];   // the function that changes it
```

The names `count` and `setCount` are **yours**. You could write `const [banana, setBanana] = useState(0)` and it would work identically. The `setX` naming is just convention.

### Why `setCount(1)` instead of `count = 1`

This is the rule that trips up everyone coming from vanilla JS.

```js
count = count + 1;      // ❌ React never finds out; screen doesn't change
setCount(count + 1);    // ✅ React updates the value AND redraws
```

Remember Part 1: React's whole job is redrawing when data changes. It can only do that if it *knows* the data changed. Assigning to a variable is invisible to React. Calling `setCount` is you telling it.

`setCount` does two things: store the new value, and schedule your component to run again.

Also note `count` is declared with `const` — you genuinely never assign to it.

---

## Part 5 — What actually happens when you click "+1"

Trace it, using your real code:

1. You click the button.
2. React calls `addCount`.
3. `addCount` calls `setCount(a => a + 1)`.
4. React updates its stored value from `0` to `1`.
5. React calls `App()` **again**.
6. This time `useState(0)` hands back `1` instead of `0` — the `0` is only the *starting* value, used on the very first run.
7. Your function returns markup containing `<p>1</p>`.
8. React compares the new markup to what's currently on screen, sees only the number changed, and updates just that text node.

Step 5 is your old `render()` call. You don't write it — `setCount` triggers it.

Step 8 is the part you never got for free in vanilla. Your `innerHTML = ""` nuked everything; React changes only what differs.

---

## Part 6 — The `a => a + 1` form you used

You wrote:

```jsx
setCount(a => a + 1);
```

Both of these work:

```jsx
setCount(count + 1);    // "set it to this value"
setCount(a => a + 1);   // "set it to whatever it currently is, plus one"
```

The second passes a **function** to `setCount`. React calls that function with the latest value and uses whatever you return.

Why it's better: React sometimes batches several updates together. If you call `setCount(count + 1)` three times in a row, all three see the same stale `count` and you end up with +1 instead of +3. The `a => a + 1` form always reads the freshest value, so you get +3.

You picked the more robust form, probably by copying a good example. Now you know why it's the good one.

---

## Part 7 — Controlled inputs

Your stretch goal:

```jsx
const [text, setText] = useState("");

const changeText = (event) => {
  setText(event.target.value);
};

<input type="text" value={text} onChange={changeText} />
<p>{text}</p>
```

Compare with vanilla, where the `<input>` element owned the text and you read `.value` when you needed it:

```js
const title = titleInput.value.trim();
```

In React it's inverted. **State owns the value**, and the input just displays it:

- `value={text}` — the input shows whatever's in state
- `onChange={changeText}` — every keystroke pushes the new value back into state

So it's a loop: type → `onChange` fires → `setText` → component re-runs → `value={text}` shows the new text.

`event.target` is the element that fired the event — plain DOM, same as always. `.value` is its current text.

The payoff: `text` is always current, so `<p>{text}</p>` updates live with zero extra work. In vanilla you'd have wired an `input` listener and manually updated the paragraph.

The catch: if you write `value={text}` but forget `onChange`, the input becomes read-only — state never changes, so the displayed value never changes.

---

## Part 8 — The tooling, so it stops being mysterious

You installed a lot of things without being told what they were. Here's the short version.

| Thing | What it actually is |
|-------|---------------------|
| **Node.js** | JavaScript that runs outside a browser. Build tools are written in JS, so you need it to run them. |
| **npm** | Package manager that ships with Node. Downloads libraries. |
| **`package.json`** | List of what this project depends on, plus named commands. |
| **`node_modules/`** | Where downloaded libraries land. Huge, gitignored, recreated by `npm install`. |
| **Vite** | The dev server + build tool. Converts JSX into browser-readable JS and auto-refreshes on save. |
| **`npm run dev`** | Runs the `dev` script from `package.json` — starts Vite. |

Why any of this exists: browsers don't understand JSX. Something has to translate it first. That translator is Vite, and Vite needs Node to run.

That's it. You can treat all of it as "the thing that makes the dev server work" for now.

---

## Vocabulary

| Term | Meaning |
|------|---------|
| **component** | A function returning markup, named with a Capital letter |
| **JSX** | The HTML-like syntax inside `.jsx` files |
| **state** | Data React watches; changing it redraws the screen |
| **`useState`** | Creates one piece of state; returns `[value, setter]` |
| **re-render** | React calling your component function again |
| **controlled input** | An input whose value comes from state |
| **props** | Data passed into a component — *next lesson, ignore for now* |

---

## Things you can safely ignore right now

`useEffect`, `useRef`, `useContext`, custom hooks, React Router, Redux, `key` props, memoization, class components (old style — if a tutorial shows `class X extends React.Component`, it's outdated, close it).

Most React tutorials online throw these at you in the first ten minutes. You don't need any of them to understand what you built.

---

## Check yourself

Answer these in your own words. If one is fuzzy, reread that part.

1. What does your component function do that your old `render()` function did?
2. Why does `count = count + 1` fail but `setCount(count + 1)` work?
3. What are the two things `useState(0)` gives you back?
4. In `onClick={addCount}`, why is there no `()`?
5. What makes an input "controlled"?
