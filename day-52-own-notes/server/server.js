// Lesson 52 — notes belong to the logged-in user. Read ../LESSON.md
// Your finished Lesson 51 server. Login stays. The list is still shared.
// Setup:  cd server && npm install
// Run:    node server.js
// Stop:   Ctrl+C

import express from "express";
import cors from "cors";
import { DatabaseSync } from "node:sqlite";
import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";
import { deleteNote, readNotes, addNote, changeNote } from "./db.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(logRequests);

const usersDb = new DatabaseSync("users.db");
const SESSIONS_MS = 24 * 3600000;

usersDb.exec(`CREATE TABLE IF NOT EXISTS users (
  username      TEXT PRIMARY KEY,
  salt          BLOB NOT NULL,
  hash          BLOB NOT NULL
);`);

usersDb.exec(`CREATE TABLE IF NOT EXISTS sessions (
  token         TEXT PRIMARY KEY,
  username      TEXT NOT NULL,
  expires_at    INTEGER NOT NULL
);`);

function getToken(req) {
  const cookie = req.get("cookie");
  if (cookie === undefined) {
    return undefined;
  }
  const contents = cookie.split("; ");
  const sidPart = contents.find((c) => c.startsWith("sid="));
  if (sidPart === undefined) {
    return undefined;
  }
  return sidPart.slice("sid=".length);
}

function createUser(username, password) {
  const userCheck = usersDb.prepare(
    `SELECT * FROM users WHERE username = ?;`
  ).get(username);
  if (userCheck !== undefined) {
    console.log("User already exists");
    return;
  }

  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 32);
  usersDb.prepare(
    `INSERT INTO users (username, salt, hash) VALUES (?, ?, ?);`
  ).run(username, salt, hash);
  console.log(`user - ${username} created successfuly`);
}

createUser("kewinDev", "veryHardPassword");
createUser("anotherDev", "easyPassword");
// TODO (Part 2): a second createUser, so you can log in as someone else.

function requireLogin(req, res, next) {
  const token = getToken(req);
  if (token === undefined){
    res.status(401).json("Not logged in");
    return;
  }
  
  const user = usersDb.prepare(
    `SELECT * FROM sessions WHERE token = ?;`
  ).get(token);

  if (user === undefined){
    res.status(401).json("Not logged in");
    return;
  }

  if (Date.now() > user.expires_at){
    usersDb.prepare(
      `DELETE FROM sessions WHERE token = ?;`
    ).run(token);
    res.status(401).json("Not logged in");
    return;
  }

  console.log(`User - ${user.username} is logged in, opertaion approved`);
  req.username = user.username;
  next();

}

// TODO (Part 3): requireLogin — same lookup as GET /me, then next().
// Hang it on the notes routes instead of requireKey.
// Do not hang it on /login, /me, or /logout.

function logRequests(req, res, next) {
  console.log(req.method, req.url, req.body);
  next();
}

function requireValidNote(req, res, next) {
  const error = validateNote(req.body);
  if (error === null) return next();
  res.status(400).json(error);
}

function validateNote(body) {
  if (body.title === undefined || body.description === undefined) {
    return "Missing title or description (or both)";
  }
  if (!body.title.trim() || !body.description.trim()) {
    return "Bad input, title or description empty";
  }
  return null;
}

app.post("/login", (req, res) => {
  if (req.body.username === undefined || req.body.password === undefined) {
    res.status(400).json("Missing fields");
    return;
  }
  if (!req.body.username.trim() || !req.body.password.trim()) {
    res.status(400).json("Missing fields");
    return;
  }

  const userCheck = usersDb.prepare(
    `SELECT * FROM users WHERE username = ?;`
  ).get(req.body.username);

  if (userCheck === undefined) {
    res.status(401).json("Unknown user or wrong password");
    return;
  }

  const hashCheck = scryptSync(req.body.password, userCheck.salt, 32);
  if (timingSafeEqual(hashCheck, userCheck.hash)) {
    const token = randomBytes(32).toString("hex");
    const expires_at = Date.now() + SESSIONS_MS;
    usersDb.prepare(
      `INSERT INTO sessions (token, username, expires_at) VALUES (?, ?, ?);`
    ).run(token, userCheck.username, expires_at);
    res.setHeader(
      "Set-Cookie",
      `sid=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSIONS_MS / 1000}`
    );
    res.status(200).json({ ok: true });
    return;
  }
  res.status(401).json("Unknown user or wrong password");
});

app.get("/me", (req, res) => {
  const token = getToken(req);
  if (token === undefined) {
    res.status(401).json("Not logged in");
    return;
  }
  const user = usersDb.prepare(
    `SELECT * FROM sessions WHERE token = ?;`
  ).get(token);

  if (user === undefined) {
    res.status(401).json("Not logged in");
    return;
  }

  if (!(user.expires_at > Date.now())) {
    usersDb.prepare(
      `DELETE FROM sessions WHERE token = ?;`
    ).run(user.token);
    res.setHeader(
      "Set-Cookie",
      `sid=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`
    );
    res.status(401).json("Not logged in");
    return;
  }

  res.status(200).json({ username: user.username });
});

app.post("/logout", (req, res) => {
  const token = getToken(req);
  usersDb.prepare(
    `DELETE FROM sessions WHERE token = ?;`
  ).run(token);
  res.setHeader(
    "Set-Cookie",
    `sid=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`
  );
  res.status(204).end();
});

// TODO (Part 4): pass req.username into deleteNote. 0 changes → 404.
app.delete("/notes/:id", requireLogin, (req, res) => {
  const deleted = deleteNote(req.params.id, req.username);
  if (!deleted) {
    res.status(404).json({ error: "no note with that id" });
    return;
  }
  res.status(204).end();
});

// TODO (Part 3): readNotes(req.username) — only this user's rows.
app.get("/notes", requireLogin, (req, res) => {
  const notes = readNotes(req.username);
  res.json(notes);
});

// TODO (Part 3): the owner is req.username, not anything in the body.
app.post("/notes", requireLogin, requireValidNote, (req, res) => {
  const newNote = {
    id: crypto.randomUUID(),
    title: req.body.title,
    description: req.body.description,
    username: req.username
  };
  addNote(newNote);
  res.status(201).json(newNote);
});

// TODO (Part 4): changeNote only if this user owns that id.
app.put("/notes/:id", requireLogin, requireValidNote, (req, res) => {
  const changed = changeNote(req.body.title, req.body.description, req.params.id, req.username);
  if (!changed) {
    res.status(404).json("Unknown id");
    return;
  }
  res.status(204).end();
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json(`There was an error somewhere`);
});

app.use((req, res) => {
  console.log(req.url);
  res.status(404).json("Unknown path");
});

app.listen(3000, () => {
  console.log("API: http://localhost:3000/notes");
});
