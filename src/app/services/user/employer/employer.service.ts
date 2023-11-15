import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Employer } from 'src/app/models/user/employer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

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


  getAllEmployers(): Observable<Employer> {
    return this.http
      .get<Employer>(environment.baseUrl + '/employers')
      .pipe(retry(2), catchError(this.handleError));
  }

  getEmployerById(employerId: number): Observable<Employer> {
    return this.http
      .get<Employer>(environment.baseUrl + '/employers/'+employerId)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateEmployer(employerId: Employer): Observable<Employer> {
    return this.http
      .put<Employer>(environment.baseUrl + '/employers/'+employerId.id, employerId)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteEmployer(employerId:any): Observable<Employer> {
    return this.http
      .delete<Employer>(environment.baseUrl + '/employers/'+employerId)
      .pipe(retry(2), catchError(this.handleError));
  }
}
