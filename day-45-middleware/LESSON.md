# Lesson 45 — Middleware

In Lesson 42 you asked if the four lines that call `validateNote` could be written once,
since POST and PUT both repeat them. The tool for that is **middleware**, and you've
used it since Lesson 38 without calling it that:

```js
app.use(cors());
app.use(express.json());
```

Both lines are middleware. Today you write your own.

This is one idea, and the client doesn't change.

---

## What middleware is

A middleware is a function that runs **before** the route handler and gets three
arguments:

```js
function logRequests(req, res, next) {
  console.log(req.method, req.url);
  next();
}
```

`req` and `res` are the same objects your routes get. `next` is new. It's a function
that means "I'm done, hand this request to whatever comes next."

A middleware has exactly two ways out:

- **call `next()`** to pass the request on, or
- **send a reply** (`res.status(...).json(...)`) and stop there.

If it does neither, the request just hangs. The browser waits and nothing ever answers.
That's the same failure as your Lesson 42 `res.status(201)` that never sent anything.

---

## Order is the whole model

Express keeps one list. Every `app.use(...)` and `app.get(...)` gets added to it
**in the order they appear in the file**. Each request walks that list from the top.

```
request  →  cors  →  express.json  →  logRequests  →  app.get("/notes")  →  reply
```

This explains something you've known since Lesson 40: `express.json()` has to come
above your routes, because otherwise `req.body` is `undefined` by the time the route
runs. It's not a special rule. It's just the list order.

### Two ways to attach one

```js
app.use(logRequests);                              // every request
app.post("/notes", requireValidNote, handler);     // only this route
```

A route can take more than one function. Express runs them left to right, and each
one hands over with `next()`. Your second question from Lesson 42 was about exactly
this spot.

---

## Your goals

**Goal 1 — a request logger**
Write a middleware that logs the method and URL of every request, and attach it with
`app.use`. Click around in the React app and watch the server terminal.

Then try three experiments. Guess what will happen before you run each one:
- Delete the `next()` call. What does the browser do?
- Move the `app.use(logRequests)` line **below** all your routes. Which requests still
  get logged?
- Put it back above the routes and log `req.body` too. Put it above `express.json()`,
  then below it. What changes?

**Goal 2 — validation written once**
Write `requireValidNote(req, res, next)`. It calls `validateNote(req.body)`. If there's
an error, it replies 400 and does **not** call `next()`. If the body is fine, it calls
`next()`. Attach it to POST and PUT, then delete the repeated four lines from both
routes.

Afterwards each route should do only its real job. Test it: an empty title from the
form still gets a 400 with the same message as before.

**Goal 3 — a JSON 404 for unknown paths**
Open `http://localhost:3000/nope` in the browser. Express sends back an **HTML** error
page. The rest of your API speaks JSON, so a client that calls `response.json()` on that
page will crash.

Add one final `app.use((req, res) => ...)` that replies 404 with JSON. Where in the file
does it need to go, and why? (It has no `next`. Think about what that means.)

> Older tutorials write this as `app.get("*", ...)`. **Express 5 rejects that pattern
> and crashes at startup.** I checked it on your installed version. An `app.use` with
> no path avoids the problem.

**Goal 4 — client untouched**
`git diff` on the client folder should be empty.

### Stretch — an error handler

What happens right now if `db.js` throws? For example, if `notes.db` is locked or
the SQL has a typo. Express catches the error and sends another **HTML** page with a
500.

Express treats a middleware with **four** arguments, `(err, req, res, next)`, as an
error handler. It only runs when something earlier threw. Make one that logs the error
and replies `500` with `{ error: "..." }` in JSON. To test it, temporarily break a SQL
string in `db.js`.

**Skip:** authentication and login. That's the obvious next use of middleware, and
it's why this lesson comes first.

---

## Two terminals

| Terminal | Folder | Command |
|---|---|---|
| 1 | `day-45-middleware/server` | `npm install` then `node server.js` |
| 2 | `day-45-middleware/client` | `npm install` then `npm run dev` |

---

## Checklist

- [x] I can say what `next` does and what happens if I never call it
- [x] I can explain why `express.json()` has to be above the routes, using list order
- [x] Every request is logged
- [x] Validation lives in one middleware used by both POST and PUT
- [x] Unknown paths get a JSON 404
- [x] The client folder has no changes

---

## When you're done

1. Lesson 45 in `../progress.md`
2. `cors()` and `express.json()` are middleware. What do you think each one does to
   `req` or `res` before calling `next()`?
3. If you wanted some routes to require a password, where would that check live, and
   why is middleware a good place for it?
