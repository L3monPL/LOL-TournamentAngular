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
  user?: MatchUser
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
    return this.http.get<Array<Match>>(this.PATH + '/match/end/list',{
      observe: 'response',
      responseType: 'json'
    })
  }

  matchListInProgress():Observable<HttpResponse<Array<Match>>>{
    return this.http.get<Array<Match>>(this.PATH + '/match/edit/currentMatch',{
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

  createMatch(creator_user_id: number):Observable<HttpResponse<any>>{
    return this.http.post<any>(this.PATH + `/match/create`,{
      creator_user_id: creator_user_id
    },{
      observe: 'response',
      responseType: 'json'
    })
  }

  setUsersToMatch(matchId: number, users_1: Array<number>, users_2: Array<number>):Observable<HttpResponse<any>>{
    return this.http.post<any>(this.PATH + `/teamUser/setUsers/6/${matchId}`,{
      team_1: {
        users: users_1
      },
      team_2: {
        users: users_2
      }
    },{
      observe: 'response',
      responseType: 'json'
    })
  }

  championsList():Observable<HttpResponse<Array<Champion>>>{
    return this.http.get<Array<Champion>>(this.PATH + '/champion',{
      observe: 'response',
      responseType: 'json'
    })
  }

  postChampionToUsers(matchId: number, champions_1: Array<number>, champions_2: Array<number>):Observable<HttpResponse<any>>{
    return this.http.post<any>(this.PATH + `/champion/updateChampionsToTeams/${matchId}`,{
      team_1: {
        champions: champions_1
      },
      team_2: {
        champions: champions_2
      }
    },{
      observe: 'response',
      responseType: 'json'
    })
  }  

  putMatchResult(matchId: number, result: string):Observable<HttpResponse<any>>{
    return this.http.put<any>(this.PATH + `/match/result/${matchId}`,{
      result: result
    },{
      observe: 'response',
      responseType: 'json'
    })
  }
}
