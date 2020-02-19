import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { TictactoeService } from '../tictactoe.service';
import * as io from 'socket.io-client';
import { debug } from 'util';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent implements OnInit {
  message: string;
  private messages: Array<string> = [];
  private status = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  private pick;
  private game;
  private player;

  txt: string;
  msg: Array<any>;
  socket: SocketIOClient.Socket;

  constructor(private chatService: ChatService,
              private gameService: TictactoeService, )
  {
    this.socket = io('http://localhost:8888').connect();
  }

  ngOnInit() {
    
    this.chatService
      .getMessage()
      .subscribe((m: string) => {
        this.messages.push(m);
      });

    this.gameService
      .getStatus()
      .subscribe((status) => {
        this.status = status;
      });
    //this.gameService.setPick(this.pick);
    //this.gameService
    //  .getPick()
    //  .subscribe((pick) => {
    //    this.pick = pick;
    //  });

    this.msg = new Array();
    //this.socket.on('message-received', (msg: any) => {
    //  this.msg.push(msg);
    //  console.log(msg);
    //  console.log(this.msg);
    //});
    //this.socket.emit('event1', {
    //  msg: 'Client to server, can you hear me server?'
    //});
    //this.socket.on('event2', (data: any) => {
    //  console.log(data.msg);
    //  this.socket.emit('event3', {
    //    msg: 'Yes, its working for me!!'
    //  });
    //});
    //this.socket.on('event4', (data: any) => {
    //  console.log(data.msg);
    //});

    this.game = new Array();
    this.socket.emit('init');
    this.socket.on('inited', (data: any) => {
      this.socket.emit('afterInited', this.player);
    });

    this.socket.on('serverResponse', (data : any) => {
      for (let i = 0; i < data.players.length; i++) {
        if (data.players[i].socket == this.socket.id) {
          this.player = data.players[i];
        }
      }
      this.game = data;
      this.socket.emit('gameUpdated', this.game);
    });
  }

  cellClicked(cellNumber) {
    console.log(this.game);
    let isMyTurn = false;
    for (let j = 0; j < this.game.players.length; j++) {
      if (this.game.players[j].socket == this.player.socket) {
        console.log("Clicked");
        if (this.player.turn) {
          isMyTurn = true;
        }
      }
      else if (this.game.justClicked.socket != this.player.socket) {
        isMyTurn = true;
      }
    }
    if (isMyTurn) {
      this.setClicked(this.player);
      this.game.justClicked = this.player;
      this.socket.emit('clicked', this.game);
      this.socket.on('clicked_update', (data: any) => {
        this.game = data;
        this.socket.emit('gameUpdated', this.game);
      });
      console.log("It was my turn!");
      for (let i = 0; i < this.status.length; i++) {
        for (let j = 0; j < this.status[i].length; j++) {
          if (this.status[i][j] == cellNumber) {
            //this.gameService.setPick(this.pick);
            this.status[i][j] = this.player.value;
            this.gameService.updateStatus(this.status);
          }
        }
      }
    }
    else {
      console.log("Not my turn");
      this.socket.emit('getUpdate');
      this.socket.on('pullUpdate', (data: any) => {
        this.game = data;
        this.socket.emit('gameUpdated', this.game);
        this.socket.on('updateGame', (data: any) => {
          this.game = data;
        })
      });
    }

    this.socket.emit('getUpdate');
    this.socket.on('pullUpdate', (data: any) => {
      this.game = data;
      this.socket.emit('gameUpdated', this.game);
      this.socket.on('updateGame', (data: any) => {
        this.game = data;
      })
    });



  }

  setClicked(player) {
    player.turn = false;
    for (let i = 0; i < this.game.players.length; i++) {
      if (this.game.players[i].socket == player.socket) {
        this.game.players[i] = player;
      }
      else {
        this.game.players[i].turn = true;
      }
    }
  }

  sendMessage(): void {
    let chatInput: HTMLInputElement = (<HTMLInputElement>document.getElementById('chatInput'));
    this.message = chatInput.value;
    chatInput.value = "";
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
}
