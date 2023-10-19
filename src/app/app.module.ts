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
import { HomeComponent } from './components/home/home.component';
import { EmployerMypostsComponent } from './components/employer-myposts/employer-myposts.component';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthComponent } from './components/auth/auth.component';

import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ChatComponent } from './components/chat/chat.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { ListCertificatesComponent } from './components/profile/pages/list-certificates/list-certificates.component';
import { AddEditCertificateComponent } from './components/profile/components/add-edit-certificate/add-edit-certificate.component';
import { CertificateDialogComponent } from './components/profile/components/certificate-dialog/certificate-dialog.component';
import { SettingComponent } from './components/settings/pages/setting/setting.component';
import { AppearanceComponent } from './components/settings/pages/appearance/appearance.component';

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
    HomeComponent,
    EmployerMypostsComponent,
    ChatComponent,
    JobsComponent,
    ListCertificatesComponent,
    AddEditCertificateComponent,
    CertificateDialogComponent,
    SettingComponent,
    AppearanceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgbModule
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