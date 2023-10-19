import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserRoles } from 'src/app/enums/user-roles.enum';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isWorker!:boolean;
  isLoggedIn:boolean = false;

  constructor(private router:Router, private userService:UserService){}

  ngOnInit(): void {
    this.userService.userRolesChanged.subscribe(
      (roles: UserRoles[]) => {
        this.isWorker = roles.includes(UserRoles.Worker);
      }
    );

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;

        this.isLoggedIn = (currentRoute.includes('/login') || currentRoute.includes('/register')) ? false : true;
      }
    });
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
