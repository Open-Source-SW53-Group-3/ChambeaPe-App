import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkerProfileService } from 'src/app/services/worker-profile.service';
import { Worker } from 'src/app/models/user/worker';
import { UserService } from 'src/app/services/user.service';
import { UserRoles } from 'src/app/enums/user-roles.enum';
import { Router } from '@angular/router';
import  { MatDialog } from '@angular/material/dialog';
import { CertificateDialogComponent } from '../profile/components/certificate-dialog/certificate-dialog.component';
import { LoginService } from 'src/app/services/user/login/login.service';
import { WorkerService } from 'src/app/services/user/worker/worker.service';
import { EmployerService } from 'src/app/services/user/employer/employer.service';

@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.scss']
})
export class WorkerProfileComponent {
  id:any;
  postId:any;

  user: any;
  isWorker!:boolean;

  constructor(private loginService:LoginService, private workerService: WorkerService, private employerService: EmployerService,private dialog:MatDialog, private route:ActivatedRoute, private workerProfile:WorkerProfileService, private userService:UserService,  private router:Router) { 
    var user= this.loginService.getUser();
    console.log("user dentro del profile: ");
    console.log(user);

    if(user.userRole == "W"){
      this.workerService.getWorkerById(user.id).subscribe(
        (worker: any) => {
          this.user = worker;
          console.log(worker);
        }
      );
    }

      if(user.userRole == "E"){
        this.employerService.getEmployerById(user.id).subscribe(
          (employer: any) => {
            this.user = employer;
            console.log(employer);
          }
        );
      }
  }

  ngOnInit(): void {
    this.isWorker = this.user.userRole;

    this.route.queryParams.subscribe(params => {
      this.postId = params['postId'];
    });

    this.id = this.route.snapshot.paramMap.get('id');
    console.log('Worker ID:'+this.id);
    this.getProfile();
  }

  getProfile(){
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
        idWorker: this.user.id,
        idPost: this.postId
      }
    });
  }

}
