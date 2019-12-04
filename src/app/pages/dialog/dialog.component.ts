import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit() {
    {
    //  this.dialogRef.updatePosition();
    }
  }

}
