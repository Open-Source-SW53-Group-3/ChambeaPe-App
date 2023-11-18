import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployerPostService } from 'src/app/services/employer-post.service';
import { Post } from 'src/app/models/post';
import { LoginService } from 'src/app/services/user/login/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss']
})
export class JobPostComponent {

  post!: Post;
  employerId!:number;
  formData = new FormGroup({
    'title': new FormControl('', Validators.required),
    'description': new FormControl('', Validators.required),
    'subtitle': new FormControl('', Validators.required),
    'imgUrl': new FormControl('', Validators.required),
  });


  

  constructor( private loginService:LoginService, private toastr: ToastrService, private fb: FormBuilder,
    private router:Router, private employerPostService: EmployerPostService) {
    var user = this.loginService.getUser();
    this.employerId = user.id;
    this.post = {} as Post;

  }
  onSubmit() {
    console.log(this.formData);

  }

  createPost(){
    this.post = { ...this.formData.value } as Post;
    this.employerPostService.createPost(this.post, this.employerId).subscribe(
      {
        next: (data) => {
          this.toastr.success('Post creado con éxito');
          this.router.navigateByUrl('/jobs');
        },
        error: (error) => {
          console.error('There was an error:', error);
          this.toastr.error('Ocurrió un error al crear el post. Por favor, inténtalo de nuevo más tarde');
        },
      }
    );
  }

}
