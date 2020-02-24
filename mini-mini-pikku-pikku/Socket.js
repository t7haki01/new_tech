
const Game = require('./Game.js');
const Host = require('./Host.js');
const Player = require('./Player.js');
let hosting = new Host();
let ticTacToeGame = new Game();

let game = { players: [],
  picked: [], justClicked: null, playAgain:false};
  
  let idNum = 1;
  let wait = [];
module.exports = class Socket{
    constructor(io){
      this.io = io;
      this.io.on('connection', (socket)=>{
        this.onConnect(socket);
      });
    }

onConnect(socket){

  console.log("user connected");
  let io = this.io;

  //#region "Init Nickname, initializing player, emitting player"
  socket.on("enter", function(nickName){
    if(game.players.length > 0){
      game.players.forEach(function(player){
        if(player.socket == socket.id){
          socket.emit('getPlayers', player);
        }
      })
    } 
    let newPlayer = new Player();
    newPlayer.setSocket(socket.id);
    newPlayer.setNickName(nickName);
    game.players.push(newPlayer);
  });

  socket.on("entered", function(){
    if(game.players.length > 0){
      game.players.forEach(function(player){
        if(player.socket == socket.id){
          socket.emit('getPlayers', player);
        }
      })
    }
  });

  socket.on("wait", function(player){
    if(wait.length == 0){
      wait.push(player);
      io.emit("wait",wait);
      socket.broadcast.emit('wait', wait);
    }
    else if(wait.length == 1){
      wait.push(player);
      io.emit("wait",wait);
      socket.broadcast.emit('wait', wait);
      console.log("After emit called?")
      wait.length = 0;
    }
    else{
    }
  })
  //#endregion

  //#region "Chatting Section"

  // Chat service in game
  socket.on('new-message', function (message) {
    io.emit('new-message', message);
  });
  
  // Chat service in chat
  socket.on("chat",function(message){
    io.emit('chat', message);
  });
  //#endregion

  //#region "Game, Player Init & Update properties"
  socket.on('setUser',()=>{
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

      if(game.players.length >= 2){
        game.players.splice(0,game.players.length-2);
      }
      else if(game.players.length == 2){
        game.players.splice(0,1);
      }

      game.players.push(newPlayer);

      io.emit('getUser', game);
  });

  socket.on('updateGame', (gameClient)=>{
    //Attention
    //Be aware of foreach "linq" usage when handling asynchronous interaction in undefined type
    //And Shallow copy & Deep copy appliable case regarding to object
    game = gameClient;
    io.emit('updateGame',game);
    socket.broadcast.emit('updateGame', game);
  });

  socket.on('stat', (stat)=>{
    io.emit('stat',(stat));
  })

  //#endregion

};

}//end of class