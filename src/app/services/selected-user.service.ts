import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class SelectedUserService {

  private messageSource = new Subject<User>();

  constructor() { }

  public getSelectedUser(): Observable<User> {
    return this.messageSource.asObservable();
  }

  public setSelectedUser(selectedUser: User) {
    return this.messageSource.next(selectedUser);
  }
}
