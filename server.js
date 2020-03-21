const express = require('express');
const mysql = require("mysql");
const fs = require('fs');

const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "noteTaker_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.end();
});

app.use(express.static('public'));

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./noteTaker_db.json"));
});

app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  fs.readFile(__dirname + "/noteTaker_db.json", (err, data) => {
    if (err) throw err
    const notes = JSON.parse(data)
    newNote.id = notes.length + 1
    notes.push(newNote)

    fs.writeFile(__dirname + "/noteTaker_db.json", JSON.stringify(notes), (err, data) => {
      if (err) throw err
      res.json(newNote);
    })
  })
});

// app.delete('/api/notes/:noteId', function (req, res) {
//   const id = req.params.noteId
//   fs.readFile(__dirname + "/noteTaker_db.json", (err, data) => {
//     if (err) throw err
//     const notes = JSON.parse(data)


//     fs.writeFile(__dirname + "/noteTaker_db.json", JSON.stringify(notes), (err, data) => {
//       if (err) throw err
//       res.json(newNote);
//     })
//   })
//   res.send('ok')
// })

app.get("*", function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT);