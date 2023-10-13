import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EmployerPostComponent } from './components/employer-post/employer-post.component';
import { RegisterComponent } from './components/register/register.component';
import { JobPostComponent } from './components/job-post/job-post.component';
import { WorkerProfileComponent } from './components/worker-profile/worker-profile.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { EmployerMypostsComponent } from './components/employer-myposts/employer-myposts.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {path:'posts', component: EmployerMypostsComponent},
  { path: 'posts/:id', component: EmployerPostComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'auth', component: AuthComponent},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'job/post', component: JobPostComponent },
  { path: 'worker', redirectTo: '/worker/1', pathMatch: 'full'},
  { path: 'worker/:id', component: WorkerProfileComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'}  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }