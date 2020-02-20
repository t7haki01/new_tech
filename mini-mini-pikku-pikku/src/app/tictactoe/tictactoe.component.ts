import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { TictactoeService } from '../tictactoe.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent implements OnInit {
  private message: string;
  private messages: Array<string> = [];
  private status = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

  private game;
  private player;
  private isEnd: boolean = false;
  private winner;

  private socket: SocketIOClient.Socket;

  constructor(private chatService: ChatService,
    private gameService: TictactoeService,)
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
    if (this.isEnd) {
      return;
    }
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

      for (let i = 0; i < this.status.length; i++) {
        for (let j = 0; j < this.status[i].length; j++) {
          if (this.status[i][j] == cellNumber) {
            if (this.status[i][j] == 0 || this.status[i][j] == -1) {
              console.log("Already clicked one");
              return;
            }

            this.setClicked(this.player);
            this.game.justClicked = this.player;
            this.socket.emit('clicked', this.game);
            this.socket.on('clicked_update', (data: any) => {
              this.game = data;
              this.socket.emit('gameUpdated', this.game);
            });

            this.status[i][j] = this.player.value;
            this.gameService.updateStatus(this.status);

            if (this.isDraw()) {
              console.log("Game Draw!");
              return;
            }

            let result = this.checkGameStatus();
            if (result == this.player.value) {
              this.isEnd = true;
              this.winner = this.player;
              console.log("Game End");
            }
          }
        }
      }


    }
    else {
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

  checkGameStatus(): number {
    let vertical1 = [];
    let vertical2 = [];
    let vertical3 = [];
    let diagonal1 = [];
    let diagonal2 = [];

    let result = 1;
    //Must be smarter solution for it, but currently used manual loop check!
    for (let i = 0; i < this.status.length; i++) {
      let horizontal = [];
      for (let j = 0; j < this.status[i].length; j++) {

        if (j == 0) {
          vertical1.push(this.status[i][j]);
          horizontal.length = 0;
          horizontal.push(this.status[i][j]);
          if (i == 0) {
            diagonal1.push(this.status[i][j]);
          }
          else if (i == 2) {
            diagonal2.push(this.status[i][j]);
          }
        }

        else if (j == 1) {
          vertical2.push(this.status[i][j]);
          horizontal.push(this.status[i][j]);
          if (i == 1) {
            diagonal1.push(this.status[i][j]);
            diagonal2.push(this.status[i][j]);
          }
        }

        else {
          vertical3.push(this.status[i][j]);
          horizontal.push(this.status[i][j]);
          if (i == 2) {
            diagonal1.push(this.status[i][j]);
          }
          else if (i == 0) {
            diagonal2.push(this.status[i][j]);
          }

          if (horizontal.length == 3 && horizontal[0] == horizontal[1] && horizontal[0] == horizontal[2]) {
            result = horizontal[0];
          }
          else if (vertical1.length == 3 && vertical1[0] == vertical1[1] && vertical1[0] == vertical1[2]) {
            result = vertical1[0];
          }
          else if (vertical2.length == 3 && vertical2[0] == vertical2[1] && vertical2[0] == vertical2[2]) {
            result = vertical2[0];
          }
          else if (vertical3.length == 3 && vertical3[0] == vertical3[1] && vertical3[0] == vertical3[2]) {
            result = vertical3[0];
          }
          else if (diagonal1.length == 3 && diagonal1[0] == diagonal1[1] && diagonal1[0] == diagonal1[2]) {
            result = diagonal1[0];
          }
          else if (diagonal2.length == 3 && diagonal2[0] == diagonal2[1] && diagonal2[0] == diagonal2[2]) {
            result = diagonal2[0];
          }
        }
      }
    }
    return result;
  }

  isDraw(): boolean {
    let isDraw = false;
    let cells = [];
    this.status.forEach(function (rows) {
      rows.forEach(function (row) {
        let clicked = false;
        let clicked1 = row == -1 ? true : false;
        let clicked2 = row == 0 ? true : false;
        if (clicked1 || clicked2) {
          clicked = true;
        }
        cells.push(clicked);
      })
    })

    if (cells.includes(false)) {
      this.isEnd = false;
    }
    else {
      this.isEnd = true;
    }

    if (this.isEnd) {
      if (!this.winner) {
        isDraw = true;
      }
    }

    return isDraw;
  }
}
