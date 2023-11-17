import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/post/post.service';
import { PostulationService } from 'src/app/services/postulation/postulation.service';
import { LoginService } from 'src/app/services/user/login/login.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit{
  posts:any;
  user:any;
  constructor(private loginService:LoginService, private postService:PostService, private toastr:ToastrService, private postulationService: PostulationService){
    this.user = this.loginService.getUser();

  }
  ngOnInit(): void {
    this.getJobs();
  }

  getJobs():void{
    this.postService.getAllPosts().subscribe(
      (data) => {
        this.posts = data;
      },
      (error) => {
        console.log('An error has occurred', error);
        this.toastr.error('Ocurrió un error al cargar los trabajos. Por favor, inténtalo de nuevo más tarde');
      }
    );
  }

  apply( postId:number){
    this.toastr.success(
      'Postulación enviada con éxito',
      'Postulación enviada',
      {
        progressAnimation: 'decreasing',
        progressBar: true,
        timeOut: 3000,  // Tiempo estándar
        closeButton: true,
        easeTime: 300,
        positionClass: 'toast-top-right',
        tapToDismiss: true,
        extendedTimeOut: 1000,
      }
    );
    console.log("rara");
    console.log(this.user);
      this.postulationService.createPostulation(postId, this.user.id).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log('An error has occurred', error);
          this.toastr.error('Ocurrió un error al cargar los trabajos. Por favor, inténtalo de nuevo más tarde');
        }
      );
  }

}
