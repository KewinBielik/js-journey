// Lesson 50 — sessions in SQLite. Read LESSON.md
// Your Lesson 49 server. The Map still works; you will replace it.
// Setup:  npm install
// Run:    node server.js
// Stop:   Ctrl+C

import express from "express";
import cors from "cors";
import { DatabaseSync } from "node:sqlite";
import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

const db = new DatabaseSync("users.db");
const SESSIONS_MS = 24 * 3600000; // 3600000 = 1h in miliseconds

db.exec(`CREATE TABLE IF NOT EXISTS users (
  username      TEXT PRIMARY KEY,
  salt          BLOB NOT NULL,
  hash          BLOB NOT NULL
  );`);

db.exec(`CREATE TABLE IF NOT EXISTS sessions (
  token         TEXT PRIMARY KEY,
  username      TEXT NOT NULL,
  expires_at    INTEGER NOT NULL
  );`);

function getToken(req){
  const cookie = req.get("cookie");
  if (cookie === undefined){
    return undefined;
  }
  const contents = cookie.split("; ");
  const sidPart = contents.find((c)=>c.startsWith("sid="));
  if (sidPart === undefined){
    return undefined;
  }
  return sidPart.slice("sid=".length);
}

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

  createUser("kewinDev", "veryHardPassword");

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

    const token = randomBytes(32).toString("hex");
    const expires_at = Date.now() + SESSIONS_MS;
    db.prepare(
      `INSERT INTO sessions (token, username, expires_at) VALUES (?, ?, ?);`
    ).run(token, userCheck.username, expires_at);
    res.setHeader(
      "Set-Cookie",
      `sid=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSIONS_MS / 1000}`
    );
    res.status(200).json({ ok: true});
    return;
  }
  res.status(401).json("Unknown user or wrong password");
})


app.get("/me", (req, res) => {
  const token = getToken(req);
  if (token === undefined){
    res.status(401).json("Not logged in");
    return;
  }
  const user = db.prepare(
    `SELECT * FROM sessions WHERE token = ?;`
  ).get(token);

  if (user === undefined){
    res.status(401).json("Not logged in");
    return;
  }
  
  if (!(user.expires_at > Date.now())){
    db.prepare(
      `DELETE FROM sessions WHERE token = ?;`
    ).run(user.token);

    res.setHeader(
      "Set-Cookie",
      `sid=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`
    );
  
    res.status(401).json("Not logged in");
    return;
  }

  const username = user.username;
  res.status(200).json({ username });
})


app.post("/logout", (req, res) => {
  const token = getToken(req);
  db.prepare(
    `DELETE FROM sessions WHERE token = ?;`
  ).run(token);
  res.setHeader(
    "Set-Cookie",
    `sid=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`
  );
  res.status(204).end();
})

app.listen(3000, () => {
  console.log("Login API: http://localhost:3000/login");
});
