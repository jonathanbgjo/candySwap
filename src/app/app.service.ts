import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { User } from './models/user';
import { Level } from './models/level';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SavedLevel } from './models/savedLevel'

@Injectable({
  providedIn: 'root',

})
export class AppService {

  constructor(private http: HttpClient, @Inject(MatDialog) public dialog: MatDialog) { }

  login(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8000/login', user);
  }
  logged(): Observable<User> {
    return this.http.get<User>('http://localhost:8000/logged');
  }
  logout() {
    return this.http.get('http://localhost:8000/logout');
  }

  register(new_user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8000/register', new_user)
  }
  createLevel(new_level: Level): Observable<Level> {
    return this.http.post<Level>('http://localhost:8000/level', new_level)
  }



  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8000/api/users')
  }
  getAllLevels(): Observable<Level[]> {
    return this.http.get<Level[]>('http://localhost:8000/levels')

  }
  findTopFive(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8000/topFive')
  }
  getLevelLeaderboard(level_id: number) {
    return this.http.get('http://localhost:8000/api/levelLeaderboard/' + level_id);
  }



  getUser(user_id: number): Observable<User> {
    return this.http.get<User>('http://localhost:8000/user/' + user_id)
  }
  getSavedLevel(level_id: number, user: User) {
    return this.http.get('http://localhost:8000/level/' + level_id + "/" + user.user_id)

  }
  getLevel(level_id: number): Observable<Level> {
    return this.http.get<Level>('http://localhost:8000/level/' + level_id)

  }



  updateUser(user: User): Observable<User> {
    return this.http.put<User>('http://localhost:8000/user/' + user.user_id, user)
  }
  updateUserScore(user: User, score: number): Observable<User> {
    return this.http.put<User>('http://localhost:8000/user/score/' + user.user_id, { user, score })
  }
  updateLeaderboard(level_id: number, user: User, score: Number): Observable<User> {
    return this.http.post<User>('http://localhost:8000/leaderboard/' + level_id, { user, score });
  }
  saveLevel(level_id: number, user: User, dimensions: number, turns: number, score: number, scoreToBeat: number, savedGrid: String) {
    return this.http.post('http://localhost:8000/saveLevel/' + level_id, { user, score, dimensions, turns, scoreToBeat, savedGrid });
    //wrap what you want to send in body in the {} after url
  }


  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>('http://localhost:8000/user/' + user.user_id)
  }
  deleteSavedLevel(level_id: number, user: User): Observable<User> {
    return this.http.delete<User>('http://localhost:8000/level/' + level_id + "/" + user.user_id)
  }

}
