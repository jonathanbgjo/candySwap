import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-dialogloose',
  templateUrl: './dialogloose.component.html',
  styleUrls: ['./dialogloose.component.scss']
})
export class DialoglooseComponent implements OnInit {

  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<DialoglooseComponent>) { }

  ngOnInit() {
  }

}
