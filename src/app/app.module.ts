import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { EmployerPostComponent } from './components/employer-post/employer-post.component'
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { JobPostComponent } from './components/job-post/job-post.component';
import { WorkerProfileComponent } from './components/worker-profile/worker-profile.component';

import { AuthComponent } from './components/auth/auth.component';

import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { EmployerMypostsComponent } from './components/employer-myposts/employer-myposts.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    EmployerPostComponent,
    RegisterComponent,
    JobPostComponent,
    WorkerProfileComponent,
    AuthComponent,
    EmployerMypostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}