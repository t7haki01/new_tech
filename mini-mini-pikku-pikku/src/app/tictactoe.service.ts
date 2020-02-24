import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TictactoeService {
  public socket;
  public game;
  public player;
  private timer;
  private condition: boolean = false;
  constructor() {
    this.socket = io('http://localhost:8888');
  }

  public init() {
    this.socket.emit("setUser");
  }

  public getGame() {
    return Observable.create((observer) => {
      this.socket.on('getUser', (data: any) => {
        observer.next(data);
      });
    });
  }

  public setUpdateGame(game) {
    this.socket.emit("updateGame", game);
  }

  public getUpdateGame() {
    return Observable.create((observer) => {
      this.socket.on('updateGame', (data: any) => {
        observer.next(data);
      });
    });
  }

  public getStatus() {
    return Observable.create((observer) => {
      this.socket.on('stat', (stat: any) => {
        observer.next(stat);
      });
    });
  }

  public updateStatus(stat) {
    this.socket.emit('stat', stat);
  }

  //Code Snippet for Angular iteration with "interval"
  //Written by Kihun. H

  public FunctionA():void {
    //... Some action/init

    //Set time interval how often
    this.timer = interval(3000);

    //With using "takeWhile", so set condition to act defined function (Ex. functionB) till condition is false
    this.timer.pipe(
      takeWhile( () => this.condition == true )
    ).subscribe(() => this.FunctionB())
  }

  private FunctionB(): void {
    //..Some action to be interated until condition meet
  }

}
