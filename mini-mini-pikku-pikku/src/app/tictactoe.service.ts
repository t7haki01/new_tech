import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TictactoeService {
  public socket;
  public result = { win: false, lose: false, draw: false, end: false }

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

  public getUpdate(game) {
    this.socket.emit('click', game);
  }

  public setUpdate = () => {
    return Observable.create( (observer) => {
      this.socket.on('update', (game) => {
        observer.next(game);
      })
    })
  }

  public gameResult(status: Array<Array<number>>) {
    status.forEach(function (rows) {
      let horizontal = [];
      rows.forEach(function (row) {
        if (horizontal.length == 0) {
          horizontal.push(row);
          this.result.end = false;
        }
        else {
          if (horizontal.length == 1) {
            if (horizontal[0] == row) {
              horizontal.push(row);
              this.result.end = false;
            }
            else {
              this.result.end = false;
            }
          }
        }

      });
    });
  }
}
