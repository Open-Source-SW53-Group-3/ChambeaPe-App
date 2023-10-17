import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployerPostService } from 'src/app/services/employer-post.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit{
  jobs:any[]=[];

  constructor(private postService:EmployerPostService, private toastr:ToastrService){}

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs():void{
    this.postService.getPostList().subscribe(
      {
        next: (data) => {
          this.jobs=data
        },
        error: (error) => {
          
        },
      }
    );
  }

  apply(){
    this.toastr.success('Aplicaste al trabajo exitosamente');
  }
}
