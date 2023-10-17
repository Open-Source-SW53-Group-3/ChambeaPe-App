import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployerPost } from 'src/app/models/employer-post';
import { EmployerPostService } from 'src/app/services/employer-post.service';

@Component({
  selector: 'app-employer-myposts',
  templateUrl: './employer-myposts.component.html',
  styleUrls: ['./employer-myposts.component.scss']
})
export class EmployerMypostsComponent {
  posts:any=[];
  employerId:string = '1';

  constructor(private employerPostService:EmployerPostService, private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.employerPostService.getPostsByEmployerId(this.employerId).subscribe(
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
}
