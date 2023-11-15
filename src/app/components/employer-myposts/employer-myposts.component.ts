import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/post/post.service';
import { LoginService } from 'src/app/services/user/login/login.service';

@Component({
  selector: 'app-employer-myposts',
  templateUrl: './employer-myposts.component.html',
  styleUrls: ['./employer-myposts.component.scss']
})
export class EmployerMypostsComponent {
  posts:any;
  employerId!:number;

  constructor(private loginService:LoginService,private postService:PostService, private router:Router, private toastr:ToastrService) { 
    var user = this.loginService.getUser();
    this.employerId = user.id;
    console.log("employerId: ");
    console.log(this.employerId);
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.postService.getPostByEmployerId(this.employerId).subscribe(
      {
        next: (data) => {
          this.posts = data;
        },
        error: (error) => {
          console.error('There was an error:', error);
          this.toastr.error('Ocurrió un error al cargar los posts. Por favor, inténtalo de nuevo más tarde');
        },
      }
    );
  }

  viewPost(postId:any){
    this.router.navigateByUrl('/posts/' + postId);
  }

  createPost(){
    this.router.navigateByUrl('/job/post');
  }
}
