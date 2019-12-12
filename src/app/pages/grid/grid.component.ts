import { Component, OnInit, Inject } from '@angular/core';
import { Board } from 'src/app/models/board.model';
//import { Row } from 'src/app/models/row.model';
//import { Tiles } from 'src/app/models/tiles.model';
import { Candy } from 'src/app/models/candy.model';
//import { v4 as uuid } from 'uuid';
import { CandyType } from 'src/app/models/enum/candytype.enum';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Title } from '@angular/platform-browser';
import { User } from '../../models/user';
import { AppService } from '../../app.service'
import { Router } from "@angular/router"
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { DialoglooseComponent } from '../dialogloose/dialogloose.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {trigger,state,style,animate,transition,keyframes} from '@angular/animations';
import { timeout } from 'q';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  animations: [
    // animation triggers go here
    trigger('animateCandy', [
      state('blue', style({
        opacity: 1,
        transform: 'translateY(0%)',
        'background-image': "url('blue.jpg')"
      })),
      state('red', style({
        opacity: 1,
        transform: 'translateY(0%)',
        'background-image': "url('redcolour.jpg')"
      })),
      state('green', style({
        opacity: 1,
        transform: 'translateY(0%)',
        'background-image': "url('Greencandy.png')"
      })),
      state('yellow', style({
        opacity: 1,
        transform: 'translateY(0%)',
        'background-image': "url('yellowcolor.jpg')"
      })),
      state('violet', style({
        opacity: 1,
        transform: 'translateY(0%)',
        'background-image': "url('Purplejelly.png')"
      })),
      state('orange', style({
        opacity: 1,
        transform: 'translateY(0%)',
        'background-image': "url('orangecolor.jpg')"
      })),
      transition('* => nocolor', [
        animate('0.5s', keyframes([
          style({opacity: 0}),
        ]
        ))
      ]),
      transition('* => *', [
        animate('0.5s', keyframes([
          style({transform: 'translateY(-75%)'}),
          style({transform: 'translateY(-50%)'}),
          style({transform: 'translateY(-25%)'}),
          style({ transform: 'translateY(0%)'})
        ]

        ))
      ])

    ])
  ]
})
export class GridComponent implements OnInit {
//initilize all variables
  board: Board = new Board([]); numOfRows: number = 6; numOfColumns: number = 6;
  score: number = 0; turns: number = 5; scoreToBeat: number = 15;
  user: User; users: User[];
  matrix: any; size:number; level_id: number;
  gameEnd: Boolean = false;   found: Boolean = false;
  savedGrid: string = ""; gridString: string; gridArray: any;
  count: number = 0; levelLeaderboard: any;

  constructor(
    private titleService: Title,
    private user_service: AppService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MatDialog) public dialog: MatDialog,
  ) {
    this.titleService.setTitle('CandyCrush');
  }

  getRandomCandy(): CandyType {
    var value = Math.floor(Math.random() * Math.floor(6));
    if (value == 0) {
      return CandyType.Blue
    } else if (value == 1) {
      return CandyType.Green
    } else if (value == 2) {
      return CandyType.Red
    }else if(value ==3){
      return CandyType.yellow
    }else if(value ==4){
      return CandyType.violet
    }else if(value ==5){
      return CandyType.orange
    }else if(value ==6){
      return CandyType.black
    }
    else if(value ==7){
      return CandyType.brown
    }
    else if(value ==8){
      return CandyType.white
    }
  }
  setRandomCandy(color): CandyType{
    if (color == 'blue') {
      return CandyType.Blue
    } else if (color == 'green') {
      return CandyType.Green
    } else if (color == 'red') {
      return CandyType.Red
    }else if(color =='yellow'){
      return CandyType.yellow
    }else if(color =='violet'){
      return CandyType.violet
    }else if(color =='orange'){
      return CandyType.orange
    }else if(color =='white'){
      return CandyType.white
    }
    else if(color =='brown'){
      return CandyType.brown
    }
    else if(color =='black'){
      return CandyType.black
    }
  }

  ngOnInit() {
    this.user = new User();
    this.count =0 ;
    this.levelLeaderboard = new Array;
    //this.scoreToBeat *= (+this.route.snapshot.queryParamMap.get("level"))

    //check if user is logged in.
    this.user_service.logged()
    .toPromise().then((user) => {
      this.user = user;
      //and then find saved game if there is one for the level/user
      this.user_service.getSavedLevel(+this.route.snapshot.queryParamMap.get('level'), this.user)
      .toPromise().then((savedLevel) => {
        this.found = true;
        if(savedLevel['grid'] == ''){
          this.found = false;
        }
        if(savedLevel['turns'] == 0){
          this.found = false;
        }
        //i think object of {level, user} is being returned. So find first index for level and grab information that way.
        console.log("123012312312830-12930-12930-12931-203")
        console.log(savedLevel)
        //grab information and store in instance variables
        this.level_id = savedLevel['level_id']; this.score = savedLevel['score'];
        this.scoreToBeat = savedLevel['scoreToBeat']; this.turns = savedLevel['turns']; this.matrix = savedLevel['dimensions'];
        this.gridString = savedLevel['grid']; this.gridArray = this.gridString.split(" ");
        console.log('grid' + "     " + this.gridString)
        console.log(this.matrix)
        this.count = 0;
        // console.log("matrix is" + this.matrix); // popular
        var y = +this.matrix;
        this.size=(y*60)+((y*5)-5); this.numOfRows=y; this.numOfColumns=y;
        if(this.found==true){
          for (var row = 0; row < this.numOfRows; row++) {
            this.board.grid[row] = []
            for (var column = 0; column < this.numOfColumns; column++) {
              var candy = new Candy(row, column, this.setRandomCandy(this.gridArray[this.count]))
              this.board.grid[row][column] = candy
              this.count++;
            }
          }

        }
        // console.log(this.scoreToBeat +" " + this.turns + this.matrix)
        this.checkGrid();
      })
      .catch((err) => {
        //404 not found, make sure found is false so it loads default grid
        this.found = false;
        console.log('No saved game. loading default grid for level', err)
      })})
    .catch(err => {this.router.navigate([""])})


    //grabbing level id from param and grabbing level information from DB
    //finding game in progress if it exists, if not just grab regular default grid



    //if you cant find saved game for that user and that specific level, just load default grid for that level
    if(this.found == false){
      //
      this.user_service.getLevel(+this.route.snapshot.queryParamMap.get('level'))
    .toPromise().then((level) => {
      //i think object of {level, user} is being returned. So find first index for level and grab information that way.
      this.level_id = level.level_id
      this.scoreToBeat = level.scoreToBeat; this.turns = level.turns; this.matrix = level.dimensions;
      this.gridString = level.grid; this.gridArray = this.gridString.split(" ");
      // console.log("matrix is" + this.matrix); // popular
      var y = this.matrix;
      this.size=(y*60)+((y*5)-5); this.numOfRows=y; this.numOfColumns=y;

      for (var row = 0; row < this.numOfRows; row++) {
        this.board.grid[row] = []
        for (var column = 0; column < this.numOfColumns; column++) {
          var candy = new Candy(row, column, this.setRandomCandy(this.gridArray[this.count]))
          //console.log(candy.type)
          this.board.grid[row][column] = candy
          this.count++;

        }
      }
      // console.log(this.scoreToBeat +" " + this.turns + this.matrix)
      this.checkGrid();


    })
    .catch((err) => {
      this.level_id = +this.route.snapshot.queryParamMap.get('level')
      var y = +this.matrix; this.size=(y*60)+((y*5)-5); this.numOfRows=y; this.numOfColumns=y;

      for (var row = 0; row < this.numOfRows; row++) {
        this.board.grid[row] = []
        for (var column = 0; column < this.numOfColumns; column++) {
          var candy = new Candy(row, column, this.getRandomCandy())
          //console.log(candy.type)
          this.board.grid[row][column] = candy
        }
      }
      this.checkGrid();

    })
    }

    //get top 3 levelleaderboard from database
    this.user_service.getLevelLeaderboard( +this.route.snapshot.queryParamMap.get('level'))
    .toPromise().then( (leaderboard) => {this.levelLeaderboard = leaderboard;console.log('getlevelleaderboard in grid compoennt');console.log(this.levelLeaderboard)})
    .catch((err) => {console.log('error in getlevel leaderboard componentts', err)})

    // this.turns += (+this.route.snapshot.queryParamMap.get('level'));
    // this.matrix = this.route.snapshot.queryParamMap.get("matrix")
    //grabbing matrix from level in DB
    // this.route.queryParamMap.subscribe(queryParams => {
    //   this.matrix = queryParams.get("matrix")
    // })
    // this.matrix = this.route.snapshot.paramMap.get("matrix")

  }
  //log the user out.
  logout(){
    this.user_service.logout()
    .toPromise().then(() => this.router.navigate(["/"]))
    .catch(err=> console.log("user logout error", err))

  }
  //this is to save current user game information to resume later
  save(){
    console.log(this.matrix)
    console.log('tHIS IS MATRIX DIMENSION')
    this.user_service.saveLevel(this.level_id,this.user, this.matrix, this.turns, this.score, this.scoreToBeat, this.savedGrid)
    .toPromise().then(result => console.log("userservice result" + result))
    .catch( err => console.log('error in savelevel service', err))
  }
  onSwipeLeft(event, candy: Candy) {
    if (candy.y == 0 || this.turns == 0) {
      return
    }

    var row = this.board.grid[candy.x]
    var leftSideCandy = row[candy.y - 1]
    moveItemInArray(row, candy.y, candy.y - 1);

    candy.y -= 1
    leftSideCandy.y += 1

    var success = this.localCheck(0, candy.x, candy.y, 0, candy.type);
    var success2 = this.localCheck(0, candy.x, candy.y + 1, 0, this.board.grid[candy.x][candy.y + 1].type);
    //if both becomes fails swipe back.
    if (success == 0 && success2 == 0) {
      var rightSideCandy = row[candy.y + 1]
      moveItemInArray(row, candy.y, candy.y + 1);

      candy.y += 1
      rightSideCandy.y -= 1
    } else {
      this.turns--
      console.log(this.turns)
      setTimeout(() => {
        this.shiftCandy();
      }, 600);
    }

  }
  onSwipeRight(event, candy: Candy) {
    var row = this.board.grid[candy.x]
    if (candy.y == row.length - 1 || this.turns == 0) {
      return


    }

    var rightSideCandy = row[candy.y + 1]
    moveItemInArray(row, candy.y, candy.y + 1);

    candy.y += 1
    rightSideCandy.y -= 1

    var success = this.localCheck(0, candy.x, candy.y, 0, candy.type);
    var success2 = this.localCheck(0, candy.x, candy.y - 1, 0, this.board.grid[candy.x][candy.y - 1].type);
    if (success == 0 && success2 == 0) {
      var leftSideCandy = row[candy.y - 1]
      moveItemInArray(row, candy.y, candy.y - 1);

      candy.y -= 1
      leftSideCandy.y += 1
    } else {
      this.turns--
      setTimeout(() => {
        this.shiftCandy();
      }, 600);
    }
  }

  onSwipeUp(event, candy: Candy) {
    if (candy.x == 0 || this.turns == 0) {
      return
    }
    var currentCandy = this.board.grid[candy.x][candy.y]
    var candyaboveCurrent = this.board.grid[candy.x - 1][candy.y]
    var currentType = currentCandy.type
    currentCandy.type = candyaboveCurrent.type
    candyaboveCurrent.type = currentType

    var success = this.localCheck(0, candy.x, candy.y, 0, candy.type);
    var success2 = this.localCheck(0, candy.x - 1, candy.y, 0, this.board.grid[candy.x - 1][candy.y].type);
    if (success == 0 && success2 == 0) {
      console.log(success);
      var currentCandy = this.board.grid[candy.x][candy.y]
      var candyBelowCurrent = this.board.grid[candy.x - 1][candy.y]

      //console.log("currentcandy"+currentCandy)
      // Exchange the type of the two candies.
      var currentType = currentCandy.type
      currentCandy.type = candyBelowCurrent.type
      candyBelowCurrent.type = currentType

    } else {
      this.turns--
      setTimeout(() => {
        this.shiftCandy();
      }, 600);
    }
  }
  onSwipeDown(event, candy: Candy) {
    if (candy.x == this.numOfRows - 1 || this.turns == 0) {
      return
    }
    var currentCandy = this.board.grid[candy.x][candy.y]
    var candyBelowCurrent = this.board.grid[candy.x + 1][candy.y]

    //console.log("currentcandy"+currentCandy)
    // Exchange the type of the two candies.
    var currentType = currentCandy.type
    currentCandy.type = candyBelowCurrent.type
    candyBelowCurrent.type = currentType

    var success = this.localCheck(0, candy.x, candy.y, 0, candy.type);
    var success2 = this.localCheck(0, candy.x + 1, candy.y, 0, this.board.grid[candy.x + 1][candy.y].type);
    if (success == 0 && success2 == 0) {
      console.log(success);
      var currentCandy = this.board.grid[candy.x][candy.y]
      var candyBelowCurrent = this.board.grid[candy.x + 1][candy.y]

      //console.log("currentcandy"+currentCandy)
      // Exchange the type of the two candies.
      var currentType = currentCandy.type
      currentCandy.type = candyBelowCurrent.type
      candyBelowCurrent.type = currentType

    } else {
      this.turns--
      setTimeout(() => {
        this.shiftCandy();
      }, 600);
    }
  }

  public localCheck(direction: number, x: number, y: number, sum: number, type: CandyType) {
    var up = 0;
    var down = 0;
    var left = 0;
    var right = 0;
    var success = false;

    if (direction == 0) {
      up = this.localCheck(1, x, (y + 1), 0, type);
      down = this.localCheck(2, x, (y - 1), 0, type);
      left = this.localCheck(3, (x - 1), y, 0, type);
      right = this.localCheck(4, (x + 1), y, 0, type);

    } else if (direction == 1) {

      if (y < this.numOfRows) {

        if (this.board.grid[x][y].type == type) {

          sum += 1;
          return this.localCheck(1, x, (y + 1), sum, type);

        } else {
          return sum;
        }
      } else {
        return sum;
      }

    } else if (direction == 2) {
      if (y >= 0) {

        if (this.board.grid[x][y].type == type) {

          sum += 1;
          return this.localCheck(2, x, (y - 1), sum, type);

        } else {
          return sum;
        }

      } else {
        return sum;
      }
    } else if (direction == 3) {
      if (x >= 0) {

        if (this.board.grid[x][y].type == type) {

          sum += 1;
          return this.localCheck(3, (x - 1), y, sum, type);

        } else {
          return sum;
        }

      } else {
        return sum;
      }

    } else if (direction == 4) {
      if (x < this.numOfRows) {

        if (this.board.grid[x][y].type == type) {

          sum += 1;
          return this.localCheck(4, (x + 1), y, sum, type);

        } else {
          return sum;
        }

      } else {
        return sum;
      }

    }

    //_____deleting candies____________________________________________________
    if ((up + down) >= 2) {
      for (var i = 0; i <= up; i++) {
        this.board.grid[x][y + i].type = CandyType.nocolor;
        if (this.board.grid[x][y + i].type != CandyType.nocolor) {
          this.score++;
        }
      }
      for (var i = 0; i <= down; i++) {
        if (this.board.grid[x][y - i].type != CandyType.nocolor) {
          this.score++;
        }
        this.board.grid[x][y - i].type = CandyType.nocolor;

      }
      success = true;
    }
    if ((left + right) >= 2) {
      for (var i = 0; i <= left; i++) {
        if (this.board.grid[x - i][y].type != CandyType.nocolor) {
          this.score++;
        }
        this.board.grid[x - i][y].type = CandyType.nocolor;
      }
      for (var i = 0; i <= right; i++) {
        if (this.board.grid[x + i][y].type != CandyType.nocolor) {
          this.score++;
        }
        this.board.grid[x + i][y].type = CandyType.nocolor;
        success = true;
      }
    }
    this.wait(10)
    console.log(this.score)
    if (success == true) {
      return 1;
    }
    return 0;

  }
  public shiftCandy() {
    let temporary = 0;
    //loop through 2d matrix from bottom right to top left
    for (let i = this.numOfRows - 1; i >= 0; i--) {
      for (let k = this.numOfColumns - 1; k >= 0; k--) {
        //iterate through 2dmatrix, if you find an 'E' colored candy:
        let temp = i;
        let mark = i;
        while ((this.board.grid[temp][k].type == CandyType.nocolor) && (temp - 1 >= 0)) {
          //if u find a colored candy above E, swap them
          if (this.board.grid[temp - 1][k].type != CandyType.nocolor) {
            //couldnt swap for some reason so just decided to swap colors
            this.board.grid[mark][k].type = this.board.grid[temp - 1][k].type;
            this.board.grid[temp - 1][k].type = CandyType.nocolor;
            this.slideDown(mark, k)
            break;
          }
          //if u find another E on top, keep going up
          else {
            temp--;
          }
        }
        //if you made it all the way up to the top, make the whole row random candies
        if (temp <= 0) {
          for (let j = mark; j >= 0; j--) {
            //this.board.grid[j][k].type = this.getRandomCandy()
          }
        }
        else {
          for (let j = 0; j < this.numOfRows; j++) {
            if (this.board.grid[0][j].type == CandyType.nocolor) {
              this.board.grid[0][j].type = this.getRandomCandy();
              this.slideDown(0, j)
            }
          }
        }

      }
    }
    setTimeout(() => {
      this.checkGrid();
    }, 600);
  }

  //returns an array of coordinates to delete
  public checkGrid() {
    this.savedGrid = '';
    let removeCandyArr = [];
    var vdict = {}; var hcount = 0; var hArr = []; let colorMarker = CandyType.nocolor;
    //iterate through 2d matrix
    for (let i = 0; i < this.numOfRows; i++) {
      for (let k = 0; k < this.numOfColumns; k++) {
        if(this.savedGrid == ""){
          this.savedGrid += this.board.grid[i][k].type
        }
        else{
          this.savedGrid += " "+ this.board.grid[i][k].type;
        }
        //console.log(hArr);

        //if dict doesnt exist, put in first entry
        // dict = {
        //    '0' : ['G', 2, [[0,0], [1,0]]
        // }
        //checking for horizontal 3 in a row
        if (this.board.grid[i][k].type != colorMarker) {
          if (hcount >= 3) {
            for (let j = 0; j < hArr.length; j++) {

              removeCandyArr.push(hArr[j]);
            }
          }
          hArr = [];
          hArr.push([i, k]);
          hcount = 1;
          colorMarker = this.board.grid[i][k].type;
        } else {
          hArr.push([i, k]);
          hcount += 1;
        }
        //check for vertical 3 or more using hashmap w/ array
        //uses k index as key and 1st index of value is letter, 2nd is count, 3rd is array of coordinates
        if (typeof vdict[k] == "undefined") {
          vdict[k] = [];
          vdict[k][0] = this.board.grid[i][k].type;
          vdict[k][1] = 1;
          vdict[k][2] = [[i, k]];
        }
        else {
          if (vdict[k][0] == this.board.grid[i][k].type) {
            vdict[k][1] += 1;
            vdict[k][2].push([i, k]);
          }
          else {
            if (vdict[k][1] >= 3) {
              for (let j = 0; j < vdict[k][2].length; j++) {

                removeCandyArr.push(vdict[k][2][j]);
              }
            }
            vdict[k][0] = this.board.grid[i][k].type;
            vdict[k][1] = 1;
            vdict[k][2] = [[i, k]];
          }
        }
      }
      if (hcount >= 3) {
        for (let j = 0; j < hArr.length; j++) {
          console.log(1)
          removeCandyArr.push(hArr[j]);
        }
      }
      colorMarker = CandyType.nocolor;
      hArr = [];
      hcount = 0;
    }
    //another checker after finish iterating through 2d matrix. final checker to see if last element creates 3 or more in a vertical row
    for (let i = 0; i < this.numOfRows; i++) {
      if (vdict[i][1] >= 3) {
        for (let j = 0; j < vdict[i][2].length; j++) {
          console.log(2);
          removeCandyArr.push(vdict[i][2][j]);
        }
      }
    }
    //final checker to see if last element makes a 3 or more in a horizontal row
    if (hcount >= 3) {
      for (let j = 0; j < hArr.length; j++) {
        console.log(3);
        removeCandyArr.push(hArr[j]);
      }
    }
    this.removeCandy(removeCandyArr)
    return removeCandyArr;
  }

  //returns an array with 'E' marked candies to delete
  public removeCandy(removeCandyArr) {
    // let set = new Set(removeCandyArr.map(JSON.stringify));
    // let newRemoveCandyArr = Array.from(set).map(JSON.parse);
    let newRemoveCandyArr = removeCandyArr;
    if (removeCandyArr.length != 0) {


      //take in 2d matrix and arr of coordinates to replace value with 'E'
      for (let i = 0; i < newRemoveCandyArr.length; i++) {
        this.board.grid[newRemoveCandyArr[i][0]][newRemoveCandyArr[i][1]].type = CandyType.nocolor;
        this.score++;
      }
      console.log(this.score)
      setTimeout(() => {
        this.shiftCandy();
      }, 600);
    } else if (this.turns == 0) {

      //had a bug where you could submit multiple game finishes if you played fast enough
      //boolean solves this problem
      if(this.gameEnd == false){
        //if score isnt greater than the score to beat, then you lose
        if (this.score >= this.scoreToBeat) {
          console.log('final score' + this.score)
          this.user.totalScore += this.score;
          //update user global score
          this.user_service.updateUserScore(this.user, this.score)
          .toPromise().then(() => {
            console.log('got back from update user score')
            //update the global leaderboard
            this.user_service.updateLeaderboard(this.level_id, this.user, this.score)
            .toPromise().then((content) => console.log(content))
            .catch( (err) => console.log('err in grid component afte update leaderboard', err))
            //make sure to delete the user progress, so they dont keep playing from the same saved point
            this.user_service.deleteSavedLevel(this.level_id, this.user)
            .toPromise().then(result => console.log(result))
            .catch(err => console.log(err))
            //once you finish once, makes ure you cant enter here again
            this.gameEnd = true;
            //display you win box
            this.showDialog()
          })
          .catch((err) => console.log("error in remove candy show dialog", err))
        } else {
          console.log('final score' + this.score)
          this.gameEnd = true;
          //display you lose box
          this.showDialogloose();
        }
      }

    } else this.checkValidGrid();
  }
  public wait(ms) {
    var start = Date.now(),
      now = start;
    while (now - start < ms) {
      now = Date.now();
    }
  }
  public checkValidGrid() {

    //check each candy
    for (let i = 0; i < this.numOfRows; i++) {
      for (let j = 0; j < this.numOfColumns; j++) {

        //checks if there is a candy adjacent and if so, if there is any candy that can be moved on the other side
        //to make a 3 in a row

        //adjacent is right so checks candies left
        if (j + 1 < this.numOfColumns) {
          if (this.board.grid[i][j + 1].type == this.board.grid[i][j].type) {
            if (j - 2 >= 0) {
              if (this.board.grid[i][j - 2].type == this.board.grid[i][j].type) {
                return
              }
            }
            if (i - 1 >= 0 && j - 1 >= 0) {
              if (this.board.grid[i - 1][j - 1].type == this.board.grid[i][j].type) {
                return
              }
            }
            if (i + 1 < this.numOfRows && j - 1 >= 0) {
              if (this.board.grid[i + 1][j - 1].type == this.board.grid[i][j].type) {
                return
              }
            }
          }
        }
        //adjacent is left so checks candies right
        if (j - 1 >= 0) {
          if (this.board.grid[i][j - 1].type == this.board.grid[i][j].type) {
            if (j + 2 < this.numOfColumns) {
              if (this.board.grid[i][j + 2].type == this.board.grid[i][j].type) {
                return
              }
            }
            if (i - 1 >= 0 && j + 1 < this.numOfColumns) {
              if (this.board.grid[i - 1][j + 1].type == this.board.grid[i][j].type) {
                return
              }
            }
            if (i + 1 < this.numOfRows && j + 1 < this.numOfColumns) {
              if (this.board.grid[i + 1][j + 1].type == this.board.grid[i][j].type) {
                return
              }
            }
          }
        }
        //adjacent is below so checks candies above
        if (i + 1 < this.numOfRows) {
          if (this.board.grid[i + 1][j].type == this.board.grid[i][j].type) {
            if (i - 2 >= 0) {
              if (this.board.grid[i - 2][j].type == this.board.grid[i][j].type) {
                return
              }
            }
            if (i - 1 >= 0 && j - 1 >= 0) {
              if (this.board.grid[i - 1][j - 1].type == this.board.grid[i][j].type) {
                return
              }
            }
            if (i - 1 >= 0 && j + 1 < this.numOfColumns) {
              if (this.board.grid[i - 1][j + 1].type == this.board.grid[i][j].type) {
                return
              }
            }
          }
        }
        //adjacent is above so checks candies below
        if (i - 1 >= 0) {
          if (this.board.grid[i - 1][j].type == this.board.grid[i][j].type) {
            if (i + 2 < this.numOfRows) {
              if (this.board.grid[i + 2][j].type == this.board.grid[i][j].type) {
                return
              }
            }
            if (i + 1 < this.numOfRows && j - 1 >= 0) {
              if (this.board.grid[i + 1][j - 1].type == this.board.grid[i][j].type) {
                return
              }
            }
            if (i + 1 < this.numOfRows && j + 1 < this.numOfColumns) {
              if (this.board.grid[i + 1][j + 1].type == this.board.grid[i][j].type) {
                return
              }
            }
          }
        }

        //checks to see if candy can be moved between two candies to make a 3 in a row

        //above
        if (i - 1 >= 0) {
          if (j - 1 >= 0 && j + 1 < this.numOfColumns) {
            if (this.board.grid[i - 1][j - 1].type == this.board.grid[i][j].type && this.board.grid[i - 1][j + 1].type == this.board.grid[i][j].type) {
              return
            }
          }
        }
        //below
        if (i + 1 < this.numOfRows) {
          if (j - 1 >= 0 && j + 1 < this.numOfColumns) {
            if (this.board.grid[i + 1][j - 1].type == this.board.grid[i][j].type && this.board.grid[i + 1][j + 1].type == this.board.grid[i][j].type) {
              return
            }
          }
        }
        //left
        if (j - 1 >= 0) {
          if (i - 1 >= 0 && i + 1 < this.numOfRows) {
            if (this.board.grid[i - 1][j - 1].type == this.board.grid[i][j].type && this.board.grid[i + 1][j - 1].type == this.board.grid[i][j].type) {
              return
            }
          }
        }
        //right
        if (j + 1 < this.numOfColumns) {
          if (i - 1 >= 0 && i + 1 < this.numOfRows) {
            if (this.board.grid[i - 1][j + 1].type == this.board.grid[i][j].type && this.board.grid[i + 1][j + 1].type == this.board.grid[i][j].type) {
              return
            }
          }
        }
      }
    }
    console.log("no more moves available")
    // alert("no more moves available")
    this.colorScramble();
  }

  public colorScramble() {
    var colorDict = {}

    //records the number of each color
    for (var i = 0; i < this.numOfRows; i++) {
      for (var j = 0; j < this.numOfColumns; j++) {
        if (isNaN(colorDict[this.board.grid[i][j].type])) {
          colorDict[this.board.grid[i][j].type] = 1;
        } else {
          colorDict[this.board.grid[i][j].type] += 1;
        }
      }
    }

    //replaces candies with other candies
    for (var i = 0; i < this.numOfRows; i++) {
      for (var j = 0; j < this.numOfColumns; j++) {
        var done = false;
        while (done == false) {
          var color: CandyType = this.getRandomCandy();
          if (colorDict[color] > 0) {
            this.board.grid[i][j].type = color;
            colorDict[color] -= 1;
            done = true;
          }
        }
      }
    }
    this.checkGrid()

  }

//dialog boxes after game end
  showDialog() {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

  }
  showDialogloose() {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(DialoglooseComponent, dialogConfig);
  }
  public slideDown(x: number, y: number) {
    var temp: string = x.toString() + y.toString()
    // document.getElementById(temp).animate([
    //   { transform: 'translateY(-75%)' },
    //   { transform: 'translateY(0%)' }]
    //   , {
    //   duration: 600
    // });
  }
}


// {transform: 'translateY(-75%)'},
// { transform: 'translateY(0%)'}

// npm WARN @angular/animations@8.2.14 requires a peer of @angular/core@8.2.14
// but none is installed. You must install peer dependencies yourself.
