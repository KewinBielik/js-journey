# Lesson 23 — Responsive basics (media queries)

Your page looks good on a wide screen. Now make it behave on a **phone**.

One new idea: **media queries** — CSS rules that only apply when the screen is a certain size.

You already have this in your HTML (keep it):

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Without that line, phones pretend the page is ~980px wide and shrink everything. With it, CSS sees the **real** phone width.

---

## The one idea

A media query is an **if statement for CSS**:

```css
/* Always applies */
.hero h1 {
  font-size: 2rem;
}

/* Only when the viewport is 600px wide or narrower */
@media (max-width: 600px) {
  .hero h1 {
    font-size: 1.5rem;
  }
}
```

Read it as: *"If the screen is at most 600px wide, use these rules."*

- Rules **outside** `@media` = default (desktop / laptop)
- Rules **inside** `@media (max-width: …)` = overrides for small screens

Same selector can appear twice. Inside the media query, it wins **when the condition is true**.

---

## How to test (important)

Don't guess — use DevTools:

1. Open `index.html` in the browser
2. Press **F12** (or right-click → Inspect)
3. Toggle **device toolbar** (phone/tablet icon), or `Ctrl+Shift+M`
4. Pick a phone width, or drag the edge narrower
5. Watch your layout change as you edit CSS

Refresh after each save.

---

## Files

This folder starts as a **copy of your finished Lesson 22 page**. Edit here — leave `day-22-study-reference/` alone as a snapshot.

```
day-23-responsive/
├── index.html
├── styles.css
└── LESSON.md
```

---

## Experiment loop

1. Narrow the browser / use phone mode
2. Predict what will change
3. Edit **one** thing in `styles.css`
4. Save → refresh
5. Note what happened

---

## Your goals

**Goal 1 — See the problem**  
Open the page in phone width (~375px). Look at the header. Logo and nav may feel cramped side-by-side. That's what you're fixing.

**Goal 2 — Stack the header on small screens**  
Add a media query (try `max-width: 600px`). Inside it, make `.inner-topbar` a **column** instead of a row:

```css
@media (max-width: 600px) {
  .inner-topbar {
    flex-direction: column;
    gap: 0.75rem;
  }
}
```

`flex-direction: column` = main axis becomes vertical. Logo on top, nav below. You already know flex — this is just switching the axis.

**Goal 3 — Soften the nav on mobile**  
Still inside the same `@media` block (or a second one — your choice), make nav links less awkward. Ideas to try:

- `margin-left: 0` on `.nav a` (side margins feel weird in a column)
- `gap` on `.nav` with `display: flex` so links space evenly
- Center the header content with `align-items: center` on `.inner-topbar`

Pick what looks right. No single correct answer.

**Goal 4 — Shrink the hero title a bit**  
Inside `@media`, set a smaller `font-size` on `.hero h1`. Predict → change → observe.

**Goal 5 (optional) — One more polish**  
Anything that feels tight on mobile: hero padding, button row, etc. One change at a time.

---

## What you don't need yet

- A hamburger menu (that's JS + more CSS later)
- Dozens of breakpoints
- Perfect pixel matching every phone

One breakpoint + a few overrides is enough for this lesson.

---

## Checklist

- [ ] You can explain `@media (max-width: …)` in plain English
- [ ] You tested with DevTools device mode (or a narrow window)
- [ ] Header stacks (or otherwise improves) on a small screen
- [ ] Hero title is a bit smaller on mobile
- [ ] Desktop layout still looks fine when the window is wide again

---

## When you're done

1. Add Lesson 23 to `../progress.md`
2. In your own words: what does a media query do?
3. What looked wrong on mobile before you fixed it?
