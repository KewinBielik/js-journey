# Lesson 36 — Mini-project: Repo explorer (React)

Vanilla version: Lesson 26. Today you rebuild it in React with tools you already have:

- Fetch + `useEffect` (Lesson 35)
- List in state + `.map()` (Lesson 32)
- Child component + props (Lesson 33)
- `localStorage` + `useEffect` (Lesson 34)

**No new hooks.** Peek at old folders; don’t copy whole files.

---

## What you’re building

Type a GitHub username → see their **repos** → star favourites → **stars survive refresh**.

Endpoint (array, not one user object):

```
https://api.github.com/users/KewinBielik/repos
```

Open that in a tab first. Pick fields to show (`full_name` / `html_url` / `description` / …). `description` can be `null` — use `||` like before.

**GitHub rate limit:** ~60 requests/hour. If you get **403**, wait; it’s not your JSX. Strict Mode may fetch twice in dev.

---

## Two kinds of data (same as Lesson 26)

| | Source | Persist? |
|---|--------|----------|
| **Repos** | GitHub | **No** — refetch |
| **Favourite ids** | You | **Yes** — `localStorage` |
| **Last username** | You | **Yes** — so refresh can search again |

Do **not** `setItem` the repo array. Borrowed data.

---

## Suggested shape

**`App`** owns: input vs submitted username, `repos` array, `status`, `favIds`, load/save favs (and last username). Fetch when `username` changes (Lesson 35). Skip fetch if username is empty.

**`RepoItem`** only displays one row: name as link, description, favourite button. Props for the data + `onToggleFav` (same idea as `onDelete`). `key={repo.id}` on `<RepoItem>`. CSS: `.item`, `.info`, `.name`, `.desc`, `.btn-fav`, `.is-fav`.

Favourite: store **repo `id`**s (not names). Toggle with a **new** array — `includes` to check, spread to add, `.filter` to remove. No `.push` / `.pop` on state.

---

## Run it

```powershell
cd C:\Users\kewin\Desktop\js-journey\day-36-react-repos
npm install
npm run dev
```

---

## Goals

**1.** Submit → fetch `/repos` → `console.log` the array. Loading + `response.ok` + `try` / `catch`. Empty input does not fetch.

**2.** `.map()` into `RepoItem`. Links: `target="_blank"` `rel="noopener"`.

**3.** Favourite button toggles `is-fav`. Ids in `localStorage` (load with `useState(() => ...)`, save with `useEffect`). Refresh, search the same user — stars still there.

**4.** Last username in `localStorage`. Refresh → input/username restored → fetch runs again. **Repos** still come from the network, not from storage.

**Skip:** rename, pagination, extra hooks.

---

## Checklist

- [ ] `KewinBielik` lists real repos with working links
- [ ] Bad username → error, not a crash
- [ ] Stars survive refresh
- [ ] Repo list is **not** saved to `localStorage`
- [ ] `RepoItem` has no `fetch` / `localStorage`

---

## When you’re done

1. Lesson 36 in `../progress.md`
2. Why don’t you save the repo array?
3. Why favourite **ids**, not names?
