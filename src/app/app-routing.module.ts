import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EmployerPostComponent } from './components/employer-post/employer-post.component';
import { RegisterComponent } from './components/register/register.component';
import { JobPostComponent } from './components/job-post/job-post.component';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  { path: 'post/:id', component: EmployerPostComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'auth', component: AuthComponent},
  { path: 'login', component: LoginComponent },
  { path: 'job/post', component: JobPostComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  
  // { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }