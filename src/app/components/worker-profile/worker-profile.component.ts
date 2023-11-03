import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkerProfileService } from 'src/app/services/worker-profile.service';
import { Worker } from 'src/app/models/worker-entity';
import { UserService } from 'src/app/services/user.service';
import { UserRoles } from 'src/app/enums/user-roles.enum';
import { Router } from '@angular/router';
import  { MatDialog } from '@angular/material/dialog';
import { CertificateDialogComponent } from '../profile/components/certificate-dialog/certificate-dialog.component';

@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.scss']
})
export class WorkerProfileComponent {
  id:any;
  postId:any;

  worker!:Worker;
  isWorker!:boolean;

  constructor(private dialog:MatDialog, private route:ActivatedRoute, private workerProfile:WorkerProfileService, private userService:UserService,  private router:Router) {} 
  
  ngOnInit(): void {
    this.isWorker = this.userService.hasRole(UserRoles.Worker);

    this.route.queryParams.subscribe(params => {
      this.postId = params['postId'];
    });

    this.id = this.route.snapshot.paramMap.get('id');
    console.log('Worker ID:'+this.id);
    this.getProfile();
  }

  getProfile(){
    this.workerProfile.getWorkerById(this.id, this.postId).subscribe(
      {
        next: data => {
          this.worker=data;
          console.log('Worker profile data: '+data);
        },
        error: error => {
          console.log('An error has occurred', error);
        }
      }
    );
  }

  ratingToInt(reviewRating: string): number {
    return parseInt(reviewRating);
  }

  certificates(id : any) {
    this.router.navigate(['/worker/'+ id+'/certificates'], { queryParams: { postId:this.postId } });
  }

  reviews(id : any) {
    this.router.navigate(['/worker/'+ id+'/reviews'], { queryParams: { postId:this.postId } });
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

}
