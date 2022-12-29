import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChampionPicked, ChampionRestService } from '../champion-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ChampionManagerService {

  subChampionsPicked?: Subscription
  customErrorChampionsPicked?: string
  loadingChampionsPicked = true
  championsPickedListArray?: Array<ChampionPicked>

  serviceChampion: EventEmitter<any> = new EventEmitter();

  constructor(
    private championRest: ChampionRestService
  ) { }

  getChampionsPickedList(){
    this.subChampionsPicked = this.championRest.championsPickedList(5).subscribe({
      next: (response) => {
          this.championsPickedListArray = response.body!
          this.loadingChampionsPicked = false;
          this.serviceChampion.emit(response.body)
      },
      error: (errorResponse) => {
        switch (errorResponse.status) {
          case 400:
          case 401:
          case 403:
            this.customErrorChampionsPicked = errorResponse.error;
            this.loadingChampionsPicked = false;
            break;
        
          default:
            this.customErrorChampionsPicked = 'Błąd serwera'
            this.loadingChampionsPicked = false;
            break;
        }
      },
      complete: () => {
        this.loadingChampionsPicked = false;
      }
    })
  }
}
