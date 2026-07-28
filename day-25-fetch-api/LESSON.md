# Lesson 25 — Talking to the internet (`fetch` + async/await)

This is the most job-relevant lesson so far. Every real app you'll work on gets its data from a server. Today you do it for the first time.

You're building a tiny page that loads **your own GitHub profile** and shows it.

---

## The problem this solves

Everything you've written so far ran **instantly**. `tasks.push(...)` finishes before the next line runs.

Fetching data over the internet is different — it takes time. Maybe 50ms, maybe 3 seconds, maybe it fails because the wifi dropped. JavaScript doesn't freeze and wait for it; it keeps going and deals with the result **later**.

That "later" is what today's syntax is about.

---

## The one idea: a promise is an IOU

`fetch(url)` doesn't return the data. It returns a **promise** — an IOU that says *"I'll have your data eventually, or I'll tell you it failed."*

The keyword **`await`** means: *pause here until that IOU is settled, then give me the actual value.*

You can only use `await` inside a function marked **`async`**. That's the rule — `async` marks a function as "this one contains waiting."

```js
async function loadSomething() {
  const response = await fetch("https://example.com/data");
  const data = await response.json();
  console.log(data);
}
```

Two awaits, and this is the part that trips everyone up:

| Line | What you get |
|------|--------------|
| `await fetch(...)` | a **Response** object — headers, status code, but *not* the data yet |
| `await response.json()` | the actual **data** as a JS object/array |

Why two steps? Because the body arrives as a stream of text. `.json()` reads that text and parses it into a real JavaScript object (it's `JSON.parse` from Lesson 24, built in).

> This should feel familiar: JSON was the string format you saved to `localStorage`. Same format — the server speaks it too.

---

## Your goals

**Goal 1 — Look at the data before you code**

Open this in a browser tab:

```
https://api.github.com/users/KewinBielik
```

That's raw JSON — the exact thing your code will receive. Read it. Find the properties for your avatar image, your name, and your public repo count. You can't display data you haven't looked at.

**Goal 2 — Fetch on click**

When the button is clicked, fetch that URL and `console.log` the parsed data. Don't touch the page yet — just prove you got the object. Check that it looks the same as what you saw in the browser tab.

**Goal 3 — Show it on the page**

Use the data to fill in the elements already selected in `script.js`:
- the avatar image (set its `src`, and make it visible — it starts as `display: none`)
- your name
- how many public repos you have

You choose the wording and which properties to use.

**Goal 4 — Handle the waiting**

A real app tells the user something is happening. Before the fetch starts, put something like "Loading…" in `#status`. After the data arrives, replace it (or clear it). You now have a *sequence* — that's why `await` matters.

**Goal 5 — Handle failure**

Networks fail. Wrap your fetch in `try` / `catch` so a failure shows a friendly message instead of a silent console error:

```js
try {
  // the risky stuff
} catch (error) {
  // what to show the user
}
```

**Test it for real:** open DevTools → **Network** tab → set throttling to **Offline** → click the button. Your catch block should run. Then set it back to **No throttling** and confirm it works again.

---

## Things to think through

- What happens if you forget `async` and use `await` anyway? Try it — read the error message. Error messages are a skill.
- What happens if you forget the second `await response.json()` and try to use the Response directly? Try that too, and `console.log` what you actually get.
- `fetch` only rejects on *network* failure — a 404 still "succeeds" with `response.ok === false`. Take a look at `response.ok` and decide whether you want to check it. (Try changing the username to something nonsense and see what happens.)

---

## What you don't need yet

- `.then()` chains — the older syntax for the same thing. You'll meet it in real codebases, but `async/await` is what modern code uses. Learn one first.
- Anything about servers, Node, or backends. You're only *consuming* data today.
- API keys. GitHub's public endpoint needs none.

---

## Checklist

- [ ] I can explain in one sentence what `await` does
- [ ] I know why there are **two** awaits (Response vs data)
- [ ] Clicking the button shows real data from the internet on my page
- [ ] A "Loading…" state appears before the data arrives
- [ ] Going offline in DevTools shows my error message instead of crashing

---

## When you're done

1. Add Lesson 25 to `../progress.md`
2. In your own words: what is a promise?
3. Why can't you just write `const data = fetch(url)` and use it on the next line?
