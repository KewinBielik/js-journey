# Lesson 15 — HTML & CSS Foundations

You've been controlling pages with JavaScript. Now step back and learn **how pages are built**
in the first place — the HTML structure and CSS styling that every website uses.

This is the foundation behind your laryngologist site, your todo list, and every app you'll build.

## What you'll learn today
1. **Semantic HTML** — meaningful tags (`header`, `main`, `section`, `footer`).
2. **CSS selectors** — how styles target elements.
3. **The box model** — margin, padding, border.
4. **CSS variables** — reusable colors (your laryngologist site uses these).
5. **Flexbox basics** — lining things up in a row or column.

---

## Step 1 — How to work today

Open `index.html` in your browser. Open `styles.css` side by side in Cursor.
Edit CSS → save → refresh. **No JavaScript today** — just structure and style.

---

## Step 2 — Concepts (read, then do)

### Semantic HTML
```html
<header>  <!-- top of page: logo, nav -->
<main>    <!-- the main content -->
<section> <!-- one topic block inside main -->
<footer>  <!-- bottom: contact, links -->
```
Use these instead of a dozen plain `<div>`s everywhere. It helps accessibility, SEO, and readability.

### CSS selectors
```css
h1 { }           /* all <h1> tags */
.card { }         /* class="card" */
#hero { }         /* id="hero" — use sparingly, one per page */
```
Classes are your main tool. Reuse them across elements.

### The box model
Every element is a box: **content → padding → border → margin**.

```css
.card {
  padding: 1rem;    /* space inside the box */
  margin: 1rem 0;   /* space outside the box */
  border: 1px solid #ccc;
}
```

### CSS variables (custom properties)
```css
:root {
  --brand: #0d9488;
  --text: #1f2937;
}

h1 {
  color: var(--brand);
}
```
Change `--brand` once → whole site updates. Professional sites use this pattern.

### Flexbox — simple layout
```css
.hero-actions {
  display: flex;
  gap: 1rem;           /* space between items */
  align-items: center;
}
```
Flex puts children in a row (or column with `flex-direction: column`) and handles alignment.

---

## Step 3 — Your tasks
Open `styles.css` and complete the TODOs. The HTML is already written — **you style it.**

When done:
1. Write your Lesson 15 entry in `../progress.md`.
2. Explain in your own words: what's the difference between `margin` and `padding`?
3. Tell me one thing that confused you.
