// Paths and NPM stuffs required in this file
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Dynamic port
const PORT = process.env.PORT || 3000;

// Needed for 'body' to work
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Something IDK
app.use(express.static('public'));

// GET notes HTML
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// GET notes JSON info
app.get("/api/notes", function(req, res) {
  fs.readFile(__dirname + "/noteTaker_db.json", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    for (var i = 0; i < notes.length; i++) {
      notes[i].id = i;
    };
    res.json(notes);
  });
});

// Adds a new note to the DB file
app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  fs.readFile(__dirname + "/noteTaker_db.json", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    notes.push(newNote);
    fs.writeFile(__dirname + "/noteTaker_db.json", JSON.stringify(notes), (err, data) => {
      if (err) throw err;
      res.json(newNote);
    })
  })
});

// Deletes a note by ID, not working right now
app.delete('/api/notes/:noteId', function (req, res) {
  const id = req.params.noteId;
  fs.readFile(__dirname + "/noteTaker_db.json", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    notes.splice(id, 1);
    fs.writeFile(__dirname + "/noteTaker_db.json", JSON.stringify(notes), (err, data) => {
      if (err) throw err;
      res.send("ok");
    })
  })
})

// GET index HTML
app.get("*", function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Express listening for port
app.listen(PORT);