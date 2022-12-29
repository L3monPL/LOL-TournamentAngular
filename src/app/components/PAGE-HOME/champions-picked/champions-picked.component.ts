import { Component, OnInit } from '@angular/core';
import { ChampionPicked } from 'src/app/services/champion-rest.service';
import { ChampionManagerService } from 'src/app/services/components-service/champion-manager.service';

@Component({
  selector: 'app-champions-picked',
  templateUrl: './champions-picked.component.html',
  styleUrls: ['./champions-picked.component.scss']
})
export class ChampionsPickedComponent implements OnInit {

  
  championsPickedListArray?: Array<ChampionPicked>

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
      },
      error => {}, 
      () => {})

  }
  
  

}
