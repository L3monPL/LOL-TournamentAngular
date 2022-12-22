import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Match, MatchRestService } from 'src/app/services/match-rest.service';
import { User, UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss']
})
export class MatchListComponent implements OnInit {

  subMatch?: Subscription;
  customErrorMatch?: string;
  loadingMatch = true
  matchListArray?: Array<Match>

  subTeam?: Subscription
  customErrorTeam?: string
  loadingTeam = false

  subUser?: Subscription;
  customErrorUser?: string;
  loadingUser = true
  userListArray?: Array<User>

  setRandomUsersInTeam = false
  randomTeam1 = []
  randomTeam2 = []
  currentRandomUsersArr = []

  userForm = new FormGroup({
    user1: new FormControl<null|User>(null,Validators.required),
    user2: new FormControl<number|null>(null,Validators.required),
    user3: new FormControl<number|null>(null,Validators.required),
    user4: new FormControl<number|null>(null,Validators.required),
    user5: new FormControl<number|null>(null,Validators.required),
    user6: new FormControl<number|null>(null,Validators.required)
  });

  constructor(
    private matchRest: MatchRestService,
    private userRest: UserRestService
  ) { }

  ngOnInit(): void {
    this.matchList()
    this.userList()
  }

  

  get f(){
    return this.userForm.controls;
  }

  matchList(){
    this.subMatch = this.matchRest.matchList().subscribe({
      next: (response) => {
          console.log(response.body)
          this.matchListArray = response.body!
          this.loadingMatch = false;
      },
      error: (errorResponse) => {
        switch (errorResponse.status) {
          case 400:
          case 401:
          case 403:
            this.customErrorMatch = errorResponse.error;
            this.loadingMatch = false;
            break;
        
          default:
            this.customErrorMatch = 'Błąd serwera'
            this.loadingMatch = false;
            break;
        }
      },
      complete: () => {
        this.loadingMatch = false;
      }
    })
  }

  createTeamToMatch(id: number){
    this.subTeam = this.matchRest.addTeamToMatch(id).subscribe({
      next: (response) => {
          this.matchList()
          this.loadingTeam = false;
      },
      error: (errorResponse) => {
        switch (errorResponse.status) {
          case 400:
          case 401:
          case 403:
            this.customErrorTeam = errorResponse.error;
            this.loadingTeam = false;
            break;
        
          default:
            this.customErrorTeam = 'Błąd serwera'
            this.loadingTeam = false;
            break;
        }
      },
      complete: () => {
        this.loadingTeam = false;
      }
    })
  }

  userList(){
    this.subUser = this.userRest.userList().subscribe({
      next: (response) => {
        this.userListArray = response.body!
          this.loadingUser = false;
      },
      error: (errorResponse) => {
        switch (errorResponse.status) {
          case 400:
          case 401:
          case 403:
            this.customErrorUser = errorResponse.error;
            this.loadingUser = false;
            break;
        
          default:
            this.customErrorUser = 'Błąd serwera'
            this.loadingUser = false;
            break;
        }
      },
      complete: () => {
        this.loadingUser = false;
      }
    })
  }

  randomTeamFromUsers(){
    let user1 = this.userForm.get('user1')?.value
    let user2 = this.userForm.get('user2')?.value
    let user3 = this.userForm.get('user3')?.value
    let user4 = this.userForm.get('user4')?.value
    let user5 = this.userForm.get('user5')?.value
    let user6 = this.userForm.get('user6')?.value



    if (this.userForm.valid) {
      var usersId = [Number(user1), Number(user2), Number(user3), Number(user4), Number(user5), Number(user6)]; 
      // var usersName = user1!.id

      // console.log(usersName)

      this.currentRandomUsersArr = this.random(usersId)

      console.log(this.currentRandomUsersArr)

      for (let index = 0; index < this.currentRandomUsersArr.length; index++) {
        if (index < this.currentRandomUsersArr.length/2) {
          this.randomTeam1.push(this.currentRandomUsersArr[index])
        }
        else{
          this.randomTeam2.push(this.currentRandomUsersArr[index])
        }
        
      }
      console.log(this.randomTeam1)
      console.log(this.randomTeam2)
      this.setRandomUsersInTeam = true


    }
  }

  random(usersId: any){
    
    for (let i = usersId.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [usersId[i], usersId[j]] = [usersId[j], usersId[i]];
    }
    return usersId
  }

}
