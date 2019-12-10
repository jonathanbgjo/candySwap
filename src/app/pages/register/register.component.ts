import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { AppService } from '../../app.service'
import { Router } from "@angular/router"
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input()
  // new_user: string = "";


  new_user : User
	user: User
  flag: Boolean
  constructor(private user_service: AppService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.user_service.doSomething();
  	this.new_user = new User
  	this.user = new User
    this.flag = false


  }

  register(){
    if(this.new_user.password != this.new_user.confirmPassword){
      //try putting something in register html to hide submit button if passwords dont match
      console.log("Passwords dont match");
      this.router.navigate(['/']);

    }
    this.user_service.register(this.new_user)
      .toPromise().then(() => {this.router.navigate(["/"])})
  		.catch(err=> {console.log("user register error", err)})
  }

}
