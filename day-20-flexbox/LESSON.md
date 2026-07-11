# Lesson 20 — Flexbox (one property at a time)

You've styled boxes. Now you learn how to **line them up** — logo left, links right, buttons in a row.

That's **flexbox**. Same rule as Lesson 19: change **one property**, refresh, observe.

---

## The one idea flexbox is built on

You apply flexbox to the **parent** (the container), not the children:

```css
.toolbar {
  display: flex;
}
```

`display: flex` tells the browser: *"Lay out my **direct children** in a flexible row."*

The children don't need any special property to start — they automatically become **flex items**.

```
Parent (.toolbar)  ← display: flex goes HERE
├── child 1
├── child 2
└── child 3
```

---

## The two axes (don't memorize — observe)

Default row layout:

```
main axis      →  →  →   (horizontal — justify-content controls this)
cross axis     ↓           (vertical — align-items controls this)
```

| Property | Axis | Plain English |
|----------|------|---------------|
| `justify-content` | main (horizontal in a row) | How items spread **left ↔ right** |
| `align-items` | cross (vertical in a row) | How items align **up ↕ down** |
| `gap` | between items | Space **between** children |

Common `justify-content` values to try:

| Value | Effect |
|-------|--------|
| `flex-start` | Everything left |
| `center` | Everything centered |
| `space-between` | First left, last right, space in middle |
| `space-around` | Space around each item |

---

## Experiment loop (same as Lesson 19)

1. Predict what will move
2. Change **one** property in `styles.css`
3. Save → refresh
4. Note what actually happened

---

## Your goals

Open `index.html` in the browser. Edit `styles.css`.

**Goal 1:** On `.toolbar`, add `display: flex`. Watch the logo and links jump into a **row**.

**Goal 2:** On `.toolbar`, add `justify-content: space-between`. Logo should hug the left, links the right.

**Goal 3:** On `.toolbar`, add `align-items: center` so logo and links line up vertically.

**Goal 4:** On `.actions`, add `display: flex` and `gap: 1rem` so the three buttons have even space between them.

**Goal 5:** Try `justify-content: center` on `.actions` and see how it differs from `space-between`.

You pick colors and extras if you want. The outcomes matter, not exact values.

---

## Checklist

- [ ] You know flex goes on the **parent**
- [ ] You tried `justify-content` and saw horizontal movement
- [ ] You tried `align-items` (or `gap`) and saw a visible difference
- [ ] You can explain `space-between` in your own words

---

## When you're done

1. Lesson 20 in `../progress.md`.
2. Explain: why does `display: flex` go on the parent, not the child?
3. What surprised you (if anything)?
