# Learning Log

The most important file here. Fill it in EVERY session. Re-read the last entry before you start.

**Two different counters (don't mix them up):**
- **Lesson #** = where I am in the curriculum (matches the folder, e.g. `day-03`).
- **Streak day** = how many separate CALENDAR days I've shown up to learn.

**Template to copy for each new entry:**
```
## Lesson N — <topic>
- **Date:** YYYY-MM-DD · Streak day X
- **What I did:**
- **What I learned:**
- **What confused me:**
```

---

## Lesson 0 — Setup
- **Date:** 2026-06-30 · Streak day 1
- **What I did:** Decided on JavaScript. Set up the `js-journey` folder and read the rules.
- **What I learned:** The language matters less than showing up daily. Web dev is the fastest proven path to a remote job for a self-taught developer.
- **What confused me:** Nothing yet.

## Lesson 1 — Variables (let / const)
- **Date:** 2026-06-30 · Streak day 1
- **What I did:** Declared variables holding numbers, strings, and booleans using both `let` and `const`.
- **What I learned:** `let` is for values that can change, `const` for values that stay the same. There's no need to declare the type beforehand (dynamic typing). `console.log()` prints to the console.
- **What confused me:** That I don't write `bool varName` — I just use `let`/`const` and JavaScript figures out the type.

## Lesson 2 — Numbers & template literals
- **Date:** 2026-06-30 · Streak day 1
- **What I did:** Declared two numbers and did sum, difference, product, division, and remainder (`%`). Used template literals to print sentences with variables.
- **What I learned:** Using backticks `` ` `` instead of `"` lets me drop variables straight into text with `${ }` — much easier than joining with `+`.
- **What confused me:** Nothing really.

## Lesson 3 — if / else & comparisons
- **Date:** 2026-06-30 · Streak day 1
- **What I did:** Declared values and compared them with `if` / `else if` / `else` to print different results.
- **What I learned:** JavaScript's default brace style differs from C++/C#, and I'm adopting the JS convention. Comparison uses `===`, not `=`.
- **What confused me:** I expected equality to be `==`; learned that `===` (strict) is the one to always use.

## Lesson 4 — Logical operators (&& || !)
- **Date:** 2026-06-30 · Streak day 1
- **What I did:** Wrote `if` statements combining conditions with `&&`, `||`, and `!`.
- **What I learned:** Reinforced how AND/OR/NOT work, and kept using the JS brace convention. Reused an existing variable instead of redeclaring it.
- **What confused me:** The `!` operator felt odd at first, but made sense after thinking it through.

## Lesson 5 — for and while loops
- **Date:** 2026-07-01 · Streak day 2
- **What I did:** Wrote `for` and `while` loops, some with `if` statements inside.
- **What I learned:** Always declare the loop counter with `let`. Without it, the variable becomes global and will throw an error in a real job codebase.
- **What confused me:** Nothing really.

## Lesson 6 — Functions, parameters, and return
- **Date:** 2026-07-01 · Streak day 2
- **What I did:** Defined functions using `return`, `if` statements, and loops.
- **What I learned:** When writing `if (x) return true; else return false;`, you can usually just write `return x;` — much cleaner.
- **What confused me:** Nothing really.

## Lesson 7 — Arrays, indexing, and looping over lists
- **Date:** 2026-07-02 · Streak day 3
- **What I did:** Created arrays, looped over them with `for` loops and `for...of`, and wrote a function to find the max value in an array.
- **What I learned:** A **parameter** is the placeholder name in a function definition. An **argument** is the actual value passed in when calling the function. Arrays are zero-indexed, so the last item is at `array[array.length - 1]`.
- **What confused me:** The `for...of` loop wasn't intuitive at first, and I still sometimes fall back into my old C++/C# brace style.

## Lesson 8 — Objects and arrays of objects
- **Date:** 2026-07-02 · Streak day 3
- **What I did:** Created objects with multiple properties and arrays of objects. Wrote a function that looped through an array of objects and returned the sum of a property value.
- **What I learned:** Object house style is no space before the colon: `{title: "..."}` not `{title : "..."}`. When testing filters, include data that should be excluded so you can actually verify the filter works.
- **What confused me:** Object syntax wasn't intuitive at first. Also noticed that JavaScript doesn't declare parameter types, so passing the wrong type can fail silently (e.g. return `NaN`).

## Lesson 9 — Array methods (forEach, map, filter, reduce)
- **Date:** 2026-07-02 · Streak day 3
- **What I did:** Used array methods — `.forEach()`, `.map()`, `.filter()`, and `.reduce()` — including chaining `.filter().map()`.
- **What I learned:** All four methods loop over an array and call a callback function for each item. JavaScript runs the loop; my callback just does one job per call.
  - **`.forEach()`** — callback does something (e.g. `console.log`); method returns nothing useful.
  - **`.map()`** — callback returns one transformed item; method returns a **new array** of those items.
  - **`.filter()`** — callback returns `true` or `false`; method returns a **new array** of items that passed.
  - **`.reduce()`** — callback returns an updated running total; method returns **one final value**. The second argument (e.g. `0`) is the starting value for the first round.
- **What confused me:** `.reduce()` was the hardest — especially the starting value (`0`) and how the return value becomes the next round's running total. It helped to see it as the same pattern as a manual `let sum = 0` loop.

## Lesson 10 — Mini-project: task manager
- **Date:** 2026-07-02 · Streak day 3
- **What I did:** Built a task manager with 7 functions using everything learned so far.
- **What I learned:** There are often multiple valid ways to solve a problem — the best choice depends on the scenario (readability vs efficiency). `getTaskCount()` should return a real object `{}`, not a template string that looks like one.
- **What confused me:** Didn't see how to use `.reduce()` at first until I realized the running total can be an object with multiple counters.

## Lesson 11 — DOM basics (select, change, listen)
- **Date:** 2026-07-02 · Streak day 3
- **What I did:** Changed a live webpage using JavaScript — text, buttons, classes, a counter, and reading from an input.
- **What I learned:** The **DOM** is the browser's live version of the HTML that JS can read and change. Key tools: `document.getElementById()`, `.textContent`, `.addEventListener("click", ...)`, `.classList.toggle()`. Inputs use `.value`, not `.textContent`.
- **What confused me:** Why `nameInput.textContent` was empty — learned that typed text lives in `.value`.

## Lesson 12 — Dynamic lists and the render pattern
- **Date:** 2026-07-03 · Streak day 4
- **What I did:** Built a shopping list app — add items, render from an array, delete with buttons.
- **What I learned:**
  - **Render pattern:** data lives in the array; `render()` syncs it to the page. After any change → update array → call `render()` again.
  - **Creating elements:** `document.createElement("li")` / `createElement("button")` — same pattern, different tag names.
  - **`forEach(item, index)`** — second parameter is the position; needed for delete.
  - **Remove from array:** use `items.splice(index, 1)`, not `delete items[index]` (which leaves a hole).
  - **Guard clause:** `if (input.value === "") return;` — short early exit when there's nothing to do.
  - **Don't double-write text:** use either `li.textContent` OR a `<span>`, not both.
- **What confused me:** New syntax piled up fast (`index`, `splice`, guard clauses). Felt simple and hard at the same time — which probably means it's clicking.

## Lesson 13 — Arrow functions
- **Date:** 2026-07-05 · Streak day 5
- **What I did:** Created short functions with the new arrow syntax.
- **What I learned:** Arrow functions are often used in array methods — they are much shorter and look cleaner. I also learned that JS has **Automatic Semicolon Insertion (ASI)** and that's why it doesn't throw an error when the semicolon is missing. I will still write semicolons myself as that's apparently the safer approach. You can skip `{` and `return` when the function body is a single expression.
- **What confused me:** Nothing really — but it definitely feels like new syntax.

## Lesson 14 — Todo list mini-project
- **Date:** 2026-07-05 · Streak day 5
- **What I did:** Built a todo list app — add tasks, render from an array, delete / mark as done with buttons. I had to write all the functions from scratch this time.
- **What I learned:** I learned how it feels to write everything myself from 0. I had to look back to other lessons to remind myself the proper syntax and I believe this taught me a lot. Having to find the styles in the HTML page and connecting them to the elements myself was also a good learn. Harder than Lesson 10 because there was no scaffolding. Also learned: don't decrement `nextId` on delete — it only goes up for new tasks.
- **What confused me:** I was confused by the CSS selector `.task-item.done .task-title` — I had no idea how to apply this to elements I created in JS. The solution was: an `<li>` with class `task-item`, then `add("done")` when completed, and a `<span>` with class `task-title` for the text. This was really hard to figure out, but it makes sense — applying the style to the whole `<li>` would also affect how the buttons look.

## Lesson 15 — HTML & CSS (first pass — too fast)
- **Date:** 2026-07-06 · Streak day 6
- **What I did:** Styled a portfolio page using `styles.css` — variables, flexbox, sections. Followed TODO comments step by step.
- **What I learned:** HTML semantic tags (`header`, `main`, `section`). CSS selectors like `.skill-list li` mean "li inside that class". `padding` is inside the box, `margin` is outside. `rem` is a relative unit. Two-value shorthand: first = top/bottom, second = left/right. Honest feedback: copying CSS without experiments didn't help me understand it.
- **What confused me:** Almost all of CSS — flex, `margin: 0 auto`, shorthand values. Too many new ideas at once. Mentor and I agreed: next lessons = HTML only first, then CSS slowly.

## Lesson 16 — HTML basics (structure only)
- **Date:** 2026-07-07 · Streak day 7
- **What I did:** Built an "About me" page using only HTML — header, nav links, two sections inside main, footer with GitHub link. No CSS, no JavaScript.
- **What I learned:**
  - **`<head>`** = invisible page info (title, charset). **`<body>`** = everything the user sees.
  - Most tags are pairs: `<p>text</p>`. Links need `href`: `<a href="#about">`. Lists: `<ul>` wraps `<li>` items.
  - **Page structure:** `body` → `header` → `main` (with multiple `section`s inside) → `footer`.
  - **Semantic tags** (`header`, `nav`, `main`, `section`, `footer`) don't change the look without CSS — they organize the page, help styling later, accessibility, and SEO. I could use only `<div>`s, but semantic tags are the professional way.
  - **`<nav>`** groups navigation links so browsers/screen readers know "this is the menu" — not just for styling.
  - **`<ul>`** = unordered (bullet) list. **`<ol>`** would be numbered/ordered.
  - **`<a>` without `href`** is not a real link — use `<p>` for plain text.
  - Browsers apply **default styles** (h1 big/bold, links blue, etc.). CSS overrides those later.
  - Convention: one `<h1>` per page; use `<h2>` for section titles.
- **What confused me:** At first I didn't know what each tag actually *was* or where to nest sections (both go inside the same `<main>`). First version of the lesson listed tags without enough syntax examples — after the lesson was updated with a full example and structure map, it clicked much better. Pushed for returning to the original JavaScript lesson style (syntax → example → small TODOs).

## Lesson 17 — More HTML tags
- **Date:** 2026-07-08 · Streak day 8
- **What I did:** Modified the website from last lesson: added an image, changed paragraph text to **bold** and *italics*, changed the link to open in a new tab.
- **What I learned:** `<img>` + `alt`, `<strong>` / `<em>`, `<ol>`, external links with `target="_blank"` and `rel="noopener"`.
- **What confused me:** I was confused with `&amp;` — this is the syntax to use when you wanna write an `&` sign. HTML could expect a tag/syntax after `&`, so this is the way to tell it you actually want the `&` character. There is also `&lt;` for `<` and `&gt;` for `>`.

## Lesson 18 — Adding CSS to HTML
- **Date:** 2026-07-10 · Streak day 9
- **What I did:** Linked HTML to a CSS file, added styles to all `h1`, styled all links inside `<nav>`, created my own `class` and applied it to one element, changed the font of all `<p>` on the site.
- **What I learned:** I learned this selector → rule structure:
```css
selector {
  property: value;
}
```
- **What confused me:** Nothing confusing — I just had to remind myself the `rem` thing for `font-size`.

## Lesson 19 — Box model experiments
- **Date:** 2026-07-10 · Streak day 9
- **What I did:** Changed style properties for a few blocks and observed how it affects them.
- **What I learned:** Styling is really cool and intuitive once you understand how it is structured in boxes with `padding` and `margin`, especially as you learn more tools such as `auto`.
- **What confused me:** I was mixing up `padding` with `margin` a bit.

## Lesson 20 — Flexbox experiments
- **Date:** 2026-07-11 · Streak day 10
- **What I did:** Applied `display: flex` to parents and changed how their children position with `justify-content`, `align-items`, `gap`.
- **What I learned:** Flexbox is used to have one rule on the **container** instead of `margin` and `padding` on every child.
- **What confused me:** Nothing really.

## Lesson 21 — One-page layout mini-project (in progress)
- **Date:** 2026-07-14 · Streak day 11
- **What I did:** Built my first full landing page from scratch — `index.html` + `styles.css`. Header with flex, hero block, main with list, footer. Still improving it; studied mentor's `reference-index.html` and commented `reference-styles.css`.
- **What I learned:**
  - Combining HTML + CSS on a real page is harder than isolated exercises — but my JS fundamentals (flex, box model, classes) all showed up.
  - **Spacing between hero text and link:** `margin` on `p` or `a` is professional. Also: `gap` on a flex column, or `margin-top` on a wrapper like `.hero-actions`.
  - **Fonts:** start with `system-ui` — no need to pick custom fonts yet. A clear `<h1>` + normal `<p>` hierarchy makes pages look much better.
  - **Sections:** header, hero, main, footer is enough for a simple page.
  - **`<hero>` is not a real HTML tag** — use `<section class="hero">`.
  - Good design = spacing, readable fonts, restrained colors (not everything the same beige/orange).
- **What confused me:** How to add space between paragraph and link without it feeling "hacky." What sections to include. What fonts to use. How to make it look good overall — reference page helped show how pros think about `.container`, variables, and `margin-top` / `gap`.

<!-- Add your next entry below this line -->

## Lesson 22 — Studying the reference website and upgrading my One-page layout mini-project
- **Date:** 2026-07-16 and 2026-07-17 · Streak day 13
- **What I did:** I tried to learn from the finished website and style mine in the same way.
- **What I learned:**
  - In `styles.css` you can use `.container` to style all containers on the page — useful for centering everything at once with `max-width` and `margin: 0 auto`. Note that you need elements that have `class="container"` or `class="container something"`.
  ```css
  .container {
    max-width: 720px;
    margin: 0 auto;   /* centers the block — the proper way you learned */
    padding: 0 1.25rem; /* side breathing room on mobile */
  }
  ```
  - You can store colors as variables, later reference them with `var(--name)` — later you won't need to change the whole site, just update colors here:
  ```css
  :root {
    --brand: #0d9488;
    --text: #1f2937;
    --text-muted: #6b7280;
    --bg: #ffffff;
    --bg-soft: #f9fafb;
    --border: #e5e7eb;
  }
  ```
  - You can make a cool underline by adding `border-bottom` to the header or `border-top` to the footer.
  - You can style how links inside nav look on hover with:
  ```css
  .nav a:hover {
    color: #999;
  }
  ```
  - You can make links look like buttons — in HTML use something like `<a class="btn btn-primary">link</a>` and style it like this:
  ```css
  .btn {
    display: inline-block;
    padding: 0.65rem 1.25rem;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
  }

  .btn-primary {
    background: var(--brand);
    color: white;
  }

  .btn-skills {
    background: white;
    color: var(--brand);
    border: 2px solid var(--brand);
  }
  ```
  - You can put links inside paragraphs:
  ```html
  <p>&copy; 2026 Kewin · <a href="https://github.com/KewinBielik">GitHub</a></p>
  ```
- **What confused me:** I am understanding the HTML and CSS code now but I am just lacking the styling skill to know how things should be positioned, sized, colored to make the website look good. That will come with time I believe.

## Lesson 23 — Responsive basics (media queries)
- **Date:** 2026-07-18 · Streak day 14
- **What I did:** Made my landing page work on phone width with `@media (max-width: 600px)`. Stacked header, centered content, stacked hero buttons, smaller `h1`.
- **What I learned:** `@media` overrides must come **after** the default rule or they get overwritten. Multiple `@media` blocks work; one block at the bottom is also fine.
- **What confused me:** Nothing really.

## Lesson 24 — localStorage (persistence)
- **Date:** 2026-07-19 · Streak day 15
- **What I did:** Made the todo app remember tasks across refreshes using `localStorage`. Save inside `render()`; load on startup with a `null` check. Also saved `nextId` to avoid duplicate IDs.
- **What I learned:** `localStorage` only stores strings, so you need `JSON.stringify()` to save and `JSON.parse()` to load. `getItem()` returns `null` when nothing is saved yet.
- **What confused me:** At first the code did not work and I had no clue why. After quite a lot of debugging I just deleted everything and wrote it down again — this time it worked. Still no clue what was wrong lol.


## Lesson 25 — Fetch-api
- **Date:** 2026-07-28 · Streak day 16
- **What I did:** Added `fetch` to a pre-written website, used and displayed data from that fetch — my GitHub avatar, username and public repo count. Also added a `Loading...` state and `try` / `catch` for errors.
- **What I learned:**
  - `fetch()` returns a **promise** — data that's yet to come. The program can continue without it and the promise will later say whether we got the data or not.
  - `await` pauses the function until the promise is settled and then gives the real value. It only works inside an `async` function.
  - You need **two** awaits and they give different things:
  ```js
  const response = await fetch(url);   // info about the connection (status, headers)
  const data = await response.json();  // the actual JSON data
  ```
  - Without `await`, `const data = fetch(url)` is just a pending promise — not the data.
  - `display` is not true/false — it says what kind of box the element is (`none`, `inline`, `block`). Setting it to `block` unhides the image, but the cleaner way is a `.hidden` class in CSS + `classList.remove()` in JS.
  - `data.name || data.login` — a fallback for when a field is empty. Same `||` as in Lesson 4.
  - `fetch` only fails on **network** errors. A 404 still "succeeds", so you check `response.ok` yourself and `throw` to reach the `catch`:
  ```js
  if (!response.ok) {
    throw new Error(response.status);
  }
  ```
  - DevTools → Network throttling (Slow 3G / Offline) is how you actually test loading states and error handling.
- **What confused me:**
  - How to remove `display: none` from the image. I tried `display: true` which doesn't exist, then found `initial` on the web which worked (it resets to `inline`), but apparently `block` is the more common choice.
  - The lesson described a promise as an "IOU" and I had no idea what that meant (it's an English idiom for "I owe you", not a programming term).

## Lesson 26 — Repo explorer mini project
- **Date:** 2026-07-30 · Streak day 17
- **What I did:** I have made a "repo explorer" - web app that allows for searching github by username and seeing repositories of that user with few informations and a favourite button. This combaines render(), fetch-api and localStorage.
- **What I learned:** Mainly that I can already build cool apps with what I got to know so far but also that I can't remember all of it and I have keep coming back to old code.
- **What confused me:** I again forgot how .pop() works.

## Lesson 27 — Forms
- **Date:** 2026-08-01 · Streak day 18
- **What I did:** Built a quick notes app with a real `<form>` — title, category, body. Validate on submit, add notes to a list, delete them, save with `localStorage`.
- **What I learned:**
  - Listen for `submit` on the **form**, not only `click` on the button — then Enter in a field also submits.
  - `event.preventDefault()` stops the browser from reloading the page on submit.
  - You can read fields via the form and their `name`s, e.g. `noteForm.title.value`.
  - `.trim()` on text so spaces-only input fails validation.
  - `form.reset()` clears all fields after a successful submit.
  - Same old patterns still apply: `render()`, save in `render()`, `nextId` in `localStorage`, delete with `splice`.
- **What confused me:** Nothing major — mostly looking back at older lessons for the render / storage pattern.

## Lesson 28 — Modules
*Part 1:*
- **Date:** 2026-08-02 · Streak day 19
- **What I did:** So far I have only setup the server to work, this was necessary to have the modules working.
- **What confused me:** Setting up the server was really weird and confusing, I can't even remember how I did it because it was like a week ago and I am writing the notes right now (08-10).
- **New approach:** I am thinking now that I should make entries here every time I make some work, even if multiple entires refer to the same lesson.

*Part 2:*
- **Date:** 2026-08-10 · Streak day 20
- **What I did:** I divided the code from last lesson into three files: main.js, render.js and storage.js. Comained them by putting `script type = "module"` in index.html. 
- **What I learned:** 
  - The import/export syntax:
    ```js
    // main.js
    import {saveNotes} from "./storage.js";

    // storage.js
    export function saveNotes(notes) {
        localStorage.setItem("notes", JSON.stringify(notes));
    }
    ```
  - Overrwriting arguments in functions does not change the original variables but if an array is passed and we call it's function then it will operate on the original variable:
    ```js
    let nextID = 1;

    function load(id) {
      id = 5;          // only changes the local copy
    }

    load(nextID);
    console.log(nextID); // still 1
    ```
    ```js
    let notes = [];

    function fill(arr) {
      arr.push({ title: "hi" });  // mutates the SAME array → main sees it
    }

    fill(notes);
    console.log(notes.length); // 1
    ```

    ```js
    function fill(arr) {
      arr = [{ title: "hi" }];  // points local `arr` at a NEW array
    }

    fill(notes);
    console.log(notes.length); // still 0
    ```
- **What confused me:** The website hosted on the server seemed to refresh itself every time I saved the code, apparently this is a feature and it's normal.

## Lesson 29 — From-memory challenge (Link saver)
- **Date:** 2026-08-11 · Streak day 21
- **What I did:** Built a link saver from memory — form with title + URL, list with clickable links and delete, `localStorage` so it survives refresh. Skipped the optional modules stretch on purpose (wouldn't have taught much today).
- **What I learned:**
  - I can build a full small app mostly from memory + googling, without constantly opening old lesson folders (only peeked ~1–2 times).
  - Felt more confident at the end — recall practice works better than I expected.
  - Same pattern as my other list apps: data in an array → `render()` syncs the page → save to `localStorage` → on load, restore and render again.
  - Still easy to slip on small habits: pass `(event)` into the submit handler (don't rely on a global `event`), and always declare with `const`/`let`.
- **What confused me:** Nothing major. Googling syntax was enough when I blanked.


## Lesson 30 — React intro
- **Date:** 2026-08-12 · Streak day 22
- **What I did:** I installed nodeJS and created a simple increase/decrease buttons layout with useState
- **What I learned:** I haven't learned much because there was barely any explanation in the lesson.md, I had to google everything but it was still really hard to understand so I asked the AI to create much more detailed notes - I am going to read them tomorrow.
- **What confused me:** Everything, lol.

## Lesson 31 — React intro part 2
- **Date:** 2026-08-13 · Streak day 23
- **What I did:** I read the reference.md to better understand last lesson's concepts.
- **What I learned:** 
  - React's advantage is that you dont have to call render() every time something changes and it does not rebuild the whole page, instead it only rebuilds what has changed.
  - Components are JS functions written by capital letter that return a markup describing what should appear on the screen. So `App()` is doing the job that `render()` function did — except React decides when to call it, not you.
    ```jsx
    function App() {
      return <h1>Hello</h1>;
    }
    ``` 
  - The HTML-looking stuff inside a `.jsx` file is called **JSX**. It is not HTML and it is not a string. It's a JavaScript syntax extension that a tool (Vite) converts into normal JavaScript before the browser sees it. You don't need to understand the conversion. You do need four rules:
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
  - `useState(0)` returns an array of exactly two things: the current value, and a function to change it.
    ```js
    const [count, setCount] = useState(0);
    ```
    The square brackets unpack that array (destructuring — plain JS). Names `count` / `setCount` are mine. The `0` is only the **starting** value on the first run.
  - `count = count + 1` does nothing on screen — React never finds out. Must use `setCount(...)`. `count` is `const` on purpose.
  - What happens on +1: click → `setCount` → React stores the new value → React calls `App()` again → new JSX → only the changed bit updates.
  - `setCount(a => a + 1)` vs `setCount(count + 1)`: the function form always uses the latest value (safer if several updates happen together). I used this in my counter.
  - **Controlled inputs:**
    - `onChange` only → the **browser** owns the box; React copies the text into state. The `<p>{text}</p>` still updates. This is why dropping `value={text}` still "worked" in my test.
    - `value={text}` + `onChange` → **React** owns the box. Needed if I want a Clear button to empty the input, format as I type, pre-fill, etc.
    - `value={text}` without `onChange` → the input is stuck / read-only.
  - Tooling: Node = JS outside the browser. npm = installs packages. Vite = turns JSX into JS the browser understands + refreshes on save. `node_modules` is gitignored — on another PC run `npm install`.
- **What confused me:** Controlled inputs — I thought `value={text}` was required because the demo still worked without it. It only matters when the **input box** must stay in sync with state, not just the paragraph below.

## Lesson 32 — React-list
- **Date:** 2026-08-14 · Streak day 24
- **What I did:** Created the link saver website with React. I tried to write as much as possible from memory and my own understanding but I still have to look things up because React still feels confusing to me.
- **What I learned:**
  - All the functions and `useState`s must be **inside** the component. I was putting them outside because I viewed the component like a standard function — then I got an error that pointed this out.
  - I knew I can't write `onClick={functionName(argument)}` because that would run the function instantly, and instead I have to use `onClick={functionName}`. Now I also get why `onClick={() => functionName(argument)}` works: `() =>` creates a function that takes no arguments (React will still call it with the click event, which we ignore) and then runs another function with **our** argument. We are still passing a function into `onClick`.
  - `function changeText(event) { ... }` and `const changeText = (event) => { ... }` are the **same thing** — two ways to write a function (arrow functions from Lesson 13). React does not care. I can use `function` everywhere if I want.
  - The browser / React **always passes an event object** into the handler — same as `addEventListener("submit", (event) => ...)`. `event.target` is the element that changed; `.value` is what's in the input. That's why `changeText` has `event`. `deleteLink` doesn't need `event` — it needs the item's `id`, which I pass myself.
  - A `<button>` inside a `<form>` defaults to `type="submit"`. Delete was submitting the form until I used `type="button"` and moved the list **outside** the form.
  - Don't mutate the state array (`push` / `splice`). New array: `setLinks([...links, newLink])` to add, `setLinks(links.filter((link) => link.id !== id))` to delete.
- **What confused me:**
  - I couldn't get my head around `useState` on an array until I just wrote `useState([])`.
  - I again forgot to put `event` as `submit`'s parameter. It's confusing because it does not throw an error and just works (old global `event`).
  - Overall the lesson was super confusing at first — I had no idea how to access stuff, how to render, etc.
  - The biggest problem was Delete: I had no clue how I would pass it the link to remove. Also Delete felt like it ran Submit (`"Enter all fields"`) until I learned about default `type="submit"`.
  - `const` + arrow vs `function` + why `event` is there looked like two different React rules. They're not.

## Lesson 33 — React-props
- **Date:** 2026-08-15 · Streak day 25
- **What I did:** I created a new component in a new file (`LinkItem.jsx`), imported it into `App.jsx`, and used it in the `.map()` so each link row is its own component with props.
- **What I learned:**
  - **Props** is one object. JSX attributes are just a nicer way to pass it:
    ```jsx
    <LinkItem title={link.title} url={link.url} onDelete={() => deleteLink(link.id)} />
    ```
    inside the component that's `props.title`, `props.url`, `props.onDelete`.
  - Importing a component from another `.jsx` file: `import LinkItem from "./LinkItem.jsx"`.
  - `key={link.id}` stays on `<LinkItem>` in the `.map()`, not inside `LinkItem`.
  - `deleteLink` stays in `App` because `App` owns `links` / `setLinks`. `LinkItem` only tells the button what to run (`onClick={props.onDelete}`). It does call that function on click — it just doesn't know the name `deleteLink` and doesn't touch the array. **App decides what delete means; LinkItem decides when (on click).**
  - Put a newline/`return` of JSX inside `()` so React doesn't return `undefined`:
    ```jsx
    return (
      <li>...</li>
    );
    ```
- **What confused me:** I put a line break after `return` in `LinkItem.jsx` and it didn't return the `<li>`. Packing the return in `()` fixed it.

## Lesson 34 — useEffect + localStorage
- **Date:** 2026-08-16 · Streak day 26
- **What I did:** Made the React link saver remember links after refresh — load from `localStorage` as the starting `useState`, save with `useEffect`.
- **What I learned:**
  - A **side effect** here means talking to the outside world (`localStorage`), not computing the UI. `useEffect` = after React has painted, also do that.
  - `[links]` = run the effect after render if `links` changed. More accurate to save both: `[links, nextId]`.
  - Load with `useState(() => { ... getItem ... })` so it runs **once** as the initial value. Two effects (load + save) can **race**: if save runs first with `[]`, it erases the stored data.
  - Same `JSON.stringify` / `JSON.parse` / `null` check as Lesson 24.
  - **Spread (from earlier today):** `[...links, newLink]` first builds **one** new array `[links[0], links[1], …, newLink]`. Then `setLinks` gets that **one** array — not `setLinks(item0, item1, newItem)`.
- **What confused me:** Didn't have a definition for "side effect" until after. The race (save before load wiping storage) made sense.

## Lesson 35 — Fetch in React
- **Date:** 2026-08-16 · Streak day 26
- **What I did:** Built a GitHub profile loader in React — type a username, submit, `useEffect` fetches the API, show avatar + repo count.
- **What I learned:**
  - `fetch` is a side effect (network). Don't call it at the top of `App()`. Put it in `useEffect` (or in a click/submit handler).
  - Split **input** (what I type) from **username** (what I fetch). Submit copies input → username. Effect depends on `[username]` so typing doesn't fetch every keystroke.
  - The effect callback cannot be `async`. Define `async function load()` inside and call `load()`. Skip fetch if `username` is empty.
  - Same fetch as Lesson 25: two awaits, `response.ok`, `try` / `catch`, `name || login`.
  - `{profile && (<img ... />)}` — `&&` in JSX: if `profile` is falsy (`null`), show nothing; if it's the object, show the img. Need `useState(null)` because `[]` is truthy and would still try to draw the image.
  - GitHub **403 Forbidden** is often the **rate limit** (~60 requests/hour, and Strict Mode can double fetches in dev). My catch said "could not find this profile" for every error, so 403 looked like a missing user. Check Network tab: 404 vs 403.
- **What confused me:** The `{profile && ( <img /> )}` syntax. Also every search became Forbidden until I learned about the API rate limit.