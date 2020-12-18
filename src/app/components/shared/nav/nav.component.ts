import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  isLogged: boolean;

  constructor(private userService: UserService, private router: Router) {
    userService.isLogged().subscribe(value => {
      this.isLogged = value;
    })
   }

  ngOnInit(): void {
    // this._mobileObserverService.currentMobile.subscribe(mobile => {
    //   if(mobile == null || mobile.length < 11){
    //     this.isLogged = false;
    //   }
    //   else{
    //     this.isLogged = true;
    //   }
    // });
  }

  logout(){
    this.userService.logout();
    this.router.navigateByUrl('/user/login');
  }




}
