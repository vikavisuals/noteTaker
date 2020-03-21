// Paths and NPM stuffs required in this file
const express = require('express');
const mysql = require("mysql");
const fs = require('fs');
const path = require('path');
const app = express();

// Dynamic port
const PORT = process.env.PORT || 3000;

// Needed for 'body' to work
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Establishing MySQL connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "noteTaker_db"
});

// Announcing connection ID
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.end();
});

// Something IDK
app.use(express.static('public'));

// GET index HTML
app.get("/", function (req, res) {
  res.sendFile(__dirname + 'public/index.html');
});

// GET notes HTML
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// GET notes JSON info
app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./noteTaker_db.json"));
});

// Adds a new note to the DB file
app.post("/api/notes", function (req, res) {
  var note = req.body;
  fs.readFile(__dirname + "/noteTaker_db.json", (err, data) => {
    if (err) throw err
    const notes = JSON.parse(data)
    note.id = notes.length + 1
    notes.push(note)

    fs.writeFile(__dirname + "/noteTaker_db.json", JSON.stringify(notes), (err, data) => {
      if (err) throw err
      res.json(note);
    })
  })
});


// Deletes a note by ID, not working right now
app.delete('/api/notes/:noteId', function (req, res) {
  const id = req.params.noteId;
  fs.readFile(__dirname + "/noteTaker_db.json", (err, data) => {
    if (err) throw err
    const notes = JSON.parse(data)

    fs.writeFile(__dirname + "/noteTaker_db.json", JSON.stringify(notes), (err, data) => {
      if (err) throw err
      res.json(note);
    })
  })
  res.send('ok')
})

// Express listening for port
app.listen(PORT);