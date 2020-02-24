import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { MultiService } from '../multi.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private message: string;
  private messages: Array<Object> = [];
  constructor(
    private chatService: ChatService,
  ) { }

  ngOnInit() {

    this.chatService.enterChat();

    this.chatService
      .getChat()
      .subscribe((m: Object) => {
        this.messages.push(m);
      });
  }
  sendMessage(): void {
    let chatInput: HTMLInputElement = (<HTMLInputElement>document.getElementById('chatInput'));
    this.message = chatInput.value;
    chatInput.value = "";
    this.chatService.sendChat(this.message);
    this.message = '';
    //this.updateScroll();
  }

  updateScroll(): void {
    let chatDiv: HTMLElement = (<HTMLElement>document.getElementById("chat"));
    if (chatDiv.scroll) {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  }
}
