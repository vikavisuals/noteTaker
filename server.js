const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});