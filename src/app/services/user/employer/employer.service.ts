import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Worker } from 'src/app/models/user/worker';
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


  getAllWorkers(): Observable<Worker> {
    return this.http
      .get<Worker>(environment.baseUrl + '/employers')
      .pipe(retry(2), catchError(this.handleError));
  }

  getWorkerById(workerId: number): Observable<Worker> {
    return this.http
      .get<Worker>(environment.baseUrl + '/employers/'+workerId)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateWorker(worker: Worker): Observable<Worker> {
    return this.http
      .put<Worker>(environment.baseUrl + '/employers/'+worker.id, worker)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteWorker(workerId:any): Observable<Worker> {
    return this.http
      .delete<Worker>(environment.baseUrl + '/employers/'+workerId)
      .pipe(retry(2), catchError(this.handleError));
  }
}
