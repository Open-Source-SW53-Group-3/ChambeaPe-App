import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';
import { WorkerProfileService } from 'src/app/services/worker-profile.service';
import { Review } from '../../../../models/review';
import { EmployerService } from 'src/app/services/user/employer/employer.service';

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

  constructor(private employerService: EmployerService,  private route:ActivatedRoute, private workerProfile:WorkerProfileService, private reviewService: ReviewService, private router:Router) {} 
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.postId = params['postId'];
    });

    this.id = this.route.snapshot.paramMap.get('id');

    console.log('Worker ID:'+this.id);
    this.getReviews();
  }

  getReviews(){
    this.reviewService.getReviewsByWorkerId(this.id).subscribe(
      (reviews: any) => {
        this.reviews = reviews;
        console.log(this.reviews);
        //cambiar employer name por cada review
        for (let i = 0; i < this.reviews.length; i++) {
          this.employerService.getEmployerById(this.reviews[i].sentById).subscribe(
            (employer: any) => {
              console.log(employer);
              this.reviews[i].employerName = employer.firstName + " " + employer.lastName;
              this.reviews[i].employerPhoto = employer.profilePic;
              console.log(this.reviews[i].employerName);
            }
          );
        }

        console.log(this.reviews);
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
