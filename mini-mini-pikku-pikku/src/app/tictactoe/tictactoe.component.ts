import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { TictactoeService } from '../tictactoe.service';
import { MultiService } from '../multi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent implements OnInit {
  private message: string;
  private messages: Array<object> = [];
  private status = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  private default = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

  private game;
  private player;
  private isEnd: boolean = false;


  constructor(private chatService: ChatService,
                      private gameService: TictactoeService,
                      private multiService: MultiService,
                      private route: Router,
  ){}

  ngOnInit() {

    //Handling Chat
    this.chatService
      .getMessage()
      .subscribe((m: string) => {
        this.messages.push({ name:this.multiService.player.nickName, msg:m });
      });

    //Handing game states
    this.gameService
      .getStatus()
      .subscribe((status) => {
        this.status = status;
        if (this.winLose()) {
          return;
        }
      });

    //Init Player & Game
    this.gameService.init();

    this.gameService
      .getGame()
      .subscribe((data: any) => {
        this.game = data;
        this.setPlayer(data);
      });

    //Update game properties & states
    this.gameService
      .getUpdateGame()
      .subscribe((data: any) => {
        this.game = data;
        this.updatePlayer(data);
        this.playAgain(data);
      });
  }


  //Message control
  sendMessage(): void {
    let chatInput: HTMLInputElement = (<HTMLInputElement>document.getElementById('chatInput'));
    this.message = chatInput.value;
    chatInput.value = "";
    this.chatService.sendMessage(this.message);
    this.message = '';
  }


  //Player init & update
  setPlayer(game): void {
    for (let i = 0; i < game.players.length; i++) {
      if (game.players[i].socket == this.gameService.socket.id) {
        this.player = game.players[i];
        //Init nickname
        if (this.multiService.player) {
          this.multiService.player.nickName = this.player.nickName;
        }
        else {
          this.player.nickName = "Daenerys Targaryen";
        }
      }
    }
  }

  updatePlayer(data: any) {
    for (let i = 0; i < data.players.length; i++) {
      if (data.players[i].socket == this.player.socket) {
        this.player = data.players[i];
      }
    }

  }



  //Game flow control
  cellClicked(cell) {
    //'check is game end'
    if (this.isEnd)
      return;
    //'check is my turn'
    if (!this.isMyturn()) {
      return;
    }

    //"from here checked whole process"

    for (let i = 0; i < this.status.length; i++) {
      for (let j = 0; j < this.status[i].length; j++) {
        if (this.status[i][j] == cell) {
          if (this.status[i][j] == 0 || this.status[i][j] == -1) {
            console.log("Already clicked");
            //'case - already clicked'
            return;
          }

          this.status[i][j] = this.player.value;
          this.gameService.updateStatus(this.status);
          this.setClicked();
        }
      }
    }


    //'After Clicking check result
    if (this.winLose()) {
      return;
    }

    if (this.isDraw()) {
      console.log("Game Draw!");
      //'Might some action for draw'
      if (confirm("Draw!, Do you want to play again?")) {
        console.log("lets play one more!");
        this.player.playAgain = true;
        this.playerUpdate();
      }
      else {
        this.player.playAgain = false;
        this.playerUpdate();
      }
      return;
    }
  }

  winLose() {
    let cameResult = false;
    let result = this.checkGameStatus();
    if (result == this.player.value) {
      this.isEnd = true;
      this.setResult(true);
      this.gameService.setUpdateGame(this.game);
      this.resultAct(true);
      console.log("Game End, you win!");
      cameResult = true;
    }
    else if (result == 1) {
      //"continue"
    }
    else {
      this.isEnd = true;
      this.setResult(false);
      this.gameService.setUpdateGame(this.game);
      this.resultAct(false);
      console.log("Game End, you lose!");
      cameResult = true;
    }
    return cameResult;
  }

  setClicked() {
    for (let i = 0; i < this.game.players.length; i++) {
      if (this.game.players[i].socket == this.player.socket) {
        this.game.players[i].turn = false;
        this.player.turn = false;
      }
      else {
        this.game.players[i].turn = true;
      }
    }

    this.gameService.setUpdateGame(this.game);
  }

  resultAct(isWin: boolean) {
    if (isWin) {
      if (confirm("You Win!, Play again?")) {
        this.player.playAgain = true;
      }
      else {
        this.player.playAgain = false;
      }
    }
    else {
      if (confirm("You Lose!, Play again?")) {
        this.player.playAgain = true;
      }
      else {
        this.player.playAgain = false;
      }
    }
   this.playerUpdate();
  }

  playAgain(data: any) {
    let playerA = data.players[0];
    let playerB = data.players[1];
    if (playerA.playAgain == null || playerB.playAgain == null) {
      return;
    }
    if (playerA.playAgain && playerB.playAgain) {

      if (this.player.playAgain) {
        this.player.win = false;
        this.player.lose = false;
        console.log("Play again!")
        this.game.playAgain = true;
        this.player.playAgain = null;
      }
      else {
        this.player.win = false;
        this.player.lose = false;
        console.log("Game end")
        this.game.playAgain = false;
        this.player.playAgain = null;
      }
      this.playerUpdate();

    }
  }
  //Game properties control & check
  isMyturn() {
    let turn = false;
    for (let i = 0; i < this.game.players.length; i++) {
      if (this.game.players[i].socket == this.player.socket) {
        if (this.game.players[i].turn)
          turn = true;
      }
    }
    return turn;
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
      if (!this.player.win) {
        isDraw = true;
      }
    }

    return isDraw;
  }

  setResult(isWin: boolean) {

    for (let i = 0; i < this.game.players.length; i++) {
      if (this.player.socket == this.game.players[i].socket) {
        if (isWin) {
          this.player.win = true;
          this.game.players[i].win = true;
        }
        else {
          this.player.lose = true;
          this.game.players[i].lose = true;
        }
      }
    }
  }

  playerUpdate() {
    for (let i = 0; i < this.game.players.length; i++) {
      if (this.game.players[i].socket == this.player.socket) {
        this.game.players[i] = this.player;
        this.gameService.setUpdateGame(this.game);
      }
    }
  }
}//End of Component
