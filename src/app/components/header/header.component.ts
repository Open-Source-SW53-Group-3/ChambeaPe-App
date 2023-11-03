import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/user/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userRol:any;
  isLoggedIn: string = 'unlogged';

  constructor(private router:Router, private loginService:LoginService, private cookieService:CookieService, private userService:UserService){
    this.isLoggedIn = this.cookieService.get('login');
    this.isLoggedIn = 'unlogged';
    console.log("isLoggedIn:Gaaaaaa ");
    console.log(this.isLoggedIn);
  }

  ngOnInit(): void {
    /*
    this.userService.userRolesChanged.subscribe(
      (roles: UserRoles[]) => {
        this.isWorker = roles.includes(UserRoles.Worker);
      }
    );
    */

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        if(!(currentRoute.includes('/login') || currentRoute.includes('/register'))){
          this.userRol = this.loginService.user.userRole;//validar con cookie
        }
      }
    });

    //console.log("isLoggedInTwo: ");
    //console.log(this.coockieService.get('login'));
    console.log(this.isLoggedIn);
  }

  home(){
    this.router.navigateByUrl('/home');
  };
  login(){
    this.router.navigateByUrl('/login');
  };
  mypost(){
    this.router.navigateByUrl('/posts');
  }
  redirectToJobs(){
    this.router.navigateByUrl('/jobs');
  }
  redirectToRegister(){
    this.router.navigateByUrl('/register');
  }
}
