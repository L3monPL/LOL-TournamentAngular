import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  // private PATH = 'https://expressjslol.onrender.com/api'
  private PATH = 'http://localhost:3030/api'
  

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string):Observable<HttpResponse<any>>{
    return this.http.post<any>(this.PATH + `/user/login`,{
      email:email,
      password: password,
    }, {
      observe: 'response',
      responseType: 'json'
    })
  }


}
