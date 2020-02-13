import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    (<HTMLElement>document.getElementById('chatBtn')).addEventListener('click', this.displayMsg);
    (<HTMLElement>document.getElementById('chatInput')).addEventListener('keypress', this.inputEnter);

    var table = (<HTMLTableElement>document.getElementById("gameTb"));
    if (table != null) {
      for (var i = 0; i < table.rows.length; i++) {
        for (var j = 0; j < table.rows[i].cells.length; j++)
          table.rows[i].cells[j].onclick = function () {
            tableText(this);
          };
      }
    }

    function tableText(tableCell) {
      //alert(tableCell.innerHTML);
      let mark = document.createTextNode("X");
      (<HTMLTableElement>tableCell).appendChild(mark);
    }

  }

  private inputEnter(e): void {
    if (e.keyCode === 13) {
      let chatInput: HTMLInputElement = (<HTMLInputElement>document.getElementById('chatInput'));
      let chatDisplay: HTMLElement = (<HTMLElement>document.getElementById('chatDisplay'));

      let msg = document.createElement('li');
      let msgText = document.createTextNode(chatInput.value);
      msg.appendChild(msgText);
      chatDisplay.append(msg);

      chatInput.value = "";
    }
  }

  private displayMsg(): void {
    let chatInput: HTMLInputElement = (<HTMLInputElement>document.getElementById('chatInput'));
    let chatDisplay: HTMLElement = (<HTMLElement>document.getElementById('chatDisplay'));

    let msg = document.createElement('li');
    let msgText = document.createTextNode(chatInput.value);
    msg.appendChild(msgText);
    chatDisplay.append(msg);

    chatInput.value = "";
  }

}
