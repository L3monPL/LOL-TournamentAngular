import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User{
  id: number,
  username: string,
  email: string,
  created_at: string,
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
      responseType: 'json'
    })
  }




  userList():Observable<HttpResponse<Array<User>>>{
    return this.http.get<Array<User>>(this.PATH + '/user',{
      observe: 'response',
      responseType: 'json'
    })
  }


}
