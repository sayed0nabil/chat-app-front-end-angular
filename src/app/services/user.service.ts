import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { User } from '../models/User.model';

import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  logout() {
    localStorage.removeItem('jwt');
    this.changeLogged(false);
  }

  private logged = new BehaviorSubject<boolean>(localStorage.getItem('jwt') ? true: false);

  register(user: User) {
    return this.apiService.post('/users/register', user);
  }

  constructor(private apiService: ApiService) { }

  login(user: User){
    return this.apiService.post('/users/login', user);
  }

  getAllUsers(){
    return this.apiService.get("/users");
  }

  getAllUsersExceptLoggedUser(){
    return this.apiService.get("/users/not-logged-user");
  }

  getLoggedUsername(){
    const body: any = jwt_decode(localStorage.getItem("jwt"));
    return body.sub;
  }

  public isLogged():Observable<boolean>{
    return this.logged.asObservable();
  }

  public changeLogged(newValue: boolean){
    this.logged.next(newValue);
  }

}
