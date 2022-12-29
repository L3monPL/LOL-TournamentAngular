import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Champion, ChampionRestService } from 'src/app/services/champion-rest.service';
import { ChampionManagerService } from 'src/app/services/components-service/champion-manager.service';
import { RankingManagerService } from 'src/app/services/components-service/ranking-manager.service';
import { UserDataService } from 'src/app/services/global-services/user-data.service';
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

  subMatchInProgress?: Subscription;
  customErrorMatchInProgress?: string;
  loadingMatchInProgress = true
  matchListArrayInProgress?: Array<Match>

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
  userListByIdTeam1: any[] = []
  userListByIdTeam2: any[] = []

  subCreateMatch?: Subscription
  customErrorCreateMatch?: string;
  loadingCreateMatch = true

  subAddUsersToMatch?: Subscription
  customErrorAddUsersToMatch?: string;
  loadingAddUsersToMatch = true

  subChampions?: Subscription
  customErrorChampions?: string;
  loadingChampions = true
  championsListArray?: Array<Champion>

  subPostChampionsToUsers?: Subscription
  customErrorPostChampionsToUsers?: string;
  loadingPostChampionsToUsers = true

  subPutMatchResult?: Subscription
  customErrorPutMatchResult?: string;
  loadingPutMatchResult = true

  userForm = new FormGroup({
    user1: new FormControl<number|null>(null,Validators.required),
    user2: new FormControl<number|null>(null,Validators.required),
    user3: new FormControl<number|null>(null,Validators.required),
    user4: new FormControl<number|null>(null,Validators.required),
    user5: new FormControl<number|null>(null,Validators.required),
    user6: new FormControl<number|null>(null,Validators.required)
  });

  championForm = new FormGroup({
    champion1: new FormControl<number|null>(null,Validators.required),
    champion2: new FormControl<number|null>(null,Validators.required),
    champion3: new FormControl<number|null>(null,Validators.required),
    champion4: new FormControl<number|null>(null,Validators.required),
    champion5: new FormControl<number|null>(null,Validators.required),
    champion6: new FormControl<number|null>(null,Validators.required)
  });

  constructor(
    private matchRest: MatchRestService,
    private userRest: UserRestService,
    public userData: UserDataService,
    private championRest: ChampionRestService,
    private championManager: ChampionManagerService,
    private rankingManager: RankingManagerService
  ) { }

  ngOnInit(): void {
    this.matchList()
    this.userList()
    this.matchListInProgress()
    this.getChampionsList()
  }

  

  get f(){
    return this.userForm.controls;
  }

  get f1(){
    return this.championForm.controls;
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

  matchListInProgress(){
    this.subMatchInProgress = this.matchRest.matchListInProgress().subscribe({
      next: (response) => {
          console.log(response.body)
          this.matchListArrayInProgress = response.body!
          this.loadingMatchInProgress = false;
      },
      error: (errorResponse) => {
        switch (errorResponse.status) {
          case 400:
          case 401:
          case 403:
            this.customErrorMatchInProgress = errorResponse.error;
            this.loadingMatchInProgress = false;
            break;
        
          default:
            this.customErrorMatchInProgress = 'Błąd serwera'
            this.loadingMatchInProgress = false;
            break;
        }
      },
      complete: () => {
        this.loadingMatchInProgress = false;
      }
    })
  }

  createTeamToMatch(id: number){
    this.subTeam = this.matchRest.addTeamToMatch(id).subscribe({
      next: (response) => {
          this.matchList()
          this.matchListInProgress()
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

    this.randomTeam1 = []
    this.randomTeam2 = []
    this.userListByIdTeam1 = []
    this.userListByIdTeam2 = []

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

      for (let index = 0; index < this.userListArray!.length; index++) {
        let currentUser = this.userListArray!.find(x => x.id === usersId[index])
        console.log(currentUser)
        if (index < 3) {
          this.userListByIdTeam1?.push(currentUser?.username)
        }else{
          this.userListByIdTeam2!.push(currentUser?.username)
        }
        
      }


      console.log(this.randomTeam1)
      console.log(this.randomTeam2)
      this.setRandomUsersInTeam = true

      console.log(this.userListByIdTeam1)
      console.log(this.userListByIdTeam2)


    }
  }

  random(usersId: any){
    
    for (let i = usersId.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [usersId[i], usersId[j]] = [usersId[j], usersId[i]];
    }
    return usersId
  }

  createNewMatch(){
// ID TO CHANGE FROM CURRENT USER
    this.subCreateMatch = this.matchRest.createMatch(1).subscribe({
      next: (response) => {
          this.matchListInProgress()
          this.loadingCreateMatch = false;
      },
      error: (errorResponse) => {
        switch (errorResponse.status) {
          case 400:
          case 403:
          case 405:
            this.customErrorCreateMatch = errorResponse.error;
            this.loadingCreateMatch = false;
            break;
        
          default:
            this.customErrorCreateMatch = 'Błąd serwera'
            this.loadingCreateMatch = false;
            break;
        }
      },
      complete: () => {
        this.loadingCreateMatch = false;
      }
    })
  }

  addUsersTomatch(matchId: number){
    // setUsersToMatch
    this.subAddUsersToMatch = this.matchRest.setUsersToMatch(matchId, this.randomTeam1, this.randomTeam2).subscribe({
      next: (response) => {
        this.matchListInProgress()
          this.loadingAddUsersToMatch = false;

          // this.championForm.get('champion1')?.setValue(null)
          // this.championForm.get('champion2')?.setValue(null)
          // this.championForm.get('champion3')?.setValue(null)
          // this.championForm.get('champion4')?.setValue(null)
          // this.championForm.get('champion5')?.setValue(null)
          // this.championForm.get('champion6')?.setValue(null)
      },
      error: (errorResponse) => {
        switch (errorResponse.status) {
          case 400:
          case 401:
          case 403:
            this.customErrorAddUsersToMatch = errorResponse.error;
            this.loadingAddUsersToMatch = false;
            break;
        
          default:
            this.customErrorAddUsersToMatch = 'Błąd serwera'
            this.loadingAddUsersToMatch = false;
            break;
        }
      },
      complete: () => {
        this.loadingAddUsersToMatch = false;
      }
    })
  }

  getChampionsList(){
    this.subChampions = this.championRest.championsList().subscribe({
      next: (response) => {
          this.championsListArray = response.body!
          this.loadingChampions = false;
      },
      error: (errorResponse) => {
        switch (errorResponse.status) {
          case 400:
          case 401:
          case 403:
            this.customErrorChampions = errorResponse.error;
            this.loadingChampions = false;
            break;
        
          default:
            this.customErrorChampions = 'Błąd serwera'
            this.loadingChampions = false;
            break;
        }
      },
      complete: () => {
        this.loadingChampions = false;
      }
    })
  }

  addChampionsToUsers(matchId: number){
    let champion1 = this.championForm.get('champion1')?.value
    let champion2 = this.championForm.get('champion2')?.value
    let champion3 = this.championForm.get('champion3')?.value
    let champion4 = this.championForm.get('champion4')?.value
    let champion5 = this.championForm.get('champion5')?.value
    let champion6 = this.championForm.get('champion6')?.value

    let champions_team_1
    let champions_team_2

    champions_team_1 = [Number(champion1), Number(champion2), Number(champion3)]
    champions_team_2 = [Number(champion4), Number(champion5), Number(champion6)]

    if (this.championForm.valid) {
      this.subPostChampionsToUsers = this.matchRest.postChampionToUsers(matchId, champions_team_1, champions_team_2).subscribe({
        next: (response) => {
          this.matchListInProgress()
            this.loadingPostChampionsToUsers = false;
        },
        error: (errorResponse) => {
          switch (errorResponse.status) {
            case 400:
            case 401:
            case 403:
              this.customErrorPostChampionsToUsers = errorResponse.error;
              this.loadingPostChampionsToUsers = false;
              break;
          
            default:
              this.customErrorPostChampionsToUsers = 'Błąd serwera'
              this.loadingPostChampionsToUsers = false;
              break;
          }
        },
        complete: () => {
          this.loadingPostChampionsToUsers = false;
        }
      })
    }
  }

  resultWinTeam1(matchId: number){
    let result = 'team1'
    this.putMatchResult(matchId, result)
  }

  resultWinTeam2(matchId: number){
    let result = 'team2'
    this.putMatchResult(matchId, result)
  }

  putMatchResult(matchId: number, result: string){
    this.subPutMatchResult = this.matchRest.putMatchResult(matchId, result).subscribe({
      next: (response) => {
        this.matchListInProgress()
        this.matchList()
        this.championManager.getChampionsPickedList()
        this.rankingManager.getRankingList()
        this.loadingPutMatchResult = false;
      },
      error: (errorResponse) => {
        switch (errorResponse.status) {
          case 400:
          case 401:
          case 403:
            this.customErrorPutMatchResult = errorResponse.error;
            this.loadingPutMatchResult = false;
            break;
        
          default:
            this.customErrorPutMatchResult = 'Błąd serwera'
            this.loadingPutMatchResult = false;
            break;
        }
      },
      complete: () => {
        this.loadingPutMatchResult = false;
      }
    })
  }

}
