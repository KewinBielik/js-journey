# Lesson 49 — The server remembers you

Lesson 48's login checks your password, replies `{ ok: true }`, and then forgets
you. The next request has nothing in it that says who sent it.

Today the server will **hand the browser a ticket** when you log in. The browser
will **show that ticket on every later request by itself**. The server checks the
ticket and knows it's you.

The ticket is a random string called a **token**. The thing that carries it is a
**cookie**.

Read Part 1 before touching code. Every step after it has three parts: what to
write, what to type in the console, and what you should see.

---

## Part 1 — How a cookie works

You already know a version of this from Lesson 46. Compare the two.

**Lesson 46, the API key.** *You* attached it, by hand, on every fetch:

```js
fetch(url, { headers: { "x-api-key": key } });
```

Forget that line on one fetch and that request has no key.

**A cookie.** The *server* tells the browser "keep this". From then on the
*browser* attaches it to every request to that server. Your fetch code never
mentions the token at all.

Here is the whole thing as a timeline. Read it top to bottom:

```txt
1.  YOU:      fetch POST /login   { username, password }

    SERVER:   checks the hash (Lesson 48)
              makes a random token, e.g. 9f2c4a...
              remembers it:  sessions.set("9f2c4a...", "kewinDev")
              replies 200  { ok: true }
              with a header:   Set-Cookie: sid=9f2c4a...

    BROWSER:  sees Set-Cookie and saves  sid=9f2c4a...

2.  YOU:      fetch GET /me                   ← nothing extra in your code

    BROWSER:  adds a header by itself:   Cookie: sid=9f2c4a...

    SERVER:   reads the Cookie header, takes out 9f2c4a...
              sessions.get("9f2c4a...")  →  "kewinDev"
              replies 200  { username: "kewinDev" }
```

So **"call `/me` with the cookie" just means: call `/me` after logging in.** You
don't copy the cookie or type it anywhere. The browser sends it.

Three names to keep straight:

| Name | What it is | Where it lives |
|---|---|---|
| `Set-Cookie` | a header on the **response** | server → browser, once, at login |
| `Cookie` | a header on each **request** | browser → server, every time |
| `sessions` | your `Map` of token → username | server memory |

### The one switch you must flip: `credentials: "include"`

Your Vite page is on port 5173 and the API is on port 3000. Those are different
origins (Lesson 39). For safety, a browser does **not** send or save cookies on a
cross-origin fetch unless you ask:

```js
fetch(url, { credentials: "include" });
```

That has to be on **every** fetch to this server: login, `/me`, logout. Leave it
off and two confusing things happen:

- login still replies `{ ok: true }`, but the browser throws the cookie away
- `/me` arrives with no `Cookie` header, so the server says you're not logged in

The server side of that permission is the `cors({ origin, credentials: true })`
you already wrote.

### `HttpOnly`

Your `Set-Cookie` ends with `HttpOnly`. That means **page JavaScript can't read
this cookie**. The browser still sends it, but `document.cookie` won't show it. So
a malicious script running on the page can't steal the token. This is the
"cookie the JavaScript can't read" from your Lesson 46 notes.

---

## Part 2 — Set up the test page

The console tests need to run on a page at `http://localhost:5173`. Any of your
Vite apps will do. It's only there to give the console that address.

**Terminal 1, the session server:**

```bash
cd day-49-session
npm install
node server.js
```

Stop any other server on port 3000 first.

**Terminal 2, any Vite client.** For example:

```bash
cd day-46-auth/client
npm run dev
```

Open `http://localhost:5173`. The page itself will show a loading error, because
this server has no `/notes`. Ignore that. Press `F12` → **Console**.

### Test helpers — paste these once

Paste this whole block into the console. It defines three functions so you can
just type `login()`, `me()` and `logout()` instead of retyping fetches:

```js
const api = "http://localhost:3000";

const login = () =>
  fetch(api + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username: "kewinDev", password: "veryHardPassword" }),
  }).then((r) => r.text().then((t) => console.log(r.status, t)));

const me = () =>
  fetch(api + "/me", { credentials: "include" })
    .then((r) => r.text().then((t) => console.log(r.status, t)));

const logout = () =>
  fetch(api + "/logout", { method: "POST", credentials: "include" })
    .then((r) => console.log(r.status));
```

Every helper prints the **status code** first, then the body. Reloading the page
wipes them, so paste them again after a reload.

---

## Part 3 — Check what you already built

Your login route already makes the token, stores it in `sessions`, and sends
`Set-Cookie`. Before writing anything new, confirm it works.

**Do:** restart the server (after removing the stray `const token = ran` line), then
type in the console:

```js
login()
```

**You should see:** `200 {"ok":true}`

**Then look at the cookie.** **Network** tab → click the `login` request →
**Headers** → **Response Headers**. There should be a line like:

```txt
Set-Cookie: sid=9f2c4a1b...; HttpOnly; SameSite=Lax; Path=/
```

**Then confirm HttpOnly works.** In the console:

```js
document.cookie
```

**You should see:** a string that does **not** contain `sid`. It may be empty.
That's the point of `HttpOnly`.

If you don't see `Set-Cookie`, check the request had `credentials: "include"`
and that `cors()` names `http://localhost:5173`.

---

## Part 4 — Build `GET /me`, in three small steps

`/me` answers one question: **"who am I?"** If the browser's cookie holds a token
the server remembers, it replies with the username. Otherwise it replies 401.

Don't write it all at once. Each step runs on its own.

### Step A — just look at what arrives

**Write:** a `GET /me` route that does only two things:

1. `console.log(req.get("cookie"))`. `req.get` reads a request header, the same
   as `req.get("x-api-key")` in Lesson 46.
2. reply `res.json({ seen: true })`

Restart the server.

**Do:** in the console, `login()` then `me()`.

**You should see:**
- in the console: `200 {"seen":true}`
- in the **server terminal**: something like `sid=9f2c4a1b...`

That printed line is the `Cookie` header your browser attached by itself.

**Now prove the browser is doing it.** Run this one fetch **without**
`credentials: "include"`:

```js
fetch("http://localhost:3000/me").then((r) => r.text()).then(console.log)
```

**Server terminal:** `undefined`. No permission, so no cookie. This step is the
whole lesson in miniature: same route, same code, and the only difference is
whether the browser was allowed to attach the cookie.

### Step B — pull the token out of the string

`req.get("cookie")` is **one plain string**, not an object. Express doesn't split
it for you. It can look like any of these:

```txt
undefined                          ← no cookie at all
sid=9f2c4a1b...                    ← just yours
theme=dark; sid=9f2c4a1b...        ← yours plus another one
```

That third shape is real. **Cookies ignore port numbers**, so a cookie set by any
other app you've run on `localhost` comes along too. That's why you can't just
take everything after the first `=`.

**Write:** a helper `getToken(req)` that returns the token, or `undefined` if
there isn't one. The recipe, in words:

1. Read `req.get("cookie")`. If it's `undefined`, return `undefined`.
2. Split the string on `"; "` to get an array of `name=value` pieces.
3. Find the piece that starts with `"sid="`. (`.find()` and `.startsWith()`.)
4. If there is none, return `undefined`.
5. Otherwise return what comes after `"sid="`. (`.slice()` with the length of
   `"sid="`.)

**Test it** by changing Step A's log to `console.log(getToken(req))`.

**You should see** in the server terminal: just the long hex string, with no
`sid=` in front. Without `credentials`, you should see `undefined`, not a crash.

### Step C — ask the Map

**Write:** replace Step A's reply with the real logic:

- `const username = sessions.get(getToken(req))`
- if `username` is `undefined` → `401` and a short message like `"Not logged in"`
- otherwise → `200` and `{ username }`

`sessions.get(undefined)` just returns `undefined`, so a missing cookie and an
unknown token fall into the same 401. You don't need two checks.

**You should see:**

| Do | Console prints |
|---|---|
| `login()` then `me()` | `200 {"username":"kewinDev"}` |
| the no-credentials fetch from Step A | `401 ...` |

---

## Part 5 — `POST /logout`

Logging out means **the server stops trusting that token**. That's one line:
remove it from the Map. The cookie in the browser is just a copy of the ticket.
Once the Map forgets the token, the ticket is worthless.

**Write:** a `POST /logout` route that:

1. gets the token with your `getToken(req)`
2. `sessions.delete(token)`
3. tells the browser to throw the cookie away, by sending `Set-Cookie` again with
   an empty value and `Max-Age=0` (meaning "this expires now"):

   ```txt
   sid=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0
   ```

4. replies `204` with `.end()` (Lesson 41: success, nothing to say)

Step 2 is the real logout. Step 3 is tidying up.

**Do:** `login()`, `me()`, `logout()`, `me()`

**You should see:**

```txt
200 {"ok":true}
200 {"username":"kewinDev"}
204
401 "Not logged in"
```

---

## Part 6 — The restart experiment

The `sessions` Map lives in the server's memory. Nobody saves it.

**Do:**

1. `login()` then `me()`. You get `200` with your username.
2. Stop the server with `Ctrl+C`. Start it again.
3. `me()` again. Don't log in.

**You should see:** `401`.

Look at what happened. The browser **still has the cookie** (it hasn't expired
and you didn't log out), and it sent the same token. But the server's Map is
brand new and empty, so it has never heard of that token.

**The cookie is the ticket. The Map is the guest list.** Restarting the server
threw away the guest list.

---

## Checklist

- [x] I can explain the timeline in Part 1 without looking
- [x] `login()` shows `Set-Cookie` in the Network tab, and `document.cookie` doesn't contain `sid`
- [x] Step A printed the cookie with `credentials` and `undefined` without
- [x] `me()` returns my username after login and 401 otherwise
- [x] `logout()` then `me()` gives 401
- [x  ] A server restart makes `me()` return 401 even though the browser kept the cookie

**Skip:** a React login form, wiring this into the notes app, `express-session`,
storing sessions in SQLite, JWT. All of that comes later.

---

## When you're done

1. Short notes in `progress.md`, same as usual
2. The token is in the cookie and the username is in the Map. Why not put
   `username=kewinDev` straight into the cookie and skip the Map? (Hint: who
   can edit a cookie?)
3. A restart logged everyone out. What would you store, and where, if a restart
   shouldn't do that?
