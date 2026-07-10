# Lesson 18 — HTML meets CSS (how styling connects)

Until now, HTML pages looked plain because the browser only applied its **default styles**.
Today you connect a **CSS file** and change how things look.

**One new system:** how HTML and CSS talk to each other. Not flexbox, not variables — just the basics.

---

## How CSS attaches to HTML

In `<head>`, you add:

```html
<link rel="stylesheet" href="styles.css">
```

| Piece | Meaning |
|-------|---------|
| `<link>` | "Load another file into this page" |
| `rel="stylesheet"` | `rel` = relationship. This file is a **stylesheet** (CSS). |
| `href="styles.css"` | Path to your CSS file (same folder as `index.html`) |

The browser loads `styles.css` and applies every rule in it to your HTML.

**Important:** HTML and CSS are **separate files**. HTML = structure. CSS = appearance. Same split as on your laryngologist site.

---

## What a CSS rule looks like

```css
h1 {
  color: teal;
}
```

Read this as: **"For every `<h1>` on the page, set the text color to teal."**

```css
selector {
  property: value;
}
```

- **Selector** — *which* HTML elements to target
- **Property** — *what* to change (`color`, `font-size`, `background-color`, …)
- **Value** — *how* to change it (`teal`, `24px`, `#0d9488`, …)
- **`;`** — end of the line (like a period in a sentence)

---

## Three ways to select elements (today's set)

### 1. Element selector — tag name
```css
p {
  color: #333;
}
```
Targets **all** `<p>` tags.

### 2. Class selector — dot + class name
HTML:
```html
<h2 class="highlight">About me</h2>
```
CSS:
```css
.highlight {
  color: teal;
}
```
The **dot** means "elements with `class="highlight"`". You choose the class name.

### 3. Descendant selector — parent space child
```css
.nav a {
  color: blue;
}
```
Targets `<a>` tags **inside** something with `class="nav"`. Same "inside" idea as Lesson 15, now in CSS.

---

## Colors in CSS

Three common formats:

```css
color: teal;           /* named color */
color: #0d9488;        /* hex — very common in real projects */
color: rgb(13, 148, 136);  /* RGB — also common */
```

Start with **named colors** or **hex**. Your laryngologist site uses hex in variables.

---

## Your goals (not step-by-step placement)

Use `index.html` (a starter About page) and create **`styles.css`** yourself.

**Goal 1:** Link `styles.css` in `<head>`.

**Goal 2:** In CSS, make all `<h1>` text a color you like.

**Goal 3:** Add a `class` to **one** element in your HTML (your choice which). Style that class in CSS with a different `background-color` or `color`.

**Goal 4:** Style links inside `.nav` so they look different from other links on the page (use `.nav a`).

**Goal 5:** Add one rule that changes `font-size` on `<p>` tags.

You decide *where* classes go. You choose colors. The checklist is the outcome, not the exact lines.

---

## How to work

1. Edit HTML or CSS
2. Save both files
3. Refresh browser
4. If nothing changed: check the `<link>` path, selector spelling, and that the class name in HTML matches CSS (including the dot in CSS only)

---

## Checklist

- [ ] `styles.css` is linked and loading (change something obvious to verify)
- [ ] At least one element selector (`h1`, `p`, …)
- [ ] At least one class selector (`.yourClass`)
- [ ] At least one descendant selector (`.nav a`)
- [ ] You can explain: selector → property → value

---

## When you're done

1. Lesson 18 entry in `../progress.md`.
2. In your own words: how does HTML **find** the CSS file?
3. One thing that confused you.
