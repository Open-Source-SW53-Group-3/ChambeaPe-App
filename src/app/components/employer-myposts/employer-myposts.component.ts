import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployerPost } from 'src/app/models/employer-post';
import { EmployerPostService } from 'src/app/services/employer-post.service';

@Component({
  selector: 'app-employer-myposts',
  templateUrl: './employer-myposts.component.html',
  styleUrls: ['./employer-myposts.component.scss']
})
export class EmployerMypostsComponent {
  posts:any=[];

  constructor(private employerPostService:EmployerPostService, private router:Router) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.employerPostService.getPostList().subscribe(
      {
        next: (data) => {
          this.posts = data;
          console.log(this.posts);
        },
        error: (error) => {
          console.error('There was an error:', error);
        },
      }
    );
  }

  viewPost(postId:any){
    this.router.navigateByUrl('/posts/' + postId);
  }
}
