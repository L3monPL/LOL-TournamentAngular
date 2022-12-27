import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserRestService } from 'src/app/services/user-rest.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  subUserAuth?: Subscription


  constructor(
    private userRest: UserRestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authUser()
  }

  authUser(){
    this.subUserAuth = this.userRest.currentUserAuth().subscribe({
      next: (response) => {
          console.log(response.body)
      },
      error: (errorResponse) => {
        switch (errorResponse.status) {
          case 400:
          case 401:
          case 403:
            // this.customErrorMatch = errorResponse.error;
            // this.loadingMatch = false;
            this.router.navigateByUrl('/login')

            break;
        
          default:
            // this.customErrorMatch = 'Błąd serwera'
            // this.loadingMatch = false;
            this.router.navigateByUrl('/login')
            break;
        }
      },
      complete: () => {
        // this.loadingMatch = false;
      }
    })
  }

  
  

}
