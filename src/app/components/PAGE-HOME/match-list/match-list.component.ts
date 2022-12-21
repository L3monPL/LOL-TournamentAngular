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
  customError?: string;
  loading = true

  matchListArray?: Array<Match>

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
      },
      error: (errorResponse) => {
        switch (errorResponse.status) {
          case 400:
          case 401:
          case 403:
            this.customError = errorResponse.error;
            this.loading = false;
            break;
        
          default:
            this.customError = 'Błąd serwera'
            this.loading = false;
            break;
        }
      },
      complete: () => {
        this.loading = false;
      }
    }
  )}

}
