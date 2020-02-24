import { Component, AfterContentInit, Inject } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { interval } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalViewComponent } from '../modal-view/modal-view.component';
import { MultiService } from '../multi.service';

@Component({
  selector: 'app-entry',
  animations: [
    trigger('greet', [
      state('state1', style({
        opacity: 1,
      })),
      state('state2', style({
        opacity: 1,
        transform: 'translateX(40%)',
      })),
      state('state3', style({
        opacity: 1,
      })),
      state('state4', style({
        opacity: 1,
        transform: 'translateX(-40%)',
      })),
      state('state5', style({
        opacity: 1,
      })),
      transition('*=>state1', [
        style({ opacity:0 }),
        animate('2s')
      ]),
      transition('state1 => state2', [
        animate('2s'),
      ]),
      transition('state2 => state3', [
        animate('2s')
      ]),
      transition('state3 => state4', [
        animate('2s')
      ]),
      transition('state4 => state5', [
        animate('2s')
      ]),
      transition('state5 => state1', [
        animate('2s')
      ]),
    ]),
  ],
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
  
})
export class EntryComponent implements AfterContentInit {
  private greeting: string = "";
  private state: string;
  private states: Array<string> = ['state1', 'state2', 'state3', 'state4', 'state5']
  private greetings: string[] = ['Welcome!', 'Tervetuloa!', 'Please', 'Enjoy!','Kiitos!']
  private clicked: number = 0;
  private timer;


  private nickName = null;

  constructor(public modalView: MatDialog, private multiService: MultiService) {}

  ngAfterContentInit() {
    this.timer = interval(3000);
    this.timer
      .subscribe( n =>
        this.toggle()
      );
  }

  private toggle(): void {
    this.greeting = this.greetings[this.clicked];
    this.state = this.states[this.clicked];
    this.clicked++;
    if (this.clicked > 4) {
      this.clicked = 0;
    }
  }

  openModalView(): void {
    const dialogRef = this.modalView.open(ModalViewComponent, {
      width: '30em',
      height: '25em',
      data: { nickName: this.nickName }
    });
  }


}
