import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { User } from '../../models/user';
import { AppService } from '../../app.service'
import { Router } from "@angular/router"


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  item:string;

  constructor(private user_service: AppService, private router: Router) {

  }
  displayAddCard = false;
  displayupdateCard=false;


	user: User




  ngOnInit() {
    // var column: Column = new Column("Ideas", []);
    // var task: Task = new Task("Task 1", false);
    // column.tasks.push(task)
    this.user = new User

    // this.board.columns.push(column)

  }

  login(){
  	this.user_service.login(this.user)
  		.toPromise().then((user) => this.router.navigate(["/map"]))
      .catch(err=> console.log("user login error", err))
    //   this.user_service.login(this.user).subscribe( data => {
    //     data = this.user
    //   },err =>{
    //   console.log("ERROR IN MAIN COMPONENT LOGIN SUBSCRIBE")
    // },()  =>{
    //   this.router.navigate(["/grid"])
    // })
  }
  logout(){
    this.user_service.logout()
    .toPromise().then(() => this.router.navigate(["/"]))
    .catch(err=> console.log("user logout error", err))

  }



}
//LOOK AT .SUBSCRIBE FOR DATA PERSISTENCE MAYBE?
