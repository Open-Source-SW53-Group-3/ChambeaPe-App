import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployerPostService } from 'src/app/services/employer-post.service';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit{
  posts:any;

  constructor(private postService:PostService, private toastr:ToastrService){}

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

  apply(){
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
  }
}
