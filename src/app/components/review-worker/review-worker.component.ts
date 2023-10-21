import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/models/review';

@Component({
  selector: 'app-review-worker',
  templateUrl: './review-worker.component.html',
  styleUrls: ['./review-worker.component.scss'],
})
export class ReviewWorkerComponent {
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private reviewService: ReviewService,
    private route: ActivatedRoute
  ) {}

  newReview = {} as Review;
  postId: any;
  id: any;
  employerName = 'Juanito DiCaprio';
  employerPhoto ='https://e.rpp-noticias.io/xlarge/2022/09/14/581958_1314838.jpg';

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.postId = params['postId'];
    });

    this.id = this.route.snapshot.paramMap.get('id');

    console.log('Worker ID:' + this.id);
  }

  rateScore = 0;

  descriptionFormControl = new FormControl('', [
    Validators.required,
    (control: AbstractControl) => {
      if (control.value === null) {
        return { nullDescription: true };
      }
      return null;
    }
  ]);

  validarReview() {
    if (this.descriptionFormControl.valid) {
      console.log('Score' + this.rateScore);
      if (this.rateScore > 0 && this.descriptionFormControl.value != null) {
        this.createNewReview( this.descriptionFormControl.value, String(this.rateScore), this.employerName, this.employerPhoto);
        this.reviewService
          .addReview(this.newReview, this.id, this.postId)
          .subscribe((data: any) => {
            console.log(data);
            this.router.navigate(['/worker/' + this.id + '/reviews'], {
              queryParams: { postId: this.postId },
            });
          });
      } else {
        this.descriptionFormControl.setErrors({ ratingMismatch: true });
      }
    } else {
      console.log('No valido');
      this.descriptionFormControl.setErrors({ nullDescription: true });
    }
  }

  createNewReview( description : string, rating : string, employerName : string, employerPhoto : string) {
    this.newReview.description = description;
    this.newReview.rating = rating;
    this.newReview.employerName = employerName;
    this.newReview.employerPhoto = employerPhoto;
  }
}
