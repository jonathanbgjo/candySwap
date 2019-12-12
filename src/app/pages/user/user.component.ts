import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service'
import { Router } from "@angular/router"
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User;
  users: User[];
  id: string;
  userProfile: User;
  sessionUser: User;
  show: boolean = false;
  constructor(private user_service: AppService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = new User();
    this.userProfile = new User();
    //try to put into promise. causing error trying to find user_id before it fetches data
    this.user_service.getUser(parseInt(this.route.snapshot.paramMap.get('user_id')))
      .subscribe(user => { this.userProfile = user; console.log(this.userProfile) });

    this.user_service.logged()
      .toPromise().then((user) => {
        this.sessionUser = user;
        if (this.sessionUser.user_id == this.userProfile.user_id) {
          this.show = true;
        }
      })
      .catch(err => { this.router.navigate([""]) })
  }
  update() {
    if (this.user.user_id == this.user.user_id) {

      this.user.user_id = this.userProfile.user_id;
      this.user_service.updateUser(this.user)
        .toPromise().then((user) => { this.router.navigate(["/map"]) })
        .catch(err => { console.log("user update error", err) })
    }
  }
  logout() {
    this.user_service.logout()
      .toPromise().then(() => this.router.navigate(["/"]))
      .catch(err => console.log("user logout error", err))

  }
  delete() {
    if (this.sessionUser.user_id == this.userProfile.user_id) {
      this.user_service.deleteUser(this.sessionUser)
        .toPromise().then(() => this.router.navigate(['/']))
        .catch(err => console.log("user delete error. user component.ts", err))
    }
  }
}
