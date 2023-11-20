import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRegister } from 'src/app/models/register';

@Injectable({
    providedIn: 'root'
  })
  export class RegisterService {
  
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
   
    registerUser(userRegister: UserRegister): Observable<UserRegister> {
        return this.http
          .post<UserRegister>(environment.baseUrl + '/users', userRegister)
          .pipe(retry(2), catchError(this.handleError));
    }
  }