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

## Lesson 36 — Mini-project: Repo explorer (React)
- **Date:** 2026-08-17 · Streak day 27
- **What I did:** Assigned a few `useState`s, made submit fetch the repo list, and `.map()` to show repos on the screen. Not finished yet (no favourites / persist).
- **What I learned:**
  - Looking at old code before starting helped — I remembered most of the logic and only had to check syntax a few times (`await`, etc.).
  - `.map()` with JSX: if you use `{ }` after `=>`, that's a **function body** and you must `return` the JSX. I wrote `repos.map((repo) => {})` which returns `undefined` for every item. Use parentheses to return JSX directly:
    ```jsx
    repos.map((repo) => (
      <li key={repo.id}>...</li>
    ))
    ```
    `{ }` = block (needs `return`). `( )` = return this value.
- **What confused me:** `.map()` from memory was hard. Even after looking at day 32 I still used `{ }` and couldn't spot that small detail for a while.

*Part 2:*
- **Date:** 2026-08-18 · Streak day 28
- **What I did:** Started favourites — `addFavourite(id)` updates a `favIds` array (add with spread, remove with `.filter`). Stopped for the day before wiring it to the button the React way. Not finished.
- **What I learned:**
  - Don't flip `className` on `event.target` (vanilla). React will overwrite it on the next render. The class should come from state: `favIds.includes(repo.id)`.
  - Pass two props: `isFav={...}` (boolean) and `onToggleFav={() => addFavourite(repo.id)}` (callback with the id already baked in). `RepoItem` doesn't need to call `addFavourite` itself or poke the DOM.
- **What confused me:** Felt like I had to call `addFavourite` from `isFav` and also pass the id. That was mixing two sources of truth (state + the button's class). One source: `favIds`.

*Part 3:*
- **Date:** 2026-08-19 · Streak day 29
- **What I did:** Finished the React repo explorer — favourite stars from `favIds` + `isFav` boolean, persist fav ids and last username with `localStorage`. Do not save the repo list.
- **What I learned:**
  - Class on the button: `className={props.isFav ? "btn-fav is-fav" : "btn-fav"}` (or a `let` string built from that boolean). Same thing — derived from props, not from the DOM.
  - Repos are borrowed (GitHub) → refetch. Favourite **ids** and last username are mine → `localStorage`. Ids, not names, because names aren't unique across users.
  - GitHub page link is `html_url`, not `url`.
- **What confused me:** Nothing new today — wiring the boolean to the class clicked after yesterday.

## Lesson 37 — Node.js (files)
- **Date:** 2026-08-20 · Streak day 30
- **What I did:** Ran `node script.js`, wrote/read `notes.json` with `fs`. First run: no file yet (`ENOENT`); later runs read the file and it grew each time.
- **What I learned:**
  - Node runs JS in the terminal — no browser, no `localStorage`. `fs` reads/writes files instead.
  - Same JSON round-trip: `JSON.stringify` before write, `JSON.parse` after read. `null, 2` pretty-prints the file.
  - Read first, then `push`, then write — otherwise every run overwrites from a hardcoded array.
  - `ENOENT` = file not found. `try` / `catch` lets the script continue and still create the file. `console.log(error)` dumps a huge stack; a short message is enough.
- **What confused me:** Nothing much — lesson was simple. The first-run error looked like a crash but the script actually kept going.

## Lesson 38 — Express
- **Date:** 2026-08-21 · Streak day 31
- **What I did:** Installed Express, made `server.js` listen on port 3000. `GET /notes` sends JSON (from `notes.json` via `fs` if the file exists). `GET /hello` sends different JSON. Opened the URLs in the browser.
- **What I learned:**
  - Lesson 37's script runs and **exits**. Express **stays running** and waits for HTTP. Stop with `Ctrl+C`. Restart after code changes.
  - A **route** is "this URL path → this function." `app.get("/notes", ...)` vs `app.get("/hello", ...)`.
  - `res.json(...)` sends a JS value as JSON (Express does the stringify). Same kind of thing as GitHub's API, on `localhost`.
  - `fs` only sees files in the folder you ran `node` from. Copy or create `notes.json` next to `server.js` — it's not `notes.js` and it's not in `day-37` automatically.
- **What confused me:** Thought I had to read Lesson 37's `notes.json` from the other folder / a `notes.js` file. The file has to live (or be copied) into `day-38-express`.

## Lesson 39 — React fetches Express (CORS)
- **Date:** 2026-08-24 · Streak day 32
- **What I did:** React app `fetch`es `http://localhost:3000/notes`. Saw CORS in the console, then `npm install cors` and `app.use(cors())` on the server. Listed titles from the API.
- **What I learned:**
  - **Origin** = protocol + host + **port**. `localhost:5173` and `localhost:3000` are different origins. The **browser** blocks the `fetch` until **Express** allows it (`cors`). You don't fix CORS in React.
  - Two terminals: API + Vite both have to stay running.
  - Don't put `fetch` in `useState(() => ...)`. `async` returns a **Promise**, so `list.map` blows up (`map is not a function`).
  - Load once with `useEffect(..., [])` then `setList(data)`. That is **not** an infinite loop. A loop is `useEffect(..., [list])` **and** `setList` inside — watching the thing you change.
- **What confused me:** Thought `setList` inside an effect that "uses the list" would loop forever. Empty `[]` means run after first paint only, even if you `setList` once after fetch.

## Lesson 40 — POST to my API

*Part 1: the server side*
- **Date:** 2026-08-26 · Streak day 33
- **What I did:** Added `app.use(express.json())` and a `POST /notes` route — builds the note, `push`, `saveNotes()`, sends it back with 201. Rejects an empty title with 400. Tested from the DevTools console, `notes.json` grew. React form not done yet.
- **What I learned:**
  - `GET` asks for data, `POST` carries data. Same `/notes` path, different **method**, so `app.get` and `app.post` don't collide.
  - `app.use(express.json())` is what parses the body. Without it `req.body` is `undefined`.
  - `fetch`'s **second argument**: `method`, `headers: { "Content-Type": "application/json" }`, and `body: JSON.stringify(...)`. The body is a string — same round-trip as `localStorage`.
  - Status codes are the reply's meaning: **201** created, **400** your request was bad, **500** the server broke.
  - Validate on the **server** too, not just in the form. Anyone can call the API without my page.
  - No `localStorage` on the server — that's a browser (`window`) API. Node persists to files.
  - `chrome://newtab` can't `fetch` my API: Chrome's **Content Security Policy** only lets that page talk to `chrome://` URLs. Different thing from CORS — CSP = who *this page* may call, CORS = who may call *this server*. Run the console test from a real `http://` page.
- **What confused me:** How to keep `nextId` across restarts. First idea was to store it as the first element of the notes array — bad, that array would then hold two kinds of thing and every `.map()` would have to skip it. Went with deriving it instead:
  ```js
  const nextId = notes.length ? Math.max(...notes.map((n) => n.id)) + 1 : 1;
  ```
  Nothing extra to save and it survives restarts because it's recomputed from the file. Downside: ids get **reused** after a delete. Fine now (no DELETE yet), will need a stored counter or `crypto.randomUUID()` later.

*Part 2: the React form*
- **Date:** 2026-09-04 · Streak day 34
- **What I did:** Came back after a week off. New PC needed Node (installed via nvm) and `npm install` in both folders. Built the form — two controlled inputs, submit with `preventDefault`, POST with the options object, then re-fetch the list. Notes survive refresh and a server restart.
- **What I learned:**
  - `npm install` with no package name just reads `package.json` — that's why gitignoring `node_modules` is fine across two PCs.
  - After a POST you either append the note from the response or re-fetch the whole list. I picked re-fetch: one extra round trip, but the page always matches the server.
  - Extracted `load()` out of the `useEffect` so both the effect and `sendNote` can call it. Before that I had the same fetch block written twice.
  - Server-side validation needs to check `undefined` *before* calling `.trim()` on it, otherwise a body with no `title` key crashes the route instead of returning 400.
- **What confused me:** Nothing new — but I made the `event` parameter mistake for the third time. `onChange={updateInputTitle}` with `function updateInputTitle()` and no parameter still works because of the old global `event`, so it never errors. Third time is enough: the handler always gets the event, always name it.

## Lesson 41 — Route parameters and delete in API
- **Date:** 2026-09-09 · Streak day 35
- **What I did:** Added a "delete note" option to the API using route parameters, plus a DELETE button on every note. Then reproduced the id-reuse bug I predicted last lesson and fixed it with random IDs.
- **What I learned:**
  - **Route parameters:** `app.delete("/notes/:id", ...)` — `:id` is a placeholder that matches anything, and the value lands in `req.params.id`. One route handles every note instead of one route per note.
  - `req.params.id` is **always a string**, because a URL is just text. My notes had number ids, so `note.id === req.params.id` was `7 === "7"` → `false` and nothing got deleted. Fixed with `Number()`. Same strict `===` rule from Lesson 3, showing up somewhere new.
  - POST puts its data in the **body**, DELETE puts it in the **URL** — because a note is a thing at an address (`/notes/7`). So the fetch is just `fetch(url/id, { method: "DELETE" })` — no headers, no body, nothing to send.
  - **404 is not a crash.** It's the correct answer to "delete note 999" when there is no note 999. I'd only ever seen 404 happen *to* me (Lesson 25); now I'm the one sending it.
  - **The id-reuse bug, reproduced on purpose.** `Math.max(...ids) + 1` only reuses an id when you delete the *highest* one — so it's intermittent, which is worse. Two tabs open: tab A deletes note 11 and adds a new note that gets id 11 again; tab B (never refreshed) clicks delete on its stale note 11 and destroys the new note instead. The server did nothing wrong and returned success. No error anywhere.
  - **Why `crypto.randomUUID()` fixes it:** an id should be assigned once and never reused, not recomputed from whatever the array currently holds. Now a stale delete gets a clean 404 — "that's gone" — instead of silently hitting a different note. `crypto` is a global in Node 19+, no import needed (same Web Crypto API as the browser).
  - Once ids were UUIDs I could drop `Number()` — they're strings on both sides now. I wiped the old notes to avoid mixed types; a real app would need a migration script instead.
- **What confused me:** Nothing was confusing but I had to look up functions like `find()` and `some()`. I used `some()` to check existence and then `filter()` to remove — comparing length before/after would do it in one pass with the condition written once, though mine reads more clearly, so it's a trade rather than a fix. The console commands which use `.then()` are still a bit mysterious.


## Lesson 42 — PUT and editing a note

*Part 1: the server + extracting the component*
- **Date:** 2026-09-14 · Streak day 36
- **What I did:** Wrote the `PUT /notes/:id` route, pulled `validateNote()` out so POST and PUT share it, extracted the `<li>` into a `NoteItem` component, and started edit mode in the UI. Edit is not functional yet.
- **What I learned:**
  - I managed to write the PUT syntax by copying `.post`, but I forgot the `:id` in `/notes/:id` and used `body.id` instead of `params.id`. Found both by debugging. PUT is the only route that needs **both** — the id from the URL and the new values from the body.
  - `notes.find(...)` hands back a **reference** to the object inside the array, so assigning `targetNote.title = ...` edits the note that's really in `notes`. Same rule as Lesson 28 (passing an array into a function and mutating it).
  - The client can't overwrite the id, because I only assign `title` and `description` — I never spread `req.body` in. The server still owns the id, like in Lesson 40.
  - **Validation written once.** Pulled the POST checks into `validateNote(body)` that returns an error string or `null`. Fourth time this duplication pattern has shown up (the `load()` copy in 40, `some`+`filter` in 41, now this).
  - Extracting the note into a component was quite hard, I had to look up Lesson 33. I spent a lot of time fixing a bad import that turned out to be a simple typo.
  - **`if` before `return` in a component is fine** — it's the normal React "early return" pattern, and it's better than a `display: none` toggle, because the branch that doesn't render doesn't exist in the DOM at all rather than being hidden.
  - I put the editing state in `App` (`editNoteId`, `editTitle`, `editDesc`) rather than inside `NoteItem` — Option A from the lesson. Only one note can be edited at a time, which is what I want.
- **What confused me:** Nothing blocking, mostly the component extraction. Still to finish: Save/Cancel, the PUT call from React, and filling the edit inputs with the note's current text (right now clicking EDIT leaves them empty because I only set `editNoteId`).
- **Bugs found in review, to fix next session:**
  1. `updateInputTitle` and `updateInputDesc` are each declared **twice** in `App.jsx` — once for the create form, once for the edit fields. JS allows it and silently keeps the last one, so the create form's inputs now write to the *edit* state and typing in them does nothing. No error anywhere.
  2. The PUT route ends with `res.status(201)` and never sends — `res.status()` only sets the code, so the request hangs until it times out. Needs `.json(...)` or `.end()`, and 200/204 rather than 201 (nothing was created).
  3. `console.log` right after `setEditNoteId(noteId)` prints the **old** id — `set...` doesn't change the variable in the call that's already running.


*Part 2: finishing edit mode — CRUD is complete*
- **Date:** 2026-09-15 · Streak day 37
- **What I did:** Fixed the three bugs from yesterday (duplicate handler names, the PUT that never replied, the stale `console.log`). Wired up Edit → Save/Cancel with a real PUT. My API now does all four of CRUD.
- **What I learned:**
  - **PUT vs PATCH:** PUT changes the whole note to whatever I sent; PATCH changes only the fields it got and leaves the rest as they were.
  - **Why each method takes what it takes:** DELETE needs only the URL, because all it has to know is *which* note. POST needs only the body, because the note doesn't exist yet — there's no id to point at, POST is what creates it. PUT needs both: which note, and what the new values are.
  - **Where I put the editing state:** in `App.jsx`, because it felt more natural and simpler. If I wanted multiple notes editable at once I could still keep it in `App` as an array of edits, each referencing its note by id. State inside a component would have been new and I wasn't sure I should go that way.
  - **`res.status()` doesn't send anything** — it only sets the code and returns `res`. The reply goes out on `.json()` or `.end()`. Yesterday's PUT set 201 and then just hung.
  - **Duplicate function declarations are legal in JS** and the last one silently wins. Two handlers with the same name broke my create form with no error at all.
  - **A setter doesn't change the variable in the call that's already running.** `setEditNoteId(id)` then logging `editNoteId` prints the old one. Related: my SAVE handler calls `editNote(...)` and then immediately clears the edit state, and that's safe — `editNote` already read `editTitle` / `editDesc` from the current render's closure, and a setter doesn't reach back and change those.
  - **Extracting the shared `if` around `validateNote` is possible** — the tool is *middleware*, the same thing as `app.use(cors())`, except passed to one route: `app.post("/notes", requireValidNote, (req, res) => ...)`. The middleware calls `next()` to mean "fine, carry on". Not worth it at two routes, but it's the answer to "can this be written once too?"
- **What confused me:** I asked whether the four lines that *call* `validateNote` could also be deduplicated, since both routes repeat them — answer above: yes, via middleware, but duplication that small is a fair price for keeping the route readable.
- **Bug found in review:** clicking EDIT clears `editTitle` / `editDesc` to `""` instead of pre-filling them with the note's current text. So editing only the title sends `description: ""` and **wipes the description** — exactly the PUT-vs-PATCH trap the lesson warned about, reproduced by accident. Fix: pre-fill both from the note when opening edit mode.
- **On the database question:** my guess was "safer and can be accessed different ways". The sharper answer is that `fs.writeFileSync` rewrites the *entire* file on every single change — two requests arriving together can interleave and lose data, the whole dataset has to fit in memory, and there's no way to read or update one note without loading all of them. Same class of problem as the two-tab experiment in Lesson 41.


## Lesson 43 — SQL on its own (node:sqlite)
- **Date:** 2026-09-17 · Streak day 38
- **What I did:** A standalone script, no Express and no React. Created a `notes` table, then INSERT / SELECT / UPDATE / DELETE against it. Ran the no-`WHERE` UPDATE on purpose to see the damage.
- **What I learned:**
  - **The vocabulary.** The *database* is the whole `notes.db` file and can hold many tables. A *table* is what my array used to be. A *row* is one note object. A *column* is a property every row has. The *schema* is the set of rules limiting what can go in.
  - **There is no `saveNotes()`** because I work directly on the data in the file instead of holding an array and rewriting the whole thing every time.
  - **`?` is a slot for data that can never be read as SQL**, so a user can't smuggle code in as a value and wreck the database — and it also covers the accidental case, like a title with an apostrophe in it.
  - **`NOT NULL` does not mean "not empty".** I set `description TEXT NOT NULL` without much thought, but it still accepts `""` — it only blocks a *missing* value. Exactly the same distinction that bit me in `validateNote` two days ago, one layer down.
  - **`.run()` vs `.all()`.** I used `.all()` for UPDATE and DELETE. It works, but `.all()` means "give me the rows" and returns `[]`. `.run()` is the right one and returns `{ changes, lastInsertRowid }` — and `changes === 0` is how I'll detect "no such id" in Lesson 44, replacing `notes.find(...) === undefined`.
  - **A missing `WHERE` hits every row.** Valid SQL, no complaint, all 9 rows overwritten with the same text.
- **What confused me:** The lesson described the methods as `db.exec(sql)` and at first I didn't realise "sql" meant the SQL code itself, in backticks. It took some research to work that out — the lesson should have shown one literal call first.
- **Answers to the closing questions:**
  - *What can the schema take over from `validateNote`, and what can't it?* I thought the schema couldn't handle `"  "` so `trim()` has to stay in code. That's right about `NOT NULL`, but SQLite can go further with a constraint: `title TEXT NOT NULL CHECK (length(trim(title)) > 0)` makes a whitespace-only title impossible to store. What can't move into the schema is anything needing context the database doesn't have — and above all, turning a constraint violation into a useful **400 + message**. The database only throws; the route decides what the client is told.
  - *What should `GET /notes` do at 10,000 notes?* My guess was "read only the first or last x" — that's right, and it's called **pagination**: `SELECT * FROM notes ORDER BY title LIMIT 20 OFFSET 40`. Related: `SELECT COUNT(*)` gives the total without transferring a single note, which a JSON array can't do.

## Lesson 44 — SQLite under the Express API
- **Date:** 2026-09-17, 2026-09-18 and 2026-09-23 · Streak days 38–40
- **What I did:** Swapped the storage under the API. Deleted the `fs` import, the module-level `notes` array and `saveNotes()`; added `node:sqlite` with the same schema as Lesson 43. All four routes run SQL, both 404s come from `result.changes === 0`, and `GET` has an `ORDER BY`. **The client folder was not touched at all** — diffing it against Lesson 42 comes back empty, which was the real goal. Then did both stretches: a `migrate.js` inside a transaction, and all SQL moved into `db.js`.
- **What I learned:**
  - **An API is a promise about what goes in and what comes out.** I replaced the whole storage layer and React never noticed. But my POST broke that promise without anything complaining: it started replying with `{changes, lastInsertRowid}` instead of the note. It only looked fine because my client never reads that response.
  - **`changes === 0` is the 404.** No need to look the note up first and then act on it. One statement does the work and tells me whether it hit anything.
  - **`CREATE TABLE IF NOT EXISTS` does nothing once the table exists.** It doesn't add columns or change types. I added `DEFAULT CURRENT_TIMESTAMP` to my code, but the real table in `notes.db` never got it, so new notes got `created_at = null`. My schema lives in two places, the code and the file, and they only match if something keeps them in sync. That something is a migration.
  - SQLite ignores most column types. A `DATE` column still stores text. `TEXT` says what's really happening.
  - `DEFAULT CURRENT_TIMESTAMP` lets the database fill in the date, so the route doesn't have to build it.
  - **Changing a column on a table that has rows needs a rebuild.** `ALTER TABLE ... ADD COLUMN` with a `CURRENT_TIMESTAMP` default fails once the table has rows (it only worked on an empty one, which was misleading). The standard way: create `notes_new`, copy the rows over, drop `notes`, rename `notes_new` to `notes`.
  - **`COALESCE` is a value, so it goes in the `SELECT` list**, not after `FROM`. `COALESCE(created_at, CURRENT_TIMESTAMP)` keeps the old date or fills a missing one. Name the columns instead of `SELECT *`, because `*` matches by position.
  - **Transactions:** `BEGIN`, then the work, then `COMMIT`, with `ROLLBACK` in the `catch`. It saved me once: my import had 4 columns but only 3 values, and it failed after `notes` was already dropped. The rollback put everything back. A half-finished migration is worse than one that never started.
  - A migration has to be safe to run once. Deleting `notes.json` after the import stops a second run from adding every note again.
  - Before this lesson I had fixed schema changes by deleting the database, twice. Fine for practice data, impossible with real users.
  - **Layers should only pass plain data.** I first passed the whole `req` into `changeNote`, so `db.js` had to know about `body` and `params`, which is HTTP stuff. And I returned SQLite's raw result, so the routes had to know about `changes`, which is database stuff. Now `db.js` takes plain values and returns `true` / `false`, and each file knows only its own side.
  - `.run()` returns an object, so `result === 0` is always false. It has to be `result.changes === 0`.
  - Node needs the `.js` in `import ... from "./db.js"`. Vite fills it in for React files, Node doesn't.

### TO FIX before this lesson is done — all done 2026-09-18
- [x] **POST replied with the wrong thing.** `res.status(201).json(result)` sent `{changes, lastInsertRowid}` instead of the note. Since Lesson 40 this route has returned the created note so the client can learn the id the server chose. Now builds `newNote` and sends that. (`lastInsertRowid` is SQLite's internal row number, not my UUID.) It only *looked* fine because my client never reads the response body.
- [x] Moved `import { DatabaseSync }` up with the other imports.
- [x] Deleted the stale `// TODO (Goal 1)` block at the bottom.
- [x] Removed the leftover `console.log(req.params.id)` in DELETE.
- [x] Dropped the redundant `else` after `return` in PUT and DELETE.
- [x] Replaced `ORDER BY title` (which made a row jump position when you renamed it) with a real `created_at` column and `ORDER BY created_at`.
- ~~Edit drafts not pre-filled~~ — **this was wrong on my mentor's part**; `updateEditNoteId` has been pre-filling from `list.find(...)` since Lesson 42. Nothing to fix.

### Stretches
- [x] **Stretch A** — `migrate.js`: read the old `notes.json` into the database, then delete the JSON file. This is the migration script I said a real app would need, back in Lesson 41.
- [x] **Stretch B** — move all SQL into `db.js` (`getAllNotes`, `addNote`, `updateNote`, `deleteNote`) so `server.js` contains none. Same split as Lesson 28's `storage.js`.

### Answers to the closing questions
- **What does the client not noticing tell you about boundaries?** Each part does its own thing, so if the client changes the database still handles what it's asked, and the same in reverse — everything works on its own and can be changed separately. (The name is *separation of concerns* / decoupling. The catch: a boundary only pays off while it stays **narrow and stable**. Four routes is small enough to swap the storage in an evening. And the moment a route changes what it returns, clients break silently — which is exactly what my POST did today.)
- **What can this still not survive?** `notes.db` is still just a file on one PC. Most hosting gives you a disposable disk, so a redeploy or restart wipes it. Two copies of the server can't share it. Backups are me remembering to copy a file. The answer is a database that runs as its own service over the network (Postgres/MySQL) — the SQL itself barely changes. On a different axis: there's still no authentication, so anyone who can reach the URL can delete everything.


## Lesson 45 — Middleware
- **Date:** 2026-09-23 · Streak day 40
- **What I did:** Wrote my own middleware: a request logger on every request, `requireValidNote` on POST and PUT (so the validation lines are gone from both routes), a catch-all for unknown paths, and an error handler for the stretch. The client folder is identical to Lesson 44.
- **What I learned:**
  - **A middleware is `(req, res, next)`.** It runs before the route and has two ways out: call `next()` to pass the request on, or send a reply and stop there. If it does neither, the request hangs.
  - **Pass the function, don't call it.** I copied the shape of `app.use(cors())` and wrote `app.use(logRequests())`, which runs my function once at startup and hands Express whatever it returns. It has to be `app.use(logRequests)`. `cors()` and `express.json()` have brackets because they are functions that *build* a middleware and return it. Same lesson as `onClick={fn}` vs `onClick={fn()}` in React.
  - **Express runs everything in file order.** Every `app.use`, `app.get` and so on goes into one list, and each request walks it from the top until something sends a reply.
  - **That's why the catch-all goes last and needs no `if`.** Routes only match their own path. A request to `/notes` gets answered by a `/notes` route, which sends a reply instead of calling `next()`, so it never reaches the bottom. Only a request nothing matched falls all the way through to the last `app.use`. Moving it last made the whole routing model click for me.
  - A route can take several functions: `app.post("/notes", requireValidNote, handler)`. Express runs them left to right.
  - **A middleware with four arguments `(err, req, res, next)` is an error handler.** It's skipped normally and only runs when something earlier threw.
  - Express 5 crashes at startup on `app.get("*", ...)`, the pattern older tutorials use. `app.use` with no path does the same job.
- **What confused me:** Why `express.json()` has to be above the routes, and what `cors()` and `express.json()` actually do. Notes below.

### What `express.json()` and `cors()` actually do
Both are ordinary middleware: they do one job to `req` or `res`, then call `next()`. (My mentor tested every line below on my installed Express.)

**`express.json()`** — a request body arrives as raw text, not an object. This middleware reads that text, runs `JSON.parse` on it, and puts the result on `req.body`. Before it runs, `req.body` is `undefined`.
- **Why it has to be above the routes:** because of file order. A route above it runs *before* anything has parsed the body. Tested: a route above it got `undefined`, the same route below it got `{ title: "x" }`.
- It only parses when the request says `Content-Type: application/json`. Without that header it skips the body, and `req.body` stays `undefined` even below it. That's why every `fetch` with a body since Lesson 40 has sent that header.

**`cors()`** — it does nothing to `req`. It adds a header to every reply: `Access-Control-Allow-Origin: *`. The *browser* checks that header and only then lets my page on `:5173` read a reply from `:3000` (Lesson 39).
- It also answers the browser's **preflight**. Before a PUT, a DELETE, or a POST with JSON from another origin, the browser first sends an `OPTIONS` request to ask "is this allowed?". `cors()` replies `204` with the allowed methods and **does not call `next()`**, so the request never reaches my routes. That's the "send a reply and stop" way out, from a middleware I didn't write.

### TO FIX
- [x] **`requireValidNote` replies twice on a valid note.** After `next()` there's no `return`, so the line below still runs:
  ```js
  if (error === null) next();
  res.status(400).json(error);
  ```
  `next()` runs the route, the route sends 201, and then the middleware tries to send a 400 on top. Tested: the client gets its 201, but the server logs `ERR_HTTP_HEADERS_SENT` twice, because the error handler then tries to send a 500 too. It only looks fine from the browser. Fix: `return next();`, or an `if`/`else`. It's the two-ways-out rule: one or the other, never both.
- [x] The unknown-path reply is `400`. It should be `404`: the request wasn't malformed, there's just nothing at that address.
- [x] The error handler sends `err` to the client as a string. That can leak internals like SQL errors. Log `err` on the server and send the client a plain `{ error: "Something went wrong" }`.
- [x] Both final `app.use`s sit below `app.listen`. It works, because Express reads the list on every request, but the convention is to register everything first and put `app.listen` last.

## Lesson 46 — API key on the write routes
- **Date:** 2026-10-03 · Streak day 41
- **What I did:** Added `requireKey` middleware. POST, PUT, and DELETE refuse a request whose `x-api-key` header doesn't match `API_KEY`, with status 401. GET stays open. The React app sends the header on those three fetches. Also put the bad-body reply back to 400.
- **What I learned:**
  - **The key travels in a header**, not the URL and not the body. The URL would show up in logs and history. DELETE has no body, and the body is the note, not the proof. `req.get("x-api-key")` reads it. Header names are case-insensitive, and `req.get` hides that.
  - **401 means "you didn't prove you're allowed."** Not 400 (bad body) and not 404 (no such note). A 404 here would be a lie.
  - **The key check comes first**, before `requireValidNote`. A wrong key should not get a "bad input" error. The key has to be right before anything else is checked.
  - Missing and wrong both return the same 401 and the same message. Saying which one it was would help an attacker.
  - **This is the shape of the check, not real security.** The key is a string in the React source (`useState("HardPassword123")`), and the browser downloads that file. Anyone can read it in DevTools, and this repo is public, so the string is not a secret. It only stops requests that don't already know it.
  - For this to protect anything, the secret has to live on the **server**. The user proves they know it by typing it. It must not be baked into the downloaded JavaScript.
  - "Remember me" is not "remember the IP." IPs are shared (a whole cafe can look like one address), they change (a phone on mobile data), and they can be faked. A real "remember me" is a random token the server creates after a successful login, stored in a cookie the JavaScript can't read. Not today's job.
- **What confused me:** Nothing much. The lesson was clear.

## Lesson 47 — Password hashes
- **Date:** 2026-10-03 · Streak day 41
- **What I did:** A script only, no Express. Hashed a password with `scryptSync` and a `randomBytes` salt, checked the same salt matches, wrote `checkPassword`, and confirmed the same password with two salts gives two hashes.
- **What I learned:**
  - **Store a hash, never the password.** `scryptSync(password, salt, 32)` turns the password into 32 bytes you cannot reverse. Login hashes what the user typed and compares. The original password is never kept.
  - **`scryptSync` is not a global.** `randomUUID` was. This one is imported from `node:crypto`.
  - **The salt is why the same password doesn't always look the same.** A new `randomBytes(16)` each time, stored next to the hash. It is not a secret. Without the original salt the check can never match. `Math.random()` is the wrong tool because it is predictable.
  - Same password + same salt → `timingSafeEqual` is true. Same password + different salt → not equal. `===` is the wrong comparison for buffers.
  - **The hash and the salt both stay on the server.** A login takes the password the user just typed, mixes in the stored salt, and checks the hash.
  - **`scryptSync` freezes the process while it runs.** Other requests wait. That's the sync version. The slow part is on purpose: one login can afford it, guessing millions of passwords cannot.
  - **A stolen hash and salt is not a stolen password.** The algorithm is public and there is still no reverse step. The attacker can only guess: hash a guess with the stolen salt and compare. The salt stops them reusing a precomputed table, and the slowness makes every guess cost time. A stored password would have let them log in immediately, and reuse it on other sites.
  - **The attacker does use `scryptSync`.** That's the attack. He can't write a faster one that still produces my hashes, because the slowness is the work the algorithm demands, not a slow JavaScript wrapper. Skip the work and the bytes come out different, so the comparison fails. A tighter program or a faster computer makes each guess cheaper, which is why the cost is a setting you can raise. It doesn't open a shortcut.
- **What confused me:** I thought a hash must have a pattern you can run backwards. It doesn't. Many passwords could land on the same bytes, and the function is built so finding even one of them is guessing, not reversing. Hiding the algorithm is not the protection. `scrypt` is public.