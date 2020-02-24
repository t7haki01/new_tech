import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MultiService } from '../multi.service';
import { Router } from '@angular/router';

export interface ModalViewData {
  nickName: string,
}

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.css']
})
export class ModalViewComponent implements OnInit{

  private nameNotGiven: boolean;
  private Daenerys: string = "Daenerys of the House Targaryen, the First of Her Name, The Unburnt, Queen of the Andals, the Rhoynar and the First Men, Queen of Meereen, Khaleesi of the Great Grass Sea, Protector of the Realm, Lady Regent of the Seven Kingdoms, Breaker of Chains and Mother of Dragons";
  private players = [];

  constructor(
    public dialogRef: MatDialogRef<ModalViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalViewData,
    private multiService: MultiService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.data.nickName != null) {
      this.multiService.setPlayer(this.data.nickName);
    }

    this.multiService.
      getWait()
      .subscribe((data: any) => {
        console.log("Subscribing");
        this.players = data;
        if (data.length == 2) {
          this.multiService.loading = false;
          this.router.navigateByUrl('/app/tictactoe');
        }
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  callMeWhatEver(): void{
    this.multiService.setPlayer("Daenerys Targaryen");
    this.data.nickName = "Daenerys Targaryen";
  }

  tictactoeClicked() {
    this.onClose();
    this.multiService.wait(this.multiService.player);
    this.multiService.loading = true;
    if (this.players.length == 2) {
      this.router.navigateByUrl('/app/tictactoe');
    }
  }
  chatClicked() {
    this.onClose();
    this.multiService.player.nickName = this.data.nickName;
    this.router.navigateByUrl('/app/chat');
  }
  ampClicked() {
    this.onClose();
    this.multiService.player.nickName = this.data.nickName;
    window.location.href = window.location.origin + "/amp";

  }
  nonAmpClicked() {
    this.onClose();
    this.multiService.player.nickName = this.data.nickName;
    window.location.href = window.location.origin + "/nonAmp";
  }
}
