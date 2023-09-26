import { Component } from '@angular/core';
import { EmployerPost } from 'src/app/models/employer-post';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployerPostService } from 'src/app/services/employer-post.service';
import { WorkerProfileService } from 'src/app/services/worker-profile.service';

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

  editMode:boolean=false;

  toggleEditMode(){
    this.editMode = !this.editMode;
  }
  
  id:any;
  
  constructor(private postService:EmployerPostService, private workerService:WorkerProfileService,private route:ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('Post ID: '+this.id);
    this.getPost();
  }

  getPost(){
    this.postService.getPostById(this.id).subscribe((data)=>{
      next: this.post = data;
      error: console.log('An error has occurred');
    });
  }

  viewProfile(workerId:any){
    this.router.navigate(['/worker/'+ workerId], { queryParams: { postId:this.id } });
  }

  editPost(){
    this.postService.editPost(this.id, this.post).subscribe(
      {
        next: data => {
          console.log('Post updated: '+data);
          this.getPost()
        },
        error: error => {
          console.log('An error has occurred', error);
        }
      }
    );
  }

  deletePost(){
    this.postService.deletePost(this.id).subscribe(
      {
        next: data => {
          console.log('Post deleted: '+data);
          this.router.navigate(['/employer']);
        },
        error: error => {
          console.log('An error has occurred', error);
        }
      }
    );
  }

  deleteWorker(workerId:any){
    this.workerService.deleteWorker(workerId, this.id).subscribe(
      {
        next: data => {
          console.log('Worker profile deleted: '+data);
          this.getPost()
        },
        error: error => {
          console.log('An error has occurred', error);
        }
      }
    );
  }
}
