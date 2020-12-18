import { Component, OnInit } from '@angular/core';
import { Config } from 'protractor';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';
import { SelectedUserService } from 'src/app/services/selected-user.service';
import { RoomingWebSocketAPI } from 'src/app/RoomingWebSocketAPI';

@Component({
  selector: 'app-users-aside-bar',
  templateUrl: './users-aside-bar.component.html',
  styleUrls: ['./users-aside-bar.component.css']
})
export class UsersAsideBarComponent implements OnInit {

  users: User[];


  webSocketAPI: RoomingWebSocketAPI;

  
  constructor(
     private userService: UserService,
     private selectedUserService: SelectedUserService
     ) { }

  ngOnInit(): void {
    this.userService.getAllUsersExceptLoggedUser().subscribe((result: Config) => {
      this.users = result.body;
    }, err => {
      console.log(err);
    })

    this.connectAndListenToUsers();
  }

  connectAndListenToUsers(){
    this.webSocketAPI = new RoomingWebSocketAPI();
    this.webSocketAPI._connectAndListenToActiveUsers();
    const _this = this;
    this.webSocketAPI.userSource.subscribe((newUser: User) => {
      console.log(newUser);
      if(newUser){
        _this.users.push(newUser);
      } 
    })
  }


  selectUser(selectedUser: User){
    this.selectedUserService.setSelectedUser(selectedUser);
  }

}
