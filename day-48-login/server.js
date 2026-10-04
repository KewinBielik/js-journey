// Lesson 48 — login checks a stored hash. Read LESSON.md
// Setup:  npm install
// Run:    node server.js
// Stop:   Ctrl+C
//
// No React in this lesson. Test with fetch from the browser console.

import express from "express";
import cors from "cors";
import { DatabaseSync } from "node:sqlite";
import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";

const app = express();
app.use(cors());
app.use(express.json());

const db = new DatabaseSync("users.db");

// TODO (Goal 1): create a users table.
// Columns: username, salt, hash. No password column.
// salt and hash are bytes. The SQL type for that is BLOB.

db.exec(`CREATE TABLE IF NOT EXISTS users (
  username      TEXT PRIMARY KEY,
  salt          BLOB NOT NULL,
  hash          BLOB NOT NULL
  )`)

// TODO (Goal 2): createUser(username, password)
// Make a new salt, hash the password with it, insert both.
// If the username is already there, don't insert a second one.

function createUser(username, password) {
  
  const userCheck = db.prepare(
    `SELECT * FROM users WHERE username = ?;`
  ).get(username);
  if (userCheck !== undefined){
    console.log("User already exists");
    return;
  }
  
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 32);

  db.prepare(
    `INSERT INTO users (username, salt, hash) VALUES (?, ?, ?);`
  ).run(username, salt, hash);
  console.log(`user - ${username} created successfuly`);
}

// TODO (Goal 3): call createUser once for a dev user, e.g. "kewin".
// Use a fake password. This file will be on GitHub.

  createUser("kewinDev", "veryHardPassword");

// TODO (Goal 4): POST /login
// Body: { username, password }
// Missing fields → 400
// Unknown user OR wrong password → the same 401 and the same message
// Right password → 200 and { ok: true }
// Never send the hash or the salt back.

app.post("/login", (req, res) => {
  if (req.body.username === undefined || req.body.password === undefined){
    res.status(400).json("Missing fields");
    return;
  }
  if (!req.body.username.trim() || !req.body.password.trim()) {
    res.status(400).json("Missing fields");
    return;
  }

  const userCheck = db.prepare(
    `SELECT * FROM users WHERE username = ?;`
  ).get(req.body.username);

  if (userCheck === undefined){
    res.status(401).json("Unknown user or wrong password");
    return;
  }

  const hashCheck = scryptSync(req.body.password, userCheck.salt, 32);
  if (timingSafeEqual(hashCheck, userCheck.hash)){
    res.status(200).json({ ok: true});
    return;
  }
  res.status(401).json("Unknown user or wrong password");


})

app.listen(3000, () => {
  console.log("Login API: http://localhost:3000/login");
});
