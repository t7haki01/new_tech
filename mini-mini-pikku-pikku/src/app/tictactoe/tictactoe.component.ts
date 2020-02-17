import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { TictactoeService } from '../tictactoe.service';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent implements OnInit {
  message: string;
  private messages: Array<string> = [];
  private status = [[1,2,3],[4,5,6],[7,8,9]];
  private pick;
  constructor(private chatService: ChatService,
              private gameService: TictactoeService){}

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
    this.gameService.setPick(11);
    this.gameService
      .getPick()
      .subscribe((pick) => {
        console.log(pick);
        this.pick = pick;
      });
  }

  cellClicked(cellNumber) {
    console.log(this.pick);
    for (let i = 0; i < this.status.length; i++) {
      for (let j = 0; j < this.status[i].length; j++) {
        if (this.status[i][j] == cellNumber) {
          this.status[i][j] = this.pick;
          this.gameService.updateStatus(this.status);
        }
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
