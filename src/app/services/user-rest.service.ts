import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User{
  id: number,
  username: string,
  email: string,
  created_at: string,
}

export interface CurrentUserStats{
  id: number,
  user_id: number,
  wins: number,
  lost: number,
}

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
      responseType: 'json',
      withCredentials: true
    })
  }

  currentUserAuth():Observable<HttpResponse<User>>{
    return this.http.get<User>(this.PATH + '/user/auth/currentUser',{
      observe: 'response',
      responseType: 'json',
      withCredentials: true
    })
  }
  userList():Observable<HttpResponse<Array<User>>>{
    return this.http.get<Array<User>>(this.PATH + '/user',{
      observe: 'response',
      responseType: 'json'
    })
  }

  currentUserStats(userId: number):Observable<HttpResponse<CurrentUserStats>>{
    return this.http.get<CurrentUserStats>(this.PATH + `/stats/currentUser/${userId}`,{
      observe: 'response',
      responseType: 'json'
    })
  }


}
