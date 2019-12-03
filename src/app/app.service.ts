import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { User } from './models/user';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  // register(new_user: User){
  //   return this.http.post("/register", new_user).map(data => data).toPromise()
  // }
  doSomething(){
    //return this.http.get<User>
  }
  register(new_user: User){
    console.log("register reach service?")
    return this.http.post<User>('http://localhost:8000/register', new_user)
  }
  getAllUsers(){
    return this.http.get<User[]>('http://localhost:8000/api/users')
  }
  login(user: User): Observable<User>{
    console.log("reach login in service");
    return this.http.post<User>('http://localhost:8000/login', user);
  }
  logged(){
    console.log("reached logged inservice");
    return this.http.get<User>('http://localhost:8000/logged');
  }
  logout(){
    return this.http.get('http://localhost:8000/logout');
  }
  getUser(user_id: number){
    console.log("in get one user service");
    return this.http.get<User>('http://localhost:8000/user/' + user_id)
  }

  updateUser(user: User): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/users/' + user.user_id, user)
  }

  deleteUser(user: User) {
    return this.http.delete('http://localhost:8000/api/users/' + user.user_id)
  }
}
