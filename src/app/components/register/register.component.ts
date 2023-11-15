import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/user/login/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formData = new FormGroup({
    'name': new FormControl('', Validators.required),
    'lastName': new FormControl('', Validators.required),
    'birthday': new FormControl('', Validators.required),
    'identificationType': new FormControl('', Validators.required),
    'identificationNumber': new FormControl('', Validators.required),
    'phoneNumber': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required ),
    'gender': new FormControl('', Validators.required), 
    'role': new FormControl('', Validators.required), 
  });


  submitted: boolean = false;
  isRegistering: boolean = false;
  registrationSuccess: boolean = false;
  registrationError: boolean = false;

  constructor( private router:Router, private loginService : LoginService) { 
    if(this.loginService.isUserLogged() == 'logged'){
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit() {
    console.log(this.formData);
    this.isRegistering = true;
  }

  home(){
    this.router.navigateByUrl('/home');
  }
}