# Lesson 47 — Don't store the password

Lesson 46's key lived in the React source, so anyone could read it. Moving that
string into the database does not fix it. Anyone who can read `notes.db`, a backup,
or a leaked file would have the password itself.

The one idea today: **store a hash, never the password.** No Express, no React, no
login form. One script, same shape as Lesson 43. The login route is the next lesson.

---

## A hash is one-way

```txt
"secret"  →  hash  →  a0f3…9c
```

You can go from the password to the hash. You cannot go back. When someone logs in
later, you hash what they typed and compare it to the stored hash. You never need
the original password again, so you never keep it.

`scryptSync` does that. It is part of Node's `crypto` module. `crypto.randomUUID()`
worked with no import because it is a global. **`scryptSync` is not.** Import it.

```js
import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 32);
```

`32` is how many bytes of hash you want. `hash` is a `Buffer` (raw bytes), not a
string. `console.log` will show it. That's fine for today.

`scrypt` is deliberately slow. A few milliseconds is nothing for one login and
painful for someone guessing millions of passwords. You'll notice the script isn't
instant. That's the feature.

The name you'll see in job posts and tutorials is **bcrypt**. Same idea, a different
function. No need to install it today.

---

## The salt

Hash the word `password` with no extra input and you always get the same bytes.
Then two users who picked `password` have the **same stored value**, and an attacker
can precompute the hashes of common passwords once and look them up. That's a rainbow
table.

A **salt** is random bytes you mix in so the same password produces a different hash
every time you set it:

```txt
"password" + salt A  →  hash A
"password" + salt B  →  hash B
```

You store the salt **next to** the hash. It is not secret. Its only job is to make
every hash unique. Without the original salt you cannot check the password later,
because `scryptSync` would mix in different bytes and the result would never match.

`randomBytes(16)` gives you 16 cryptographically random bytes. `Math.random()` is
the wrong tool here. It is predictable.

---

## Comparing without `===`

```js
timingSafeEqual(storedHash, scryptSync(typedPassword, storedSalt, 32));
```

`===` on two buffers doesn't compare their contents the way you expect, and a
byte-by-byte compare that stops at the first difference leaks information through
timing. `timingSafeEqual` compares every byte and returns `true` or `false`.

It **throws** if the two buffers have different lengths. A wrong password hashed
with the right salt has the same length, so that's fine. Don't feed it a string.

---

## Your goals

Build `script.js` one step at a time. Run `node script.js` after each.

**Goal 1 — hash one password**
Make a salt, hash a password, log both. Run the script twice. The salt and the hash
should both change, because you made a new salt.

**Goal 2 — same salt, same hash**
Hash the same password with the **same** salt a second time. `timingSafeEqual` on
the two hashes should be `true`. Predict it before you run it.

**Goal 3 — a check function**
`checkPassword(password, salt, expectedHash)` returns `true` only when the password
matches. Try it with the right password and with a wrong one. The wrong one must
return `false`, not throw.

**Goal 4 — same password, two users**
Hash `password` twice, with a new salt each time. The hashes must not match. That's
the whole point of the salt. Predict it, then run it.

**Skip:** a users table, a login route, cookies, JWT, installing bcrypt. Next lesson.

---

## Checklist

- [x] I can say why storing the password itself is useless even inside the database
- [x] The same password with a new salt gives a different hash
- [x] The same password with the stored salt gives the same hash
- [x] `checkPassword` is `true` for the right password and `false` for a wrong one
- [x] I know the salt has to be stored, and that it is not a secret

---

## When you're done

1. Short notes in `progress.md`
2. You have a hash and a salt. Login needs both. Where would each of them live?
3. `scryptSync` freezes the program while it runs. Your Express server is one
   process. What happens to other requests during a login?
