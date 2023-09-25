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

    setTimeout(() => {
      const registrationSuccessful = true; // Cambiar esto para simular registro exitoso o fallido

      // Registro exitoso
      if (registrationSuccessful) {
        this.isRegistering = false;
        this.registrationSuccess = true;
        this.registrationError = false;
        
        this.formData = {
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
      } else {
        // Error en el registro
        this.isRegistering = false;
        this.registrationSuccess = false;
        this.registrationError = true;
      }
    }, 2000); 
  }
}