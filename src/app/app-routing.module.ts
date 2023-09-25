import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EmployerPostComponent } from './components/employer-post/employer-post.component';
import { RegisterComponent } from './components/register/register.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'post/:id', component: EmployerPostComponent },
  { path: 'register', component: RegisterComponent },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }