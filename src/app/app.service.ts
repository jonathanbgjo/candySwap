import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';

import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { User } from './models/user';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root',

})
export class AppService {

  constructor(private http: HttpClient,  @Inject(MatDialog) public dialog: MatDialog) { }
  // register(new_user: User){
  //   return this.http.post("/register", new_user).map(data => data).toPromise()
  // }
  doSomething(){
    //return this.http.get<User>
  }
  register(new_user: User): Observable<User>{
    console.log("register reach service?")
    return this.http.post<User>('http://localhost:8000/register', new_user)
  }
  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:8000/api/users')
  }
  login(user: User): Observable<User>{
    console.log("reach login in service");
    return this.http.post<User>('http://localhost:8000/login', user);
  }
  logged(): Observable<User>{
    console.log("reached logged in service");
    return this.http.get<User>('http://localhost:8000/logged');
  }
  logout(){
    console.log("in logout service")
    return this.http.get('http://localhost:8000/logout');
  }
  getUser(user_id: number): Observable<User>{
    console.log("in get one user service");
    return this.http.get<User>('http://localhost:8000/user/' + user_id)
  }
  updateUser(user: User): Observable<User> {
    console.log("in update service")
    console.log(user.user_id);
    return this.http.put<User>('http://localhost:8000/user/' + user.user_id, user)
  }
  updateUserScore(user: User, score: number): Observable<User> {
    console.log("in update score service")
    // console.log(user)
    // console.log(score);
    // console.log(user.user_id);
    return this.http.put<User>('http://localhost:8000/user/score/' + user.user_id, {user, score})
  }

  deleteUser(user: User):Observable<User>{
    console.log("delete service")
    return this.http.delete<User>('http://localhost:8000/user/' + user.user_id)
  }

  findTopFive(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:8000/topFive')
  }
}
