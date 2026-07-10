# Lesson 19 — The Box Model (learn by experimenting)

Every element on a page is a **box**. CSS controls the size and spacing of that box.
Today you learn by **changing one thing at a time** and watching what happens.

No new HTML tags. You will mostly edit **`styles.css`**.

---

## The box model — four layers

From inside to outside:

```
┌──────────── margin (outside — pushes other boxes away) ────────────┐
│  ┌──────── border (the edge line) ────────┐                        │
│  │  ┌──── padding (inside — space around content) ────┐  │        │
│  │  │                                                 │  │        │
│  │  │              CONTENT (text, image)              │  │        │
│  │  │                                                 │  │        │
│  │  └─────────────────────────────────────────────────┘  │        │
│  └─────────────────────────────────────────────────────┘          │
└──────────────────────────────────────────────────────────────────┘
```

| Property | What it does |
|----------|--------------|
| `padding` | Space **inside** the box, between the border and the content |
| `border` | A visible line around the box |
| `margin` | Space **outside** the box, between this box and other boxes |

**Memory trick:** **P**adding = **P**ushed inward. **M**argin = **M**oves away from neighbors.

---

## Syntax (one property at a time)

```css
.card {
  padding: 16px;
}
```

```css
.card {
  margin: 24px;
}
```

```css
.card {
  border: 2px solid #ccc;
}
```

- **`px`** = pixels (fixed size)
- **`rem`** = relative to root font size (~16px by default). `1.5rem` ≈ 24px

### Shorthand with two values (optional today)

```css
padding: 10px 20px;
/*        ↑     ↑
      top/bottom  left/right
*/
```

Same pattern for `margin`. Use one value first (all sides equal), then try two if you want.

---

## How to experiment (the loop)

1. **Predict** — "If I increase padding, the text should feel more cramped inside a bigger box."
2. **Change** one line in `styles.css`
3. **Save** and **refresh** the browser
4. **Write one sentence** in `experiments.md` (or your notes): what happened?

---

## Your goals

Open `index.html` in the browser. Edit `styles.css`.

**Goal 1:** Give `.card` a `background-color` so you can *see* the box edges clearly.

**Goal 2:** Add `padding` to `.card`. Start at `8px`, then try `32px`. Notice: the **background grows** around the text.

**Goal 3:** Add `margin` to `.card`. Notice: **space between cards** grows, but the background area per card stays the same.

**Goal 4:** Add a `border` to `.card` (e.g. `2px solid #999`).

**Goal 5:** On `.highlight` (second card in HTML), give **different** padding or margin than the others — prove you can target one box.

You choose exact values. The goal is to **see** the difference between padding and margin yourself.

---

## Checklist

- [ ] You can explain padding vs margin without looking
- [ ] You changed padding and saw the inside grow
- [ ] You changed margin and saw gaps between boxes grow
- [ ] You added a border
- [ ] You styled `.highlight` differently

---

## When you're done

1. Lesson 19 in `../progress.md`.
2. Explain padding vs margin **as if the box is a picture frame** (your own analogy).
3. One thing that surprised you when you changed a value.
