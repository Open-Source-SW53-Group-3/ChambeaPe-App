import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Worker } from '../models/worker-entity';

@Injectable({
  providedIn: 'root'
})
export class WorkerProfileService {

  constructor(private http: HttpClient) { }

  getAllPostWorkers(postId:any): Observable<Worker> {
    return this.http
      .get<Worker>(environment.baseUrl + '/post/' + postId + '/workers/')
  }

  getWorkerById(workerId: number, postId:any): Observable<Worker> {
    return this.http
      .get<Worker>(environment.baseUrl + '/post/' + postId + '/workers/'+workerId)
  }

  addWorker(worker: Worker, postId:any): Observable<Worker> {
    return this.http
      .post<Worker>(environment.baseUrl + '/post/' + postId + '/workers/', worker)
  }

  updateWorker(worker: Worker): Observable<Worker> {
    return this.http
      .put<Worker>(environment.baseUrl + '/post/' + worker.postId + '/workers/'+worker.id, worker)
  }

  deleteWorker(workerId:any, postId:any): Observable<Worker> {
    return this.http
      .delete<Worker>(environment.baseUrl + '/post/' + postId + '/workers/'+workerId)
  }
}
