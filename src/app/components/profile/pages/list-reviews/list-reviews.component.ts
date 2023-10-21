import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';
import { WorkerProfileService } from 'src/app/services/worker-profile.service';

@Component({
  selector: 'app-list-reviews',
  templateUrl: './list-reviews.component.html',
  styleUrls: ['./list-reviews.component.scss']
})
export class ListReviewsComponent {
  id:any;
  postId:any;

   reviews : any;
  isWorker:boolean = true;

  constructor(private route:ActivatedRoute, private workerProfile:WorkerProfileService, private reviewService: ReviewService, private router:Router) {} 
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.postId = params['postId'];
    });

    this.id = this.route.snapshot.paramMap.get('id');

    console.log('Worker ID:'+this.id);
    this.getReviews();
  }

  getReviews(){
    this.reviewService.getReviews(this.id, this.postId).subscribe(
      {
        next: data => {
          this.reviews=data;
          console.log('Worker profile data: '+data);
        },
        error: error => {
          console.log('An error has occurred', error);
        }
      }
    );
  }

  createReview() {
    this.router.navigate(['/worker/'+ this.id+'/post-review'], { queryParams: { postId:this.postId } });
  }

  ratingToInt(reviewRating: string): number {
    return parseInt(reviewRating);
  }
    
}
