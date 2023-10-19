import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Certificate } from 'src/app/models/certificate';
import { CertificateService } from 'src/app/services/certificate.service';
@Component({
  selector: 'app-certificate-dialog',
  templateUrl: './certificate-dialog.component.html',
  styleUrls: ['./certificate-dialog.component.scss']
})
export class CertificateDialogComponent {
  
  certificate!: Certificate;
  constructor(private certificateService: CertificateService,  @Inject(MAT_DIALOG_DATA) public dataDialog: any  ) { }

  ngOnInit(): void {
    this.certificate = this.dataDialog;
    this.getCertificateById();      

  }
  
  getCertificateById() {
    this.certificateService.getCertificateById(this.dataDialog.idCertificate, this.dataDialog.idWorker, this.dataDialog.idPost).subscribe(
      {
        next: data => {
          this.certificate = data;
          console.log('Certificate data: ' + data);
        },
        error: error => {
          console.log('An error has occurred', error);
        }
      }
    );
  }
}
