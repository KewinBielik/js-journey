# Lesson 21 — Mini-Project: One-page layout (HTML + CSS)

Your third project — but this time it's a **webpage**, not JavaScript.

Combine what you've learned:
- HTML structure (Lesson 16–17)
- Linking CSS (Lesson 18)
- Box model — padding, margin, border (Lesson 19)
- Flexbox (Lesson 20)

**Minimal handholding.** You create the files. The checklist below is the spec.

---

## What you're building

A simple **personal landing page** in one folder:

- A **header** with your name on one side and nav links on the other (flexbox)
- A **hero** section — short intro + one call-to-action link (e.g. GitHub)
- A **main** section — what you're learning (list is fine)
- A **footer** — one line of text

It should look **intentional** — spacing, colors, readable text. Not fancy. **Clear.**

---

## Files you need

```
day-21-one-page-layout/
├── index.html    ← you write this (or copy structure from memory)
├── styles.css    ← you write this
└── LESSON.md
```

No JavaScript file.

---

## Requirements (the spec)

### HTML
- Valid document skeleton (`<!DOCTYPE>`, `head`, `body`, `title`, charset)
- `<link rel="stylesheet" href="styles.css">` in `<head>`
- Semantic tags: `header`, `main`, `section`, `footer`, `nav`
- At least one `class` you use for styling
- At least one external link (GitHub) with `target="_blank"` and `rel="noopener"`

### CSS
- At least one **element** selector (`h1`, `p`, …)
- At least one **class** selector
- At least one **descendant** selector (e.g. `.nav a`)
- **Box model** on at least one component (`padding` + `margin` or `border`)
- **Flexbox** on at least one parent (`display: flex` + `justify-content` or `gap`)
- **Centered content** somewhere using `max-width` + `margin: auto` (not huge side margins)

### Design
- Readable font sizes and colors (your choice)
- Page doesn't look like unstyled HTML defaults everywhere

---

## Suggested build order

1. HTML skeleton + link CSS (verify CSS loads with `body { background: #f9fafb; }` or similar)
2. Header HTML + flex layout
3. Main content sections
4. Footer
5. Polish spacing and colors

If stuck, **look at your Lesson 18–20 folders** — that's allowed and professional.

---

## Acceptance checklist

- [ ] Page loads, no broken layout
- [ ] Header uses flex (logo + nav visually separated)
- [ ] CSS file is separate from HTML
- [ ] Box model visible (cards/sections have breathing room)
- [ ] You can explain every class name you used
- [ ] You built it mostly from memory, not copy-paste of an entire example

---

## When you're done

1. Lesson 21 in `../progress.md`.
2. Tell me: what was hardest — HTML structure, CSS selectors, flex, or spacing?
3. Commit: `Lesson 21: one-page layout mini-project`

This is the bridge to rebuilding a real client site yourself. 🚀
