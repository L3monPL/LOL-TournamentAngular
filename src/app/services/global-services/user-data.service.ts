import { Injectable } from '@angular/core';
import { User } from '../user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  public user?: User

  constructor() { }

  setUser(user: User){
    this.user = user;
  }

  getName():string|undefined{
    return this.user?.username;
  }
  getId(): number{
    return this.user!.id
  }

  getEmail(): string{
    return this.user!.email
  }

}
