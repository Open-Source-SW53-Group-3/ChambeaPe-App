import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MatSelectModule} from '@angular/material/select';

import {MatStepperModule} from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import {FormBuilder, Validators, FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    FormsModule,
    NgIf,
  ]
})
export class MaterialModule { }
