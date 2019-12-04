import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AppService } from '../../app.service'
import { Router } from "@angular/router"

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
user:User;
users:User[];

  constructor(private user_service: AppService,
    private router: Router,) { }

  ngOnInit() {
    this.user_service.logged()
    .toPromise().then((user) => {this.user = user; console.log(this.user)})
    .catch(err => {this.router.navigate([""])})

    this.user_service.getAllUsers()
    .subscribe(users => {this.users = users;})
  }
  logout(){
    this.user_service.logout()
    .toPromise().then(() => this.router.navigate(["/"]))
    .catch(err=> console.log("user logout error", err))

  }

}