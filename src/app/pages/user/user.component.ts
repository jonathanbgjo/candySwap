import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service'
import { Router } from "@angular/router"
import { User } from '../../models/user';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user:User;
  users: User[];
  id: string;
  userProfile: User;
  sessionUser: User;
  show: boolean = false;
  constructor(private user_service: AppService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    // this.user_service.logged()
    // .toPromise().then((user) => {this.user = user})
    // .catch(err=> {console.log("user logged error in grid component", this.router.navigate['/logout'])})
    // console.log("INSIDE USER COMPONENT. SEEING USER")
    // console.log(this.user)

    console.log("------------------------------route params------------------------------")
    //this.userProfile = new User();
    this.user = new User();
    this.userProfile = new User();
    //try to put into promise. causing error trying to find user_id before it fetches data
    this.user_service.getUser(parseInt(this.route.snapshot.paramMap.get('user_id')))
    .subscribe(user => {this.userProfile = user; console.log(this.userProfile)} );

    this.user_service.logged()
    .subscribe(user => {this.sessionUser = user;
      if(this.sessionUser.user_id == this.userProfile.user_id){
      this.show = true;
      }});
      let arr = [['1','2','3','4'],
                ['5','6','7','8'],
                ['1','2','3','4'],
                ['5','6','7','8']];
  }

// this.user_service.getUser(id)
// .then((user) => this.user = user)
// .catch(err=> console.log("user login error", err))

}
