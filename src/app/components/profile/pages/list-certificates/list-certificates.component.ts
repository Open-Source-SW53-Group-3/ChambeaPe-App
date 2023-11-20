import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { WorkerProfileService } from 'src/app/services/worker-profile.service';
import { Worker } from 'src/app/models/worker-entity';
import { CertificateService } from 'src/app/services/certificate.service';
import { CertificateDialogComponent } from '../../components/certificate-dialog/certificate-dialog.component';
import { AddEditCertificateComponent } from '../../components/add-edit-certificate/add-edit-certificate.component';

@Component({
  selector: 'app-list-certificates',
  templateUrl: './list-certificates.component.html',
  styleUrls: ['./list-certificates.component.scss']
})
export class ListCertificatesComponent {
  id:any;
  postId:any;

  worker!:Worker;
  isWorker:boolean = true;

  constructor(private dialog:MatDialog,private route:ActivatedRoute, private workerProfile:WorkerProfileService, private certificateServices: CertificateService) {} 
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.postId = params['postId'];
    });

    this.id = this.route.snapshot.paramMap.get('id');
    console.log('Worker ID:'+this.id);
    this.getProfile();
    this.getAllCertificates();
  }

  getProfile(){
    this.workerProfile.getWorkerById(this.id).subscribe(
      {
        next: data => {
          this.worker= data;
          console.log('Worker profile data: '+data);
        },
        error: error => {
          console.log('An error has occurred', error);
        }
      }
    );
  }

  getAllCertificates(){
    this.certificateServices.getAllCertificatesByWorkerId(this.id).subscribe({
      next: (data: any) => {
        this.worker.certificates = data;
        console.log('Certificates data: ', data);
      },
      error: (error: any) => {
        console.log('An error has occurred', error);
      }
    });
    
  }

  deleteCertificate(id:any){
    this.certificateServices.deleteCertificate(id, this.worker.id, this.postId).subscribe(
      {
        next: data => {
          console.log('Certificate deleted');
          this.getProfile();
        },
        error: error => {
          console.log('An error has occurred', error);
        }
      }
    );
  }
  viewCertificate(idCertificate:any){
    this.dialog.open(CertificateDialogComponent,{
      data:{
        idCertificate: idCertificate,
        idWorker: this.worker.id,
        idPost: this.postId
      }
    });
  }

  addCertificate(){
    const dialogRef = this.dialog.open(AddEditCertificateComponent,{
      data: {
        certificate: null,
        workerId : this.worker.id ,
        postId: this.postId,
      }
    });

    dialogRef.afterClosed().subscribe({
        next: data => {
          if( data ){
            console.log('Certificate added', data);
            this.getProfile();
          }
        }
    })
  }

  editCertificate(certificate:any ){

    const dialogRef = this.dialog.open(AddEditCertificateComponent, {
        data: {
              certificate: certificate,
              idPost: this.postId,
              idWorker: this.worker.id,
            }
        
      });
      dialogRef.afterClosed().subscribe({
        next: data => {
          if( data ){
            console.log('Certificate edited', data);
            this.getProfile();
          }
        }
    })
    
  }
}

