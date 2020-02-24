import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { MultiService } from './multi.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket
  constructor(
    private multiService: MultiService,
  ) {
    this.socket = io('http://localhost:8888/');
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }
  public getMessage = () => {
    return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);
      })
    })
  }
  public sendChat(message) {
    let msg = { nickName: this.multiService.player.nickName, msg: message }
    this.socket.emit('chat', msg);
  }
  public getChat = () => {
    return Observable.create((observer) => {
      this.socket.on('chat', (message) => {
        observer.next(message);
      })
    })
  }

  public enterChat() {
    let msg = { nickName: "Attention!", msg: this.multiService.player.nickName + " has entered!" }
    this.socket.emit('chat', msg);
  }
}
