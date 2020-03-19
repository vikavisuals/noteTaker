const express = require('express');
const mysql = require("mysql");

const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "noteTaker_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.end();
});


app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});


app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./Develop/db/db.json"));
});
app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  console.log(newNote);
  Notes.push(newNote);
  res.json(newNote);
});

app.use(express.static('public'));

app.listen(PORT);
