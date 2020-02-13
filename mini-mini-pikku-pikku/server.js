const express = require("express");
const path = require("path");
require("dotenv").config();

let app = express();
const port = process.env.SERVER_PORT || 7000;

app.use(express.static(path.join(__dirname, 'dist/mini-mini-pikku-pikku')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/mini-mini-pikku-pikku/index.html'))
});


app.listen(port, () =>
  console.log("Server running on localhost:", port)
);
