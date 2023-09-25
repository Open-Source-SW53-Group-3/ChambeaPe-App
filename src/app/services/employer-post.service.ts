import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { EmployerPost } from '../models/employer-post';

@Injectable({
  providedIn: 'root'
})
export class EmployerPostService {
  base_Url = "https://65110b963ce5d181df5da5df.mockapi.io/api/chambeape/post";

  constructor( private http: HttpClient) { }

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

  createPost(item: any): Observable<EmployerPost> {
    return this.http
      .post<EmployerPost>(this.base_Url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getPostList(): Observable<EmployerPost> {
    return this.http
      .get<EmployerPost>(this.base_Url)
      .pipe(retry(2), catchError(this.handleError));
  }

  getPostById(id: string): Observable<EmployerPost> {
    return this.http
    .get<EmployerPost>(this.base_Url + '/' + id).pipe(retry(2),catchError(this.handleError));
  }
}