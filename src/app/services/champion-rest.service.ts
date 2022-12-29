import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Champion{
  id: number,
  name: number,
  image: number,
  created_at: string,
}

export interface ChampionPicked{
  team_1: Array<ChampionPickedTeam>,
  team_2: Array<ChampionPickedTeam>,
}

export interface ChampionPickedTeam{
  id: number,
  name: string,
  image: string,
  created_at: string
}

@Injectable({
  providedIn: 'root'
})
export class ChampionRestService {

  // private PATH = 'https://expressjslol.onrender.com/api'
  private PATH = 'http://localhost:3030/api'

  constructor(
    private http: HttpClient
  ) { }

  championsList():Observable<HttpResponse<Array<Champion>>>{
    return this.http.get<Array<Champion>>(this.PATH + '/champion',{
      observe: 'response',
      responseType: 'json'
    })
  }

  championsPickedList(lastMatches: number):Observable<HttpResponse<Array<ChampionPicked>>>{
    return this.http.get<Array<ChampionPicked>>(this.PATH + `/champion/pickedList/${lastMatches}`,{
      observe: 'response',
      responseType: 'json'
    })
  }
}
