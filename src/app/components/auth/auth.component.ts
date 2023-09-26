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



  
}
