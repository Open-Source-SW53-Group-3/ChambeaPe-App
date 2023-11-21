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
import { Review } from '../../models/review';
import { ReviewService } from 'src/app/services/review.service';

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
  listReviews : any;
  userId: any;
  user: any;
  isWorker!:boolean;
  firstCertificate: any;

  userEmployer:any;
  userWorker:any;
  userLogin:any;
  sameUser: boolean = false;
  constructor( private reviewService:ReviewService, private certificateService: CertificateService, private loginService: LoginService, private workerService: WorkerService, private employerService: EmployerService, private dialog: MatDialog, private route: ActivatedRoute,  private userService: UserService, private router: Router) {
    this.userLogin = this.loginService.getUser();
   
    const user_id = this.loginService.getUser().id;
    console.log("-------------------------------------------------------");
    console.log(this.id);
    // const user = this.userService.getUserById(user_id);
    // console.log("user dentro del profile: ");
    // console.log(user);
    console.log('dgfffffffffffffffffffff',this.userId);


  }
    
  
  ngOnInit(): void {
    // Move logic depending on user role inside the subscription blocks above to ensure it executes after user data retrieval.
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
    });
  
    this.userId = this.route.snapshot.paramMap.get('id');
    
    console.log('Worker ID:' + this.userId);
    this.sameUser = this.userLogin.id == this.userId;
    if(this.userLogin.id == this.userId){
      this.sameUser = true;
    }
    console.log("ndfjkdbgbkjdbkjddddddddddddddgb-----------", this.userLogin.id, "dgbjkdgbd", this.userId);

    this.validateProfile();
  }
  
  

  ratingToInt(reviewRating: string): number {
    return parseInt(reviewRating);
  }

  certificates(id : any) {
    this.router.navigate(['/worker/'+ id+'/certificates']);
  }

  reviews() {
    this.router.navigate(['/worker/'+ this.id+'/reviews']);
  }

  viewCertificate(idCertificate:any){
    this.dialog.open(CertificateDialogComponent,{
      data:{
        idCertificate: idCertificate,
        idWorker: this.user.id,
      }
      
    });
  }

  validateProfile(){

    this.userEmployer = this.employerService.getEmployerById(this.userId).subscribe({
      next: (employer: any) => {
        this.user = employer;
        console.log(employer);
        // Any logic for employer can go here if needed
      },
      error: (err: any) => {
        // console.log(err);
      }
    });
    

    this.userWorker = this.workerService.getWorkerById(this.userId).subscribe({
      next: (worker: any) => {
        this.user = worker;
        console.log(worker);
        // Any logic for employer can go here if needed
      },
      error: (err: any) => {
        // console.log(err);
      }
    });
    console.log("dsfgfgdfgd",this.userEmployer);
    console.log("dfggggg",this.userWorker);

    if( this.userWorker != null){
      // this.user = workerService.getWorkerById(this.userId);
      console.log("worker: ");
      console.log(this.user);
      this.workerService.getWorkerById(this.userId).subscribe(
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

          this.reviewService.getReviewsByWorkerId(worker.id).subscribe(
            (reviews: any) => {
              this.listReviews = reviews;
              console.log(this.listReviews);
              //cambiar employer name por cada review
              for (let i = 0; i < this.listReviews.length; i++) {
                this.employerService.getEmployerById(this.listReviews[i].sentById).subscribe(
                  (employer: any) => {
                    console.log(employer);
                    this.listReviews[i].employerName = employer.firstName + " " + employer.lastName;
                    this.listReviews[i].employerPhoto = employer.profilePic;
                    console.log(this.listReviews[i].employerName);
                  }
                );
              }

              console.log(this.listReviews);
            }
          );


        }
      );
    }else if(this.userEmployer != null){
      this.user = this.employerService.getEmployerById(this.id);
      console.log("worker: ");
      console.log(this.user);
      this.employerService.getEmployerById(this.userId).subscribe(
        (employer: any) => {
          this.user = employer;
          console.log(employer);
          // Any logic for employer can go here if needed
        }
      );
    }
  }

}
