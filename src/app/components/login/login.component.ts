import { AfterViewInit, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
import { UserRoles } from 'src/app/enums/user-roles.enum';
import { ToastrService } from 'ngx-toastr';
declare var google:any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  hide:boolean= true;
  email = new FormControl('', [Validators.required, Validators.email]);
  emailField=''

  constructor(private loginService:LoginService, private userService:UserService,
    private router:Router, private cookie:CookieService, private toastr:ToastrService) {}

  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: "1011507135159-kl3lu14n4b4p85drsin8mjq6i7d1ro34.apps.googleusercontent.com",
      callback: this.handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("googleLoginButton"),
      { 
        theme: "outline",
        size: "large",
        shape: "pill",
        text: "signin_with",
        logo_alignment: "right", 
      }
    );
  
    google.accounts.id.prompt();
  }

  ngOnInit(): void {
  }

  handleCredentialResponse = (response: any) => {
    console.log("Encoded JWT ID token: " + response.credential);
    const decodedToken: any = jwtDecode(response.credential);
  
    const user: User = {
      id: decodedToken.sub,
      firstName: decodedToken.given_name,
      lastName: decodedToken.family_name,
      email: decodedToken.email,
      profilePic: decodedToken.picture
    };
  
    this.loginService.getUser(user.id).subscribe(
      {
        next: (existingUser: User) => {
          console.log(`User with ID ${existingUser.id} it's already registered, signing in...`);
          this.cookie.set('userId', user.id);
          this.router.navigateByUrl('/profile');
        },
        error: (error: any) => {
          this.loginService.postUser(user).subscribe(
            {
              next: (res: any) => {
                console.log("Usuario creado satisfactoriamente:", res);
                this.cookie.set('userId', user.id);
                this.router.navigateByUrl('/profile');
              },
              error: (postError: any) => {
                console.error("Error creating user:", postError);
              }
            }
          );
        }
      }
    );
    this.router.navigateByUrl('/home');
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a valid email';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  redirectToRegister(){
    this.router.navigateByUrl('/register');
  }

  redirectToAuth(){
    this.router.navigateByUrl('/auth');
  }

  redirectToHome(){
    this.router.navigateByUrl('/home');
  }

  login(){
    if(this.emailField=='empleador@gmail.com'){
      this.userService.setUserRoles([UserRoles.Employer]);
    }
    else if(this.emailField=='chambeador@gmail.com'){
      this.userService.setUserRoles([UserRoles.Worker]);
    }
    else{
      this.toastr.error('Usuario o contraseña incorrectos','Error',
      {progressAnimation: 'decreasing', progressBar: true, timeOut: 3000, closeButton: true, easeTime: 300});
      return;
    }
    this.redirectToHome();
  }
}
