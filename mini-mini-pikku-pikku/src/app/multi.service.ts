import { Injectable, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class MultiService{
  public player = null;
  public socket: SocketIOClient.Socket;
  private timer;
  public game = null;
  public loading = false;
  public players = [];

  private ready = this.game && this.game.players.length == 2 ? true : false;

  public btnReady: boolean = false;
  constructor(
    private router: Router
  ) {
    this.socket = io('http://localhost:8888').connect();
  }


  //Init Player with nickname, looping callback 'initPlayer' til player not null
  public setPlayer(nickName) {
    this.socket.emit('enter', nickName);
    this.timer = interval(3000);

    this.timer.pipe(
      takeWhile(() => this.player == null)
    ).subscribe(() => this.initPlayer());
  }

  private initPlayer() {
    this.socket.emit("entered");
    this.socket.on('getPlayers', (data: any) => {

      this.player = data;
      console.log(this.player)
      this.btnReady = true;
    });
  }

  public wait(data:any) {
    this.socket.emit("wait", data);
  }

  public getWait() {
    return Observable.create((observer) => {
      this.socket.on('wait', (data: any) => {
        observer.next(data);
      });
    });
  }


}
