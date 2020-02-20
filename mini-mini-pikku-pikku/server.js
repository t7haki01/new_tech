const express = require("express");
const path = require("path");
let http = require('http');
require("dotenv").config();
let app = express();
const port = process.env.SERVER_PORT || 7000;
let server = http.Server(app);
app.set('port', port);

app.use(express.static(path.join(__dirname, 'dist/mini-mini-pikku-pikku')));
app.use(express.static(path.join(__dirname, 'amp')));

app.get('/app/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/mini-mini-pikku-pikku/index.html'))
});
app.get('/amp', (req, res) => {
  res.sendFile(path.join(__dirname, 'amp/index.amp.html'))
});

let socketIO = require('socket.io');
let io = socketIO(server);

let game = { players: [],
  picked: [], justClicked: null};
const Player = require('./Player.js');
let idNum = 1;
io.on("connection", (socket) => {
  console.log("user connected");

  socket.on('new-message', function (message) {
    io.emit('new-message', message);
  });

  socket.on('tictactoe', function (status) {
    io.emit('tictactoe', status)
  });

  socket.on('pick', function (pick) {
    if (game.picked.length < 2) {
      if (game.picked.length == 0) {
        let player = new Player();
        player.setId(1);
        player.setValue(0);
        player.setSocket(socket.id);
        player.setTurn(true);
        game.picked.push(player);
        io.emit('pick', player);
        current = player.getSocket();
      }
      else if (game.picked.length == 1) {
        let player = new Player();
        player.setId(2);
        player.setValue(-1);
        player.setSocket(socket.id);
        player.setTurn(false);
        game.picked.push(player);
        io.emit('pick', player);
      }
    }
    else {
      game.picked.forEach(function (p) {
        if (p.getSocket() == socket.id) {
          io.emit('pick', p);
        }
      });
    }
  });

  socket.on('event1', (data) => {
    console.log(data.msg);
  });

  socket.on('init', () =>{
    let newPlayer = new Player();
    newPlayer.setSocket(socket.id);
    let value = null;
    if(idNum%2 == 0){
      value = 0;
    }
    else{
      value = -1
    }
    newPlayer.setValue(value);
    idNum++;
    game.players.push(newPlayer);
  });

  socket.emit('event2', {
    msg: 'Server to client, do you read me? Over.'
  });

  socket.emit('inited', game);

  socket.on('event3', (data) => {
    console.log(data.msg);
    socket.emit('event4', {
      msg: 'Loud and clear :)'
    });
  });

  socket.on('afterInited', (data)=>{
    console.log(data);
    socket.emit('serverResponse',game);
  });

  socket.on('clicked', (data) =>{
    game = data;
    socket.emit('clicked_update', game);
  });
  socket.on('gameUpdated', (data)=>{
    game = data;
    socket.emit('updateGame', game);
  });
  socket.on('getUpdate', ()=>{
    socket.emit('pullUpdate', game);
  });

});


server.listen(port, () => {
  console.log("Server running on port:", port);
});
