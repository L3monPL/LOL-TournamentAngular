import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Match{
  id: number,
  team_1?: Team,
  team_2?: Team,
  result?: string,
  status: string,
  creator_user_id: number,
  created_at: string
}

export interface Team{
  id: number,
  name: string,
  users?: Array<MatchUsers>,
  created_at: string
}

export interface MatchUsers{
  id: number,
  champion: Champion,
  team_id: number,
  created_at: string,
  user?: Array<MatchUser>
}

export interface MatchUser{
  id: number,
  username: number,
  email: number,
  created_at: string,
}

export interface Champion{
  id: number,
  name: number,
  image: number,
  created_at: string,
}

@Injectable({
  providedIn: 'root'
})
export class MatchRestService {

  // private PATH = 'https://expressjslol.onrender.com/api'
  private PATH = 'http://localhost:3030/api'

  constructor(
    private http: HttpClient
  ) { }

  matchList():Observable<HttpResponse<Array<Match>>>{
    return this.http.get<Array<Match>>(this.PATH + '/match',{
      observe: 'response',
      responseType: 'json'
    })
  }

  addTeamToMatch(matchId: number):Observable<HttpResponse<any>>{
    return this.http.post<any>(this.PATH + `/team/create/${matchId}`,{
      observe: 'response',
      responseType: 'json'
    })
  }
}
