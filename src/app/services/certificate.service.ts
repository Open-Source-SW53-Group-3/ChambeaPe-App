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

  getFirstCertificate(workerId: any): Observable<Certificate> {
    return this.http.get<Certificate>(environment.baseUrl + '/workers/' + workerId + '/certificates')
      .pipe(
        retry(1),
        catchError(error => {
          console.error('Error getting first certificate:', error);
          throw error;
        })
    );
  }

  getCertificateById(certificateId: any, workerId: any): Observable<Certificate> {
    return this.http.get<Certificate>(environment.baseUrl + '/workers/' + workerId + '/certificates/' + certificateId)
      .pipe(
        retry(1),
        catchError(error => {
          console.error('Error getting certificate:', error);
          throw error;
        })
    );
  }

  getAllCertificatesByWorkerId(workerId: any): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(environment.baseUrl + '/workers/' + workerId + '/certificates')
      .pipe(
        retry(1),
        catchError(error => {
          console.error('Error getting certificates:', error);
          throw error;
        })
    );
  }
  //workers/34/certificates
  addCertificate(certificate: Certificate, workerId: any): Observable<Certificate> {
    return this.http.post<Certificate>(environment.baseUrl + '/workers/' + workerId + '/certificates', certificate)
      .pipe(
        catchError(error => {
          console.error('Error adding certificate:', error);
          throw error;
        })
      );
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
