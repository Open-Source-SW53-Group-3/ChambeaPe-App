import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  /*Stepper*/
  @ViewChild('stepper') stepper!: MatStepper;

  previousStep() {
    this.stepper.previous();
  }
  //////

  email = 'juansito@gmail.com';

  constructor(private _formBuilder: FormBuilder, private router:Router) {
    this.emailFormControl.valueChanges.subscribe((newValue) => {
      // Actualizar la variable email cuando se produzcan cambios
      this.email = this.emailFormControl.value ?? 'juansito@gmail.com';
    });
  }

  /*Forgot-password*/
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);


  codeFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d{6}$/),
  ]);

  stepEmailCompleted = false;
  validarStep_One() {
    // Realiza aquí tu lógica de validación, por ejemplo:
    if (this.emailFormControl.valid) {
      //Avanzar al siguiente paso solo si el campo de correo electrónico es válido
      this.stepEmailCompleted = true;
      setTimeout(() => {
        this.stepper.next();
      }, 100); // Wait for 0.1 second (100 milliseconds) before executing the next line of code
    }
  }


  /*Verification-code*/

  showEmail() {
    let firstElement = this.email.split('@')[0];
    let rest = this.email.split('@')[1];
    let characters = firstElement.split('');

    for (let i = 1; i < firstElement.length; i++) {
      characters[i] = '*';
    }

    firstElement = characters.join('');

    let email = firstElement + '@' + rest;
    return email;
  }

  stepCodeCompleted = false;

  validarStep_Two() {
    // Realiza aquí tu lógica de validación, por ejemplo:
    if (this.codeFormControl.valid) {
      //Avanzar al siguiente paso solo si el campo de correo electrónico es válido
      this.stepCodeCompleted = true;
      setTimeout(() => {
        this.stepper.next();
      }, 100);
    }
  }

  /*Change-password*/

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
  ]);
  passwordConfirmationFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
  ]);

  hide = true;
  task = { name: 'Primary', completed: false, color: 'primary' };

  stepPasswordCompleted = false;

  validarStep_Three() {
    if (
      this.passwordFormControl.valid &&
      this.passwordConfirmationFormControl.valid
    ) {
      const password = this.passwordFormControl.value;
      const confirmPassword = this.passwordConfirmationFormControl.value;

      if (password === confirmPassword) {
        this.stepPasswordCompleted = true;
        setTimeout(() => {
          this.stepper.next();
        }, 100);
      } else {
        this.passwordConfirmationFormControl.setErrors({
          passwordMismatch: true,
        });
      }
    }
  }

  home(){
    this.router.navigateByUrl('/home');
  }
}
