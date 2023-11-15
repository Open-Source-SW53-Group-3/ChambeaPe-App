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
  user:any;
  userRol:any;
  isLoggedIn: string;

  constructor(private router:Router, private loginService:LoginService, private userService:UserService, private cookieService:CookieService){
    console.log("Primera "+this.loginService.isUserLogged());

    if(this.loginService.isUserLogged() == 'unlogged'){
      this.router.navigateByUrl('/login');
    }

    console.log("hola "+this.loginService.isUserLogged());
    this.isLoggedIn = this.loginService.isUserLogged();

    //When you refresh the page, the user is reload if it is logged
    if(this.isLoggedIn == 'logged'){
      this.user = this.loginService.getUser();
      this.userRol = this.user.userRole;
    }
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
        this.isLoggedIn = this.loginService.isUserLogged();

        if(!(currentRoute.includes('/login') || currentRoute.includes('/register'))){
          this.user = this.loginService.getUser();
          this.userRol = this.user.userRole;
          
          //Test
          console.log("Estoy en el if");
          console.log(this.user);  
          console.log(this.userRol);
          console.log(this.loginService.isUserLogged());
        }
        else{
          console.log("Estoy en el else");
          console.log(this.loginService.user);
          console.log(this.loginService.isUserLogged());
          //this.isLoggedIn= "unlogged";
        }
      }
    });
  }


  home(){
    this.router.navigateByUrl('/home');
  };
  login(){
    this.loginService.userUnlogged();
    this.router.navigateByUrl('/login');
    //200 ms delay
    /*setTimeout(() => {
      window.location.reload();
    }, 50);*/
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
  redirectToMyChats(){
    this.router.navigateByUrl('/chat');
  }
  logOut(){
    this.loginService.userUnlogged();
    this.router.navigateByUrl('/login');
  }

  viewProfile(){
    this.router.navigate(['/profile/'+ this.user.id]);
  }
}