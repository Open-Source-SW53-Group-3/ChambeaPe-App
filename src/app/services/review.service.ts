import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  
  getReviews(workerId: any): Observable<Review> {
    return this.http.get<Review>(environment.baseUrl + '/workers/' + workerId + '/reviews')
      .pipe(
        retry(1),
        catchError(error => {
          console.error('Error getting reviews:', error);
          throw error;
        })
    );
  }



  //get all reviews for a worker
  getReviewsByWorkerId(workerId: any): Observable<Review> {
    return this.http.get<Review>(environment.baseUrl + '/workers/' + workerId + '/reviews')
      .pipe(
        retry(1),
        catchError(error => {
          console.error('Error getting review by id:', error);
          throw error;
        })
    );
  }

  getReviewById(id: any, workerId: any, postId: any): Observable<Review> {
    return this.http.get<Review>(environment.baseUrl + '/post/' + postId + '/workers/' + workerId + '/reviews/' + id)
      .pipe(
        retry(1),
        catchError(error => {
          console.error('Error getting review by id:', error);
          throw error;
        })
    );
  }
  
  addReview(review: any, workerId:any, postId:any): Observable<Review> {
    return this.http
      .post<Review>(environment.baseUrl + '/post/' + postId + '/workers/'+workerId+'/reviews', review)
  }

  editReview(id:any, review: Review, workerId:any, postId:any): Observable<Review> {
    return this.http
      .put<Review>(environment.baseUrl + '/post/' + postId + '/workers/'+workerId+'/reviews/'+id, review)
  }

  deleteReview(reviewId: any, workerId: any, postId: any): Observable<Review> {
    return this.http.delete<Review>(environment.baseUrl + '/post/' + postId + '/workers/' + workerId + '/reviews/' + reviewId)
      .pipe(
        catchError(error => {
          console.error('Error deleting review:', error);
          throw error;
        })
      );
  }
}
