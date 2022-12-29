import { Component, OnInit } from '@angular/core';
import { ChampionPicked } from 'src/app/services/champion-rest.service';
import { ChampionManagerService } from 'src/app/services/components-service/champion-manager.service';

@Component({
  selector: 'app-champions-picked',
  templateUrl: './champions-picked.component.html',
  styleUrls: ['./champions-picked.component.scss']
})
export class ChampionsPickedComponent implements OnInit {

  
  championsPickedListArray?: Array<any>

  championsArray: any = [] 

  team1Arr?: string

  team2Arr?: string

  constructor(
    private championManager: ChampionManagerService
  ) { }

  ngOnInit(): void {
    this.championManager.getChampionsPickedList()
    this.subscribeChampionPickedList()
  }

  subscribeChampionPickedList(){
    this.championManager.serviceChampion.subscribe(
      res => {
        this.championsPickedListArray = res
        this.pushChampionToArray()
      },
      error => {}, 
      () => {})

  }

  pushChampionToArray(){
    for (let index = 0; index < this.championsPickedListArray!.length; index++) {
      let match = this.championsPickedListArray![index];
      // console.log(match)
      for (let indexTeam1 = 0; indexTeam1 < match.team_1.length; indexTeam1++) {
        this.team1Arr = match.team_1[indexTeam1].image
        console.log(this.team1Arr)
        this.championsArray!.push(this.team1Arr!)
      }
      for (let indexTeam2 = 0; indexTeam2 < match.team_2.length; indexTeam2++) {
        this.team2Arr = match.team_2[indexTeam2].image
        console.log(this.team2Arr)
        this.championsArray!.push(this.team2Arr!)
      }
    }

    console.log(this.championsArray!)

  }
  
  

}
