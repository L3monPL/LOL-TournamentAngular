import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Match, MatchRestService } from 'src/app/services/match-rest.service';

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

  constructor(
    private matchRest: MatchRestService
  ) { }

  ngOnInit(): void {
    this.matchList()
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

}
