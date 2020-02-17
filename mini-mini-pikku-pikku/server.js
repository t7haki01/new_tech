const express = require("express");
const path = require("path");
let http = require('http');
require("dotenv").config();
let app = express();
const port = process.env.SERVER_PORT || 7000;
let server = http.Server(app);
app.set('port', port);

app.use(express.static(path.join(__dirname, 'dist/mini-mini-pikku-pikku')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/mini-mini-pikku-pikku/index.html'))
});

let socketIO = require('socket.io');
let io = socketIO(server);

let picked = [];


//const socket = require('socket.io')(server);
io.on("connection", (socket) => {
  console.log("user connected");

  socket.on('new-message', function (message) {
    io.emit('new-message', message);
  });

  socket.on('tictactoe', function (status) {
    io.emit('tictactoe', status)
  });
  socket.on('pick', function (pick) {
    console.log(picked);
    console.log(socket.client)
    if (picked.length < 2) {
      if (picked.length == 0) {
        console.log("length : 0");
        picked.push({ id: socket, value: pick });
        io.emit('pick', picked[0].value);
      }
      else if (picked.length == 1) {
        console.log("length : 1");
        picked.push({ id: socket, value: 12 });
        io.emit('pick', picked[1].value);
      }
    }
    else {
      picked.forEach(function (p) {
        if (p.id == socket) {
          io.emit('pick', p.value);
        }
      })
    }
  });

});


server.listen(port, () => {
  console.log("Server running on port:", port);
});


class Player {
  id;
  constructor() { }
  setId(id) {
    this.id = id;
  }
  getId() {
    return this.id;
  }
}
