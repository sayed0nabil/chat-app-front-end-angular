import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { User } from '../../../models/User.model';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User('','');

  errorMessage: string;

  constructor(private userServive: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.user);
    this.userServive.login(this.user).subscribe((result: any) => {
      localStorage.setItem('jwt', result.token);
      this.userServive.changeLogged(true);
      this.router.navigateByUrl("/message-chat-box");
    }, (errorResponse) => {
      if(errorResponse.error && errorResponse.error.errorMessage){
        this.errorMessage = errorResponse.error.errorMessage;
      }
      else 
        this.errorMessage = errorResponse;
  });

}
}
