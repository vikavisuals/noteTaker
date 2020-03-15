const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

// serving HTML
// serving API/JSON

app.listen(PORT, () =>
console.log(`Server started on PORT ${PORT}`));