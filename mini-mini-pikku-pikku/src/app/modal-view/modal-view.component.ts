import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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


  constructor(public dialogRef: MatDialogRef<ModalViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalViewData) { }

  ngOnInit() {
    if (!this.data.nickName) {
      this.data.nickName = "Daenerys Targaryen"
      this.nameNotGiven = true;
    }
    else {
      this.nameNotGiven = false;
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  callMeWhatEver(): void{
    this.nameNotGiven = false;
  }
}
