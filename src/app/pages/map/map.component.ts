import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AppService } from '../../app.service'
import { Router } from "@angular/router"
import { Level } from '../../models/level'
import { CandyType } from 'src/app/models/enum/candytype.enum';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
user:User;
users:User[];
topFive: any;
temp: any = [['stuff'],['stuff'],['stuff'],['stuff'],['stuff']]
levels: Level[];
new_level: any;
grid: string = '';
numColors:number;
dimensions:number;
numTurns:number;
  constructor(private user_service: AppService,
    private router: Router,) { }
    getRandomCandy(num): string {
      var value = Math.floor(Math.random() * Math.floor(num));
      if (value == 0) {
        return 'blue'
      } else if (value == 1) {
        return 'green'
      } else if (value == 2) {
        return 'red'
      }else if(value ==3){
        return 'yellow'
      }else if(value ==4){
        return 'violet'
      }else if(value ==5){
        return 'orange'
      }else if(value ==6){
        return 'black'
      }
      else if(value ==7){
        return 'brown'
      }
      else if(value ==8){
        return 'white'
      }
    }

  ngOnInit() {
    this.user = new User();
    this.new_level = {dimensions: 5,
                      numTurns:5,
                    numColors:5,
                  grid: "",
                scoreToBeat: 15};
    this.user_service.getAllUsers()
    .subscribe(users => {this.users = users;})

    this.user_service.logged()
    .subscribe(user => this.user= user)
    // .toPromise().then((user) => {this.user = user; console.log(this.user)})
    // .catch(err => {this.router.navigate([""])})

    this.user_service.findTopFive()
    .toPromise().then( (users) => {this.topFive = users})
    .catch((err) => console.log('findtop5 error', err))


    this.user_service.getAllLevels()
    .subscribe(levels => {this.levels = levels})
  }
  logout(){
    this.user_service.logout()
    .toPromise().then(() => this.router.navigate(["/"]))
    .catch(err=> console.log("user logout error", err))
  }
  createLevel(){
    for(let i = 0 ; i<this.new_level.dimensions; i++){
      for(let k = 0; k<this.new_level.dimensions; k++){
        if(this.grid == ''){
          this.grid = this.getRandomCandy(this.new_level.numColors)

        }else{
          this.grid += " " + this.getRandomCandy(this.new_level.numColors)
        }
      }
    }
    console.log(this.new_level)
    console.log("THIS IS THE GIRD HREAJRSFKJASDFKASJD")
    console.log(this.new_level.numColors)
    console.log(this.new_level.dimensions)

    console.log(this.grid);
    this.new_level.grid = this.grid;
    this.user_service.createLevel(this.new_level)
    .toPromise().then((level_id)=> this.router.navigate(['/createdMap']))
    .catch(err => console.log(err))
  }

}
