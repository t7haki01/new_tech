const express = require("express");
const path = require("path");
let http = require('http');
require("dotenv").config();
let app = express();
const port = process.env.SERVER_PORT || 7000;
let server = http.Server(app);
var cors = require('cors');
app.use(cors());
app.set('port', port);

app.use(express.static(path.join(__dirname, 'dist/mini-mini-pikku-pikku')));
app.use('/amp',express.static(path.join(__dirname, '/amp')));
app.use('/nonAmp', express.static(path.join(__dirname, '/nonAmp')));

app.get('/app/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/mini-mini-pikku-pikku/index.html'))
});
app.get('/amp', (req, res) => {
  res.sendFile(path.join(__dirname, 'amp/index.amp.html'))
});
app.get('/nonAmp', (req, res) => {
  res.sendFile(path.join(__dirname, 'nonAmp/index.html'))
});

let socketIO = require('socket.io');
let io = socketIO(server);
const Socket = require('./Socket.js');
let socket = new Socket(io);

server.listen(port, () => {
  console.log("Server running on port:", port);
});
