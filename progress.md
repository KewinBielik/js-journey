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
- **What I did:** Modified the website from last Lesson: added an image, changed the text in paragraph to be `bold` and `italics`, changed the link to open in a new tab.
- **What I learned:** `<img>` + alt, `<strong>/<em>`, `<ol>`, external links with `target="_blank"` and `rel="noopener"`.
- **What confused me:** I was confused with `&amp;`, this is the syntax to use when you wanna write an & sign - HTML could expect a syntax after & so this it the way to tell it you actually want to write the & sign. there is also `&lt;` for `<` and `&gt;` for `>`.

## Lesson 18 — Adding CSS to HTML
- **Date:** 2026-07-10 · Streak day 9
- **What I did:** Linked `HTML` to `CSS` file, added style to all `h1`, styled all links inside `<nav>`, created my own `class` and applied it to one element, changed font of all `<p>` on site.
- **What I learned:** I learned this `selector rule` structure:
```css
selector {
  property: value;
}
```
- **What confused me:** Nothing confusing, I just had to remind myself the `rem` thing for `font-size`

## Lesson 19 — Box model experiments
- **Date:** 2026-07-10 · Streak day 9
- **What I did:** Changed `style properties` for few blocks and observed how does it affect them.
- **What I learned:** Styling is really cool and intuitive once you understand how is it structured in the boxes with `padding` and `margin`, especially as you learn more tools such as `auto`.
- **What confused me:** I was mixing up `padding` with `margin` a bit.

## Lesson 20 — Flexbox experiments
- **Date:** 2026-07-11 · Streak day 10
- **What I did:** Applied `display: flex` to `parents` and changed how their `children` inside position with `justify-content`, `align-items`, `gap`
- **What I learned:** `Flexbox` is used to have one rule on the `container` instead of `margins` and `paddings` on every `child`.
- **What confused me:** Nothing really.