# Lesson 16 — HTML Basics (structure only)

**No CSS today. No JavaScript today.**

Goal: build a simple page using only HTML — even if it looks plain in the browser.
Plain is success. You're learning **structure**, not design.

---

## Step 1 — The document skeleton (already in your `index.html`)

Every HTML page follows this shape:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Page Title</title>
</head>
<body>
    <!-- everything visible goes here -->
</body>
</html>
```

- **`<head>`** — info *about* the page (title, charset). **Not visible** on the page.
- **`<body>`** — everything the user **sees**.

---

## Step 2 — How to write each tag (syntax you need today)

### Headings and paragraphs
```html
<h1>Main title — only one per page</h1>
<h2>Section title</h2>
<p>This is a paragraph. Write normal sentences here.</p>
```

Most tags come in **pairs**: opening tag, content, closing tag.
```html
<p>Hello</p>
     ↑      ↑
   open   close
```

### Links
```html
<a href="https://github.com/KewinBielik">My GitHub</a>
```
- `href` = where the link goes (URL or `#section-id` for same-page jump)
- Text between `<a>` and `</a>` = what the user clicks

Same-page jump:
```html
<a href="#about">About</a>
```
Later you need an element with `id="about"` for this to jump to.

### Lists
```html
<ul>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
</ul>
```
- `<ul>` = the whole list (unordered = bullets)
- `<li>` = one item inside the list

### Semantic wrappers (containers with meaning)
```html
<header>
    <!-- top of page -->
</header>

<main>
    <!-- main content -->
</main>

<section id="about">
    <!-- one topic block; id= lets links jump here -->
</section>

<footer>
    <!-- bottom of page -->
</footer>

<nav>
    <!-- group of navigation links -->
    <a href="#about">About</a>
    <a href="#learning">Learning</a>
</nav>
```

`id="about"` on a section + `href="#about"` on a link = click link → page jumps to that section.

---

## Step 3 — Full example (read this, then write yours)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Kewin — About Me</title>
</head>
<body>

    <header>
        <h1>Kewin</h1>
        <nav>
            <a href="#about">About</a>
            <a href="#learning">Learning</a>
        </nav>
    </header>

    <main>
        <section id="about">
            <h2>About me</h2>
            <p>I am learning JavaScript one hour a day. My goal is a remote developer job.</p>
        </section>

        <section id="learning">
            <h2>What I'm learning</h2>
            <ul>
                <li>Variables and functions</li>
                <li>Arrays and objects</li>
                <li>The DOM</li>
                <li>Building mini-projects</li>
            </ul>
        </section>
    </main>

    <footer>
        <p><a href="https://github.com/KewinBielik">GitHub: KewinBielik</a></p>
    </footer>

</body>
</html>
```

**Your job:** write your **own version** in `index.html` — your words, your list items.
You can use the example as reference, but **type it yourself** and customize it.

---

## Step 4 — Checklist

- [ ] Page has a `<title>` (shows in browser tab)
- [ ] One `<h1>`, section `<h2>`s
- [ ] Nav links jump to `#about` and `#learning`
- [ ] GitHub link opens your profile
- [ ] You can explain what `<head>` vs `<body>` holds

---

## When you're done

1. Write Lesson 16 in `../progress.md`.
2. Explain in your own words: what goes in `<head>` vs `<body>`?
3. Tell me if anything is still unclear — ask, don't Google blindly.

No `styles.css`. No `script.js`. Just HTML. 🧱
