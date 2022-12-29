import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RankingManagerService } from 'src/app/services/components-service/ranking-manager.service';
import { UserDataService } from 'src/app/services/global-services/user-data.service';
import { RankingUsers, UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  // subRanking?: Subscription
  // loadingRankingList = true
  // customErrorRankingList?: string
  rankingList?: Array<RankingUsers>

  constructor(
    private userRest: UserRestService,
    public userData: UserDataService,
    private rankingManager: RankingManagerService
  ) { }

  ngOnInit(): void {
    this.subscribeRankingList()
    this.rankingManager.getRankingList()
  }

  subscribeRankingList(){
    this.rankingManager.serviceRanking.subscribe(
      res => {
        this.rankingList = res
      },
      error => {}, 
      () => {})

  }

  

}
