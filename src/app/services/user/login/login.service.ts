import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { Login } from 'src/app/models/login';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient, private cookieService: CookieService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  user: any;

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

  loginUser(item: Login) {
    return this.http
      .post<Login>(environment.baseUrl+'/users/login', JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  loadUser(user : any){
    this.user = user;
    let loginAccept = "logged";
    this.cookieService.set('user', JSON.stringify(user));
    this.cookieService.set('login', JSON.stringify(loginAccept));

    console.log("user Cookiee: ");
    console.log(this.cookieService.get('user'));
  }
}
