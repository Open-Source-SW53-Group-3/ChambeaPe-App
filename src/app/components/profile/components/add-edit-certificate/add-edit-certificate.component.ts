import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Certificate } from 'src/app/models/certificate';
import { CertificateService } from 'src/app/services/certificate.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-certificate',
  templateUrl: './add-edit-certificate.component.html',
  styleUrls: ['./add-edit-certificate.component.scss']
})
export class AddEditCertificateComponent {
  certificate!: Certificate;
  empForm: FormGroup;
  imgUrlPreviw:any;
  constructor(    private dialogRef: MatDialogRef<AddEditCertificateComponent>,
    private formBuilder: FormBuilder, private certificateService: CertificateService,  @Inject(MAT_DIALOG_DATA) public dataDialog: any  ) {
    this.certificate = this.dataDialog.certificate;

    this.empForm = this.formBuilder.group({
      imgUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/\S+/)]],  
      certificateName: ['', Validators.maxLength(50)], 
      institutionName: ['', Validators.minLength(3)],   
      professor: ['', Validators.pattern(/^[a-zA-Z\s]+$/)],  
      issueDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.certificate);

    console.log('Valores de idPost e idWorker:', this.dataDialog.idPost, this.dataDialog.idWorker);

  }

  editCertificate() {
    console.log("rare",this.dataDialog.certificate);
    this.certificateService.editCertificate(this.certificate.id, this.empForm.value, this.dataDialog.idWorker, this.dataDialog.idPost).subscribe(
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

    this.certificateService.addCertificate(this.empForm.value, this.dataDialog.workerId, this.dataDialog.postId).subscribe(
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
