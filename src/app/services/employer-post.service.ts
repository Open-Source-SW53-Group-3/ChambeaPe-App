import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { EmployerPost } from '../models/employer-post';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmployerPostService {

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

  createPost(item: any, employerId: number): Observable<EmployerPost> {
    return this.http
      .post<EmployerPost>(environment.baseUrl+'/employers/'+employerId+'/posts', item, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getPostList(): Observable<EmployerPost[]> {
    return this.http
      .get<EmployerPost[]>(environment.baseUrl+'/post')
      .pipe(retry(2), catchError(this.handleError));
  }

  getPostById(id: string): Observable<EmployerPost> {
    return this.http
    .get<EmployerPost>(environment.baseUrl+'/post' + '/' + id).pipe(retry(2),catchError(this.handleError));
  }

  getPostsByEmployerId(id: string): Observable<EmployerPost> {
    return this.http
    .get<EmployerPost>(environment.baseUrl+'/post' + '?employerId=' + id).pipe(retry(2),catchError(this.handleError));
  }

  editPost(id: string, item: any): Observable<EmployerPost> {
    return this.http
      .put<EmployerPost>(environment.baseUrl+'/posts' + '/' + id, item, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deletePost(id: any): Observable<any> {
    return this.http
      .delete(environment.baseUrl + '/posts/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(error => {
          return throwError(error);
        }),
        map((response: any) => {
          return response;
        })
      );
  }
  
}