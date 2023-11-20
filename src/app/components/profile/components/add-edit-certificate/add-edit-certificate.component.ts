import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Certificate } from 'src/app/models/certificate';
import { CertificateService } from 'src/app/services/certificate.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-certificate',
  templateUrl: './add-edit-certificate.component.html',
  styleUrls: ['./add-edit-certificate.component.scss']
})
export class AddEditCertificateComponent {
  certificate!: Certificate;
  newCertificate!: Certificate;
  empForm=  new FormGroup({
    'imgUrl': new FormControl('', [Validators.required, Validators.pattern(/^https?:\/\/\S+/)]),  
    'certificateName':new FormControl(   '', Validators.maxLength(50)), 
    'institutionName':new FormControl(  '', Validators.minLength(3)),   
    'professor': new FormControl( '', Validators.pattern(/^[a-zA-Z\s]+$/)),  
    'issueDate': new FormControl( '', Validators.required),
  });;
  imgUrlPreviw:any;
  constructor(    private dialogRef: MatDialogRef<AddEditCertificateComponent>,
    private certificateService: CertificateService,  @Inject(MAT_DIALOG_DATA) public dataDialog: any  ) {
    this.certificate = this.dataDialog.certificate;
    this.newCertificate = {} as Certificate;
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.certificate);

  }

  editCertificate() {
    console.log("rare",this.dataDialog.certificate);
    this.newCertificate = { ...this.empForm.value } as Certificate;
    this.certificateService.editCertificate(this.certificate.id, this.newCertificate, this.dataDialog.idWorker, this.dataDialog.idPost).subscribe(
      {
        next: data => {
          console.log('Certificate edited', data);
          this.dialogRef.close(true);
        },
        error: error => {
          console.log('An error has occurred', error);
        }
      }
    );
    
  }

  addCertificate() {
    console.log("rara",this.dataDialog);
    console.log("id",this.dataDialog.workerId);
    console.log("rara",this.dataDialog);
    this.newCertificate = { ...this.empForm.value } as Certificate;
    console.log(this.newCertificate);

    this.certificateService.addCertificate(this.newCertificate, this.dataDialog.workerId).subscribe(
      {
        next: data => {
          console.log('Certificate added', data);
          this.dialogRef.close(true);
        },
        error: error => {
          console.log('An error has occurred', error);
        }
      }
    );
  }

  onFormSubmit(){
    if(this.empForm.valid){
      if(this.certificate){
        console.log(this.dataDialog);
        this.editCertificate();
      }else{
        console.log(this.dataDialog);
        this.addCertificate();
      }
      
    }
  }

}
