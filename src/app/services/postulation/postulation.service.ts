import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Postulation } from 'src/app/models/postulation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostulationService {
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

  getAllWorkersByPost(postId : number): Observable<Postulation> {
    return this.http
      .get<Postulation>(environment.baseUrl + '/posts/'+postId+'/postulations')
      .pipe(retry(2), catchError(this.handleError));
  }

  //postular a trabajo
  createPostulation(postId : number, workerId:number): Observable<Postulation> {
    return this.http
      .post<Postulation>(environment.baseUrl + '/posts/'+postId+'/postulations/'+ workerId, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
