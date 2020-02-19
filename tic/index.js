const express = require("express");
const path = require("path");
let http = require('http');
//require("dotenv").config();
let app = express();
const port = process.env.SERVER_PORT || 7000;
let server = http.Server(app);
app.set('port', port);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

let io = require('socket.io')(server);

io.on('connection', function connection(socket) {
    console.log("User connected");
});

server.listen(port, () => {
    console.log("Server running on port:", port);
});

