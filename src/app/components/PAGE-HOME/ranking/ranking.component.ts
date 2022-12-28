import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDataService } from 'src/app/services/global-services/user-data.service';
import { RankingUsers, UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  subRanking?: Subscription
  loadingRankingList = true
  customErrorRankingList?: string
  rankingList?: Array<RankingUsers>

  constructor(
    private userRest: UserRestService,
    public userData: UserDataService
  ) { }

  ngOnInit(): void {
    this.getRankingList()
  }

  getRankingList(){
    this.subRanking = this.userRest.usersRanking().subscribe({
      next: (response) => {
          console.log(response.body)
          this.rankingList = response.body!
          this.loadingRankingList = false;
      },
      error: (errorResponse) => {
        switch (errorResponse.status) {
          case 400:
          case 401:
          case 403:
            this.customErrorRankingList = errorResponse.error;
            this.loadingRankingList = false;
            break;
        
          default:
            this.customErrorRankingList = 'Błąd serwera'
            this.loadingRankingList = false;
            break;
        }
      },
      complete: () => {
        this.loadingRankingList = false;
      }
    })
  }

}
