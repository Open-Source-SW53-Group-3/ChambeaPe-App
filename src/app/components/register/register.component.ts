import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formData: any = {
    name: "",
    lastName: "",
    birthday: null,
    identificationType: "",
    identificationNumber: null,
    phoneNumber: "",
    email: "",
    password: "",
    gender: "", 
    role: "",  
  };

  submitted: boolean = false;
  isRegistering: boolean = false;
  registrationSuccess: boolean = false;
  registrationError: boolean = false;

  constructor() {}

  onSubmit() {
    console.log(this.formData);
    this.isRegistering = true;
  }
}