import { Component, ViewChild  } from '@angular/core';

import { MatStepper } from '@angular/material/stepper';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
 /*Stepper*/
 @ViewChild('stepper') stepper!: MatStepper;

 previousStep() {
   this.stepper.previous();
 }
 //////

 isLinear = false;
 email = "juansito@gmail.com";

 constructor(private _formBuilder: FormBuilder) {
   this.emailFormControl.valueChanges.subscribe((newValue) => {
     // Actualizar la variable email cuando se produzcan cambios
     this.email = this.emailFormControl.value ?? 'juansito@gmail.com';
   });
 }

  /*Forgot-password*/
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  codeFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d{6}$/), 
  ]);
  //////////////////////////
  validarStep_One() {
    // Realiza aquí tu lógica de validación, por ejemplo:
    if (this.emailFormControl.valid) {
      //Avanzar al siguiente paso solo si el campo de correo electrónico es válido
      this.stepper.next();
    }
  }

 /*Verification-code*/
  
 showEmail(){
  let firstElement = this.email.split("@")[0];
  let rest = this.email.split("@")[1];
  let characters = firstElement.split(""); 

  for(let i = 1; i < firstElement.length; i++){
    characters[i] = "*";
  }

  firstElement = characters.join(""); 

  let email= firstElement + "@" + rest;
  return email;
}

  validarStep_Two() {
    // Realiza aquí tu lógica de validación, por ejemplo:
    if (this.codeFormControl.valid) {
      //Avanzar al siguiente paso solo si el campo de correo electrónico es válido
      this.stepper.next();
    }
  }




}
