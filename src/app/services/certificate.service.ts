import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Certificate } from '../models/certificate';
@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http: HttpClient) { }
  getCertificateById(id: any, workerId: any, postId: any): Observable<Certificate> {
    return this.http.get<Certificate>(environment.baseUrl + '/post/' + postId + '/workers/' + workerId + '/certificate/' + id)
      .pipe(
        retry(1),
        catchError(error => {
          console.error('Error getting certificate by id:', error);
          throw error;
        })
    );
  }
  
  addCertificate(certificate: any, workerId:any, postId:any): Observable<Certificate> {
    return this.http
      .post<Certificate>(environment.baseUrl + '/post/' + postId + '/workers/'+workerId+'/certificate', certificate)
  }

  editCertificate(id:any, certificate: Certificate, workerId:any, postId:any): Observable<Certificate> {
    return this.http
      .put<Certificate>(environment.baseUrl + '/post/' + postId + '/workers/'+workerId+'/certificate/'+id, certificate)
  }

  deleteCertificate(certificateId: any, workerId: any, postId: any): Observable<Certificate> {
    return this.http.delete<Certificate>(environment.baseUrl + '/post/' + postId + '/workers/' + workerId + '/certificate/' + certificateId)
      .pipe(
        catchError(error => {
          console.error('Error deleting certificate:', error);
          throw error;
        })
      );
  }
  
  
}
