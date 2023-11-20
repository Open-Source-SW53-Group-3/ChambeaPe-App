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
import { CertificateService } from '../../services/certificate.service';

@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.scss']
})
export class WorkerProfileComponent {
  id:any;
  postId:any;
  skills: any;
  portfolios: any;
  user: any;
  isWorker!:boolean;
  firstCertificate: any;
  constructor(private certificateService: CertificateService, private loginService: LoginService, private workerService: WorkerService, private employerService: EmployerService, private dialog: MatDialog, private route: ActivatedRoute,  private userService: UserService, private router: Router) {
    const user = this.loginService.getUser();
    console.log("user dentro del profile: ");
    console.log(user);
  
    if (user && user.userRole == "W") {
      this.workerService.getWorkerById(user.id).subscribe(
        (worker: any) => {
          this.user = worker;
          console.log(worker);
          this.isWorker = true;
  
          this.workerService.getWorkerSkills(worker.id).subscribe(
            (skills: any) => {
              this.skills = skills;
              console.log(skills);
            }
          );

          this.workerService.getPortfolios(worker.id).subscribe(
            (portfolios: any) => {
              this.portfolios = portfolios;
              console.log(this.portfolios);
            }
          );

          this.certificateService.getFirstCertificate(worker.id).subscribe(
            (certificate: any) => {
              this.firstCertificate = certificate[0];
              console.log(certificate[0])
              console.log(this.firstCertificate);
            }
          );


        }
      );
    }
  
    if (user && user.userRole == "E") {
      this.employerService.getEmployerById(user.id).subscribe(
        (employer: any) => {
          this.user = employer;
          console.log(employer);
          // Any logic for employer can go here if needed
        }
      );
    }
  }
  
  ngOnInit(): void {
    // Move logic depending on user role inside the subscription blocks above to ensure it executes after user data retrieval.
    this.route.queryParams.subscribe(params => {
      this.postId = params['postId'];
    });
  
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('Worker ID:' + this.id);
    this.getProfile();
  }
  
  

  getProfile(){
  }

  ratingToInt(reviewRating: string): number {
    return parseInt(reviewRating);
  }

  certificates(id : any) {
    this.router.navigate(['/worker/'+ id+'/certificates']);
  }

  reviews(id : any) {
    this.router.navigate(['/worker/'+ id+'/reviews']);
  }

  viewCertificate(idCertificate:any){
    this.dialog.open(CertificateDialogComponent,{
      data:{
        idCertificate: idCertificate,
        idWorker: this.user.id,
      }
      
    });
  }

}
