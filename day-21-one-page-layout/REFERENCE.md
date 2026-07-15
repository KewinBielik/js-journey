# Reference — One-page layout (study this, don't copy blindly)

Open **`reference-index.html`** in your browser alongside your own `index.html`.

This is a **commented example** of a simple but intentional landing page.
Read **`reference-styles.css`** — almost every block has a comment explaining **why**.

## Your hero spacing question — answered here

Look at `.hero-actions` in the reference CSS:

```css
.hero-actions {
  display: flex;
  gap: 1rem;        /* space BETWEEN children — professional and common */
  margin-top: 1.5rem;  /* space BETWEEN the paragraph above and this group */
}
```

Three professional ways to add space (all valid):

| Approach | When to use |
|----------|-------------|
| `gap` on a flex parent | Space between siblings in a row/column |
| `margin-top` on the link (or `margin-bottom` on `p`) | Space between two specific elements |
| `margin-top` on a wrapper div around the link | When you group "actions" together |

**Margin on individual elements is professional.** Designers do it constantly. `gap` is just cleaner when you have a flex group.

## Fonts — the simple rule

You don't need to hunt for fonts yet. Use the **system font stack**:

```css
font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
```

The user's OS supplies a clean font. Later you can add Google Fonts (like your laryngologist site does).

## Typical sections on a simple landing page

| Section | Purpose |
|---------|---------|
| Header | Name/logo + navigation |
| Hero | Main message + primary action (GitHub, contact) |
| About or Skills | What you do / what you've learned |
| Footer | Copyright, links |

You don't need 10 sections. **4 blocks** (header, hero, main, footer) is enough.

## How to study the reference

1. Open reference HTML — read structure
2. Open reference CSS — read comments top to bottom
3. Change **one** property in reference CSS, refresh, see what breaks
4. Go back to **your** files and improve **one** thing (e.g. add `gap` to hero)

Your version stays yours. The reference is a textbook page.
