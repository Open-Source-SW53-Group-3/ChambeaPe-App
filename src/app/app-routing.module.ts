import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**',  redirectTo: '/home', pathMatch: 'full'},
  //TO-DO:
  // {path: 'home', component: HomeComponent},    //Home page
  // {path:'worker', component: WorkerComponent}, //Workers
  // {path: 'job', component: JobComponent},      //Jobs given by employers
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
