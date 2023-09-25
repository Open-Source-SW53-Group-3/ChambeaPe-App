import { Component } from '@angular/core';
import { EmployerPost } from 'src/app/models/employer-post';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { EmployerPostService } from 'src/app/services/employer-post.service';

@Component({
  selector: 'app-employer-post',
  templateUrl: './employer-post.component.html',
  styleUrls: ['./employer-post.component.scss']
})
export class EmployerPostComponent {
  post:EmployerPost={
    "postTitle":'',
    "postDescription": '',
    "postSubtitle": '',
    "postImgUrl": '',
    "id": '',
    "workers": [
      {
        "image": '',
        "status": '',
        "name": '',
        "description": '',
        "id": '',
        "postId": ''
      }
    ]
  };
  
  id:any;
  
  constructor(private postService:EmployerPostService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getPost();
  }

  getPost(){
    this.postService.getPostById(this.id).subscribe((data)=>{
      next: this.post = data;
      error: console.log('An error has occurred');
    });
  }
}
