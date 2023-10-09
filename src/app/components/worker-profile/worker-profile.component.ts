import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkerProfileService } from 'src/app/services/worker-profile.service';
import { Worker } from 'src/app/models/worker';


@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.scss']
})
export class WorkerProfileComponent {
  id:any;
  postId:any;

  worker!:Worker;
  rating!:number;

  constructor(private route:ActivatedRoute, private workerProfile:WorkerProfileService) {} 
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.postId = params['postId'];
    });

    this.id = this.route.snapshot.paramMap.get('id');
    console.log('Worker ID:'+this.id);
    this.getProfile();
  }

  getProfile(){
    this.workerProfile.getWorkerById(this.id, this.postId).subscribe(
      {
        next: data => {
          this.worker=data;
          console.log('Worker profile data: '+data);
        },
        error: error => {
          console.log('An error has occurred', error);
        }
      }
    );
  }

  ratingToInt(reviewRating: string) {
    this.rating = parseInt(reviewRating);
  }
}
