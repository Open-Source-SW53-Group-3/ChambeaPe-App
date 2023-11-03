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
    this.postService.getAllPosts().subscribe((data)=>{
      next: this.posts = data;
      error:{
        console.log('An error has occurred');
        this.toastr.error('Ocurrió un error al cargar los trabajos. Por favor, inténtalo de nuevo más tarde');
      }
    });
  }

  apply(){
    this.toastr.success('Aplicaste al trabajo exitosamente');
  }
}
