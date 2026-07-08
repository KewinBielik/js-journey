# Lesson 17 — More HTML Tags (images, emphasis, links)

You built a page with headings, paragraphs, lists, and sections. Today you add **four new tools** —
one at a time, with syntax first, then your turn.

**Still no CSS. No JavaScript.**

---

## Where today's code goes (structure map)

You are **extending** your About page. Everything visible still lives in `<body>`:

```
<body>
│
├── <header>          (keep from Lesson 16 — tweak if you want)
│
├── <main>
│     ├── <section id="about">
│     │     ├── <img>           ← NEW today (inside about)
│     │     ├── <p> with <strong> and <em>   ← NEW today
│     │     └── ...
│     │
│     └── <section id="learning">
│           ├── <ul> ...        (unordered — no order needed)
│           └── <ol> ...        ← NEW today (ordered steps)
│
└── <footer>
      └── external link with target="_blank"   ← NEW today
```

---

## Concept 1 — Images: `<img>`

Images use a **self-closing** tag (no `</img>`):

```html
<img src="https://picsum.photos/200" alt="A random placeholder photo">
```

| Attribute | Required? | Meaning |
|-----------|-----------|---------|
| `src` | Yes | URL or path to the image file |
| `alt` | Yes | Text description if image fails to load or for blind users |

**Always write `alt`.** It's required for accessibility.

Put the image **inside** `<section id="about">`, above or below your paragraph.

---

## Concept 2 — Emphasis: `<strong>` and `<em>`

```html
<p>I am learning <strong>JavaScript</strong> and I <em>really</em> enjoy it.</p>
```

| Tag | Meaning | Default look |
|-----|---------|--------------|
| `<strong>` | Important text | Bold |
| `<em>` | Emphasized text | Italic |

Use these instead of `<b>` and `<i>` — they describe **meaning**, not just appearance.

---

## Concept 3 — External links that open in a new tab

```html
<a href="https://github.com/KewinBielik" target="_blank" rel="noopener">My GitHub</a>
```

| Attribute | Meaning |
|-----------|---------|
| `href` | Full URL (starts with `https://`) |
| `target="_blank"` | Open in a new browser tab |
| `rel="noopener"` | Security best practice with `target="_blank"` |

Same-page links (`href="#about"`) stay in the same tab. **External** links often use `target="_blank"`.

---

## Concept 4 — Ordered list: `<ol>`

You already know `<ul>` (bullets). **`<ol>`** = numbered list when **order matters**:

```html
<h3>My learning plan</h3>
<ol>
    <li>Learn JavaScript fundamentals</li>
    <li>Build projects</li>
    <li>Apply for remote jobs</li>
</ol>
```

Add this **inside** `<section id="learning">`, **below** your existing `<ul>`.

---

## Full example (read, then write your own)

```html
<section id="about">
    <h2>About me</h2>
    <img src="https://picsum.photos/200" alt="Placeholder profile photo">
    <p>I am learning <strong>JavaScript</strong> one hour a day. My goal is a <em>remote developer job</em>.</p>
</section>

<section id="learning">
    <h2>What I'm learning</h2>
    <ul>
        <li>Variables and functions</li>
        <li>Arrays and the DOM</li>
    </ul>
    <h3>My plan</h3>
    <ol>
        <li>Finish JS fundamentals</li>
        <li>Learn HTML &amp; CSS properly</li>
        <li>Build a portfolio</li>
    </ol>
</section>

<footer>
    <p><a href="https://github.com/KewinBielik" target="_blank" rel="noopener">My GitHub</a></p>
</footer>
```

Note: `&amp;` in HTML = the `&` character in text.

---

## Your tasks (in `index.html`)

1. **Copy your Lesson 16 page** into `index.html` (or rebuild the same structure).
2. **TODO 1:** Add an `<img>` with `src` and `alt` inside `#about`.
3. **TODO 2:** In your about `<p>`, wrap one word in `<strong>` and one in `<em>`.
4. **TODO 3:** Inside `#learning`, add an `<h3>` + `<ol>` with at least 3 steps (below your `<ul>`).
5. **TODO 4:** Update your GitHub link in the footer with `target="_blank"` and `rel="noopener"`.

Open in browser → refresh → check image loads, list numbers show, link opens new tab.

---

## Checklist

- [ ] Image has both `src` and `alt`
- [ ] One `<strong>` and one `<em>` in a paragraph
- [ ] `<ol>` has numbered items (3+)
- [ ] GitHub link opens in new tab
- [ ] You can explain what `alt` is for

---

## When you're done

1. Write Lesson 17 in `../progress.md`.
2. Explain: what's the difference between `<ul>` and `<ol>`?
3. Tell me one thing that confused you.
