import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket
  constructor() {
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
}
