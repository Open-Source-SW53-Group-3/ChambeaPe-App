import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
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

  postUser(item: any): Observable<User> {
    return this.http
      .post<User>(environment.baseUrl+'/user', JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUserList(): Observable<User> {
    return this.http
      .get<User>(environment.baseUrl+'/user')
      .pipe(retry(2), catchError(this.handleError));
  }

  getUser(id: string): Observable<User> {
    return this.http
    .get<User>(environment.baseUrl+'/user' + '/' + id).pipe(retry(2),catchError(this.handleError));
  }
}