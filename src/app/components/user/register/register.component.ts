import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User('','');

  errorMessage: string;

  constructor(private userServive: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  register(){
    this.userServive.register(this.user).subscribe(result => {
      this.router.navigateByUrl("/user/login");
    }, (errorResponse) => {
      if(errorResponse.error && errorResponse.error.errorMessage){
        this.errorMessage = errorResponse.error.errorMessage;
      }
      else {
        this.errorMessage = errorResponse;
      }
        
    })
  }


}
