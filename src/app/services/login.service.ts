import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  base_Url = "http://localhost:3000/users";

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
    return throwError(
      'Something happened with request, please try again later.'
    );
  }

  postUser(item: any): Observable<User> {
    return this.http
      .post<User>(this.base_Url, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUserList(): Observable<User> {
    return this.http
      .get<User>(this.base_Url)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUser(id: string): Observable<User> {
    return this.http
    .get<User>(this.base_Url + '/' + id).pipe(retry(2),catchError(this.handleError));
  }
}