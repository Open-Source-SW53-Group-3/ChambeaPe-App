import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Post } from 'src/app/models/post';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(
        `An error occurred ${error.status}, body was: ${error.error}`
      );
    } else {
      console.log(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError(()=>new Error('Something bad happened; please try again later.'));
  }

  getPostById(postId : number): Observable<Post> {
    return this.http
      .get<Post>(environment.baseUrl + '/posts/'+postId)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllPosts(): Observable<Post> {
    return this.http
      .get<Post>(environment.baseUrl + '/posts')
      .pipe(retry(2), catchError(this.handleError));
  }

  getPostByEmployerId(employerId: number): Observable<Post> {
    return this.http
      .get<Post>(environment.baseUrl + '/employers/'+employerId+'/posts')
      .pipe(retry(2), catchError(this.handleError));
  }

  deletePost(postId:number): Observable<Post> {
    return this.http
      .delete<Post>(environment.baseUrl + '/posts/'+postId)
      .pipe(retry(2), catchError(this.handleError));
  }

  addPost(post: Post, employerId:number): Observable<Post> {
    return this.http
      .post<Post>(environment.baseUrl + '/employers/'+employerId+'/posts', post)
      .pipe(retry(2), catchError(this.handleError));
  }

  updatePost(post: Post, postId:any): Observable<Post> {
    return this.http
      .put<Post>(environment.baseUrl + '/posts/'+postId, post)
      .pipe(retry(2), catchError(this.handleError));
  }
}
