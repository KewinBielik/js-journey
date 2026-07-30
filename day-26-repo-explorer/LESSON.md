# Lesson 26 — Mini-project: GitHub Repo Explorer

Your fourth project, and the first one that looks like a **real app**. Everything you've learned in the last few lessons meets in one place:

- `fetch` + `async`/`await` (Lesson 25)
- the render pattern (Lesson 12)
- `localStorage` persistence (Lesson 24)
- array methods (Lesson 9)

**Minimal handholding.** The HTML and CSS are finished — today is pure JavaScript.

---

## What you're building

Type a GitHub username → see that person's repositories → star the ones you like → **your stars survive a refresh**.

Try it with `KewinBielik`, then with someone like `torvalds` or `sindresorhus` for a long list.

---

## The one new idea: two kinds of data

This is the concept worth slowing down for, because it's how real apps are structured.

You now have **two different sources of data**, and they have different lifespans:

| | Where it comes from | How long it lives |
|---|---|---|
| **Repos** | fetched from GitHub | temporary — refetch every time |
| **Favourites** | created by *you* | permanent — belongs in `localStorage` |

The mistake beginners make is saving the fetched repos to `localStorage` too. Don't. That data isn't yours — GitHub owns it, it changes, and it's always one `fetch` away. What's genuinely yours is the *choice* of which repos you starred.

So the shape of your app is:

```
fetched repos (borrowed)  +  saved favourites (yours)  →  render()
```

Your `render()` walks the fetched list and, for each repo, asks: *"is this one in my favourites?"* If yes, draw it starred.

That question is a membership check. Two array methods do it well:

```js
someArray.includes(value)          // exact match on a primitive — string, number
someArray.some(item => ...)        // your own condition — returns true/false
```

`.some()` is new to you but it's the same shape as `.filter()` from Lesson 9 — a callback returning `true`/`false`. The difference: `.filter()` gives you back a new array, `.some()` gives you back a single `true` or `false`.

---

## Fetching for *any* username

In Lesson 25 the URL was a fixed constant. Now it depends on what the user typed, so you build it with a template literal:

```js
`https://api.github.com/users/${someUsername}/repos`
```

Note the endpoint ends in `/repos`, and this one returns an **array** of repo objects — not a single object like last time. Which is good news: an array of objects is exactly what your render pattern from Lesson 12 already handles.

**Before you write any code:** open this in a browser tab and read it.

```
https://api.github.com/users/KewinBielik/repos
```

Find the properties you'll want: the repo name, its URL, its description, its language, its star count. Pick what you want to show.

---

## Your goals

**Goal 1 — Fetch and log**

Read the username from the input, build the URL, fetch it, and `console.log` the array. Reuse what you know from Lesson 25: `async` function, two awaits, `try`/`catch`, and the `response.ok` check (a made-up username gives a 404 here too — test it).

**Goal 2 — Render the list**

Write a `render()` that draws the repos into `#repoList`. Same pattern as your todo app: clear the list, loop the data, build elements, append.

For each repo show at least the name as a **clickable link** to the repo, plus one or two extra details of your choosing. The CSS classes are listed at the top of `script.js` — `repo-item` on the `<li>`, and the others where they make sense.

**Goal 3 — Favourite button**

Give every repo a button that toggles it as a favourite. Add the `is-fav` class when it's starred so it visibly changes (the CSS is already written for it). Use whatever symbol you like for the button text.

Think about what you actually store in your favourites array. You need something that identifies a repo *uniquely* — think about whether a repo name alone is enough when two different users can both have a repo called `portfolio`.

**Goal 4 — Make favourites persist**

Save favourites to `localStorage` whenever they change, and load them when the page opens. You solved this exact problem in Lesson 24 — including the `null` case for a first-ever visit.

**Goal 5 — Prove it works**

Star two repos, refresh the page, search the same username again. The stars should still be there. Then search a *different* username and confirm your saved stars didn't get wiped.

---

## Things to think through

- Where's the single best place to save? You worked this out in Lesson 24 — the answer is the same kind of place here.
- Empty input: what should clicking Search do when the box is blank? (You wrote a guard clause for this in Lesson 12.)
- After a refresh the page is empty until you search again. Is that acceptable, or would you rather it remembered the last username too? Your call — decide deliberately rather than by accident.
- Some repos have `description: null`. What does your page show then? (Same `||` fallback trick as yesterday.)

---

## Stretch goals (only if you have time)

- A "favourites only" filter toggle
- Sort by star count or last updated
- Show how many favourites you have saved

---

## Checklist

- [ ] Searching a username lists their repos with working links
- [ ] I can explain why favourites go in `localStorage` but repos don't
- [ ] Clicking the favourite button visibly toggles the star
- [ ] Stars survive a page refresh
- [ ] A bad username shows a friendly error, not a crash
- [ ] Empty input doesn't fire a pointless request

---

## When you're done

1. Add Lesson 26 to `../progress.md`
2. In your own words: why don't you save the fetched repos to `localStorage`?
3. What did you use to identify a favourite, and why?
