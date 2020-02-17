import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TictactoeService {
  public socket;

  constructor() {
    this.socket = io('http://localhost:8888');
  }

  public updateStatus(status) {
    this.socket.emit('tictactoe', status);
  }

  public getStatus = () => {
    return Observable.create( (observer) => {
      this.socket.on('tictactoe', (status) => {
        observer.next(status);
      })
    })
  }

  public setPick(pick) {
    this.socket.emit('pick', pick);
  }

  public getPick = () => {
    return Observable.create( (observer) => {
      this.socket.on('pick', (pick) => {
        observer.next(pick);
      })
    })
  }
}
