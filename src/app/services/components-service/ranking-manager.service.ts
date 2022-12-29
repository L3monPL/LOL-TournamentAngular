import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { RankingUsers, UserRestService } from '../user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class RankingManagerService {

  subRanking?: Subscription
  loadingRankingList = true
  customErrorRankingList?: string
  rankingList?: Array<RankingUsers>

  serviceRanking: EventEmitter<any> = new EventEmitter();

  constructor(
    private userRest: UserRestService
  ) { }

  getRankingList(){
    this.subRanking = this.userRest.usersRanking().subscribe({
      next: (response) => {
          console.log(response.body)
          this.rankingList = response.body!
          this.loadingRankingList = false;
          this.serviceRanking.emit(response.body!)
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
