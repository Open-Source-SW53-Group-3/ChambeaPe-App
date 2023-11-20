import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/user/login/login.service';
import { UserRegister } from 'src/app/models/register';
import { RegisterService } from 'src/app/services/user/register/register.service';
import { ToastrService } from 'ngx-toastr';

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
    'profilePic': new FormControl('', Validators.required),
    'description': new FormControl('', Validators.required) 
  });

  userRegister: UserRegister = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    birthdate: '',
    gender: '',
    profilePic: '',
    description: '',
    userRole: ''
  };


  submitted: boolean = false;
  isRegistering: boolean = false;
  registrationSuccess: boolean = false;
  registrationError: boolean = false;

  constructor(private toastr:ToastrService, private router:Router, private loginService : LoginService, private registerService:RegisterService) { 
    if(this.loginService.isUserLogged() == 'logged'){
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit() {
    this.userRegister.firstName = this.formData.get('name')?.value;
    this.userRegister.lastName = this.formData.get('lastName')?.value;
    this.userRegister.email = this.formData.get('email')?.value;
    this.userRegister.password = this.formData.get('password')?.value;
    this.userRegister.phoneNumber = this.formData.get('phoneNumber')?.value;
    this.userRegister.birthdate = this.formData.get('birthday')?.value;
    this.userRegister.gender = this.formData.get('gender')?.value;
    this.userRegister.profilePic = this.formData.get('profilePic')?.value;
    this.userRegister.description = this.formData.get('description')?.value;
    this.userRegister.userRole = this.formData.get('role')?.value;
    console.log(this.userRegister);
    this.isRegistering = true;
    this.registerUser();
  }

  registerUser(){
    this.registerService.registerUser(this.userRegister).subscribe(
      {
        next: data => {
          this.router.navigateByUrl('/login');
        },
        error: error => {
          this.toastr.error('Ocurrió un error en el registro, por favor inténtalo de nuevo', 'Error');
          this.registrationSuccess = false;
          this.registrationError = true;
          this.isRegistering = false;
        }
      }
      );
  }

  updateProfilePic(event:any){
    this.userRegister.profilePic = event.target.value;
  }

  home(){
    this.router.navigateByUrl('/home');
  }
}