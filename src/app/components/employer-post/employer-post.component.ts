import { Component } from '@angular/core';
import { EmployerPost } from 'src/app/models/employer-post';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployerPostService } from 'src/app/services/employer-post.service';
import { WorkerProfileService } from 'src/app/services/worker-profile.service';
import {ToastrService } from 'ngx-toastr';
import { PostulationService } from 'src/app/services/postulation/postulation.service';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-employer-post',
  templateUrl: './employer-post.component.html',
  styleUrls: ['./employer-post.component.scss']
})
export class EmployerPostComponent {
  post:any;
  postulations:any;

  editMode:boolean=false;

  toggleEditMode(){
    this.editMode = !this.editMode;
  }
  
  id:any;
  
  constructor(private pustulation:PostulationService,private postService:PostService,private postServicev1:EmployerPostService, private workerService:WorkerProfileService,
    private route:ActivatedRoute, private router:Router, private toastr:ToastrService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('Post ID: '+this.id);
    this.getPost();
    this.getPostulations();
  }


  //****************/

  getPost(){
    this.postService.getPostById(this.id).subscribe((data)=>{
      next: this.post = data;
      error:{
        console.log('An error has occurred');
        //this.toastr.error('Ocurrió un error al cargar los posts. Por favor, inténtalo de nuevo más tarde');
      }
    });
  }


  getPostulations(){
    this.pustulation.getAllWorkersByPost(this.id).subscribe((data)=>{
      next: this.postulations = data;
      error:{
        console.log('An error has occurred');
      }
    });
  }

  //************/


  getPostv1(){
    this.postServicev1.getPostById(this.id).subscribe((data)=>{
      next: this.post = data;
      error:{
        console.log('An error has occurred');
        // this.toastr.error('Ocurrió un error al cargar los posts. Por favor, inténtalo de nuevo más tarde');
      }
    });
  }



  viewProfile(workerId:any){
    this.router.navigate(['/worker/'+ workerId], { queryParams: { postId:this.id } });
  }

  editPost(){
    this.postServicev1.editPost(this.id, this.post).subscribe(
      {
        next: data => {
          console.log('Post updated: '+data);
          this.toastr.success('Publicación editada exitosamente.');
          this.getPostv1()
        },
        error: error => {
          console.log('An error has occurred', error);
          this.toastr.error('Ocurrió un error al editar el post. Por favor, inténtalo de nuevo más tarde.');
        }
      }
    );
  }

  deletePost(){
    this.postServicev1.deletePost(this.id).subscribe(
      {
        next: data => {
          console.log('Post deleted: '+data);
          this.toastr.success('Se eliminó el post satisfactoriamente.');
          this.router.navigateByUrl('/posts');
        },
        error: error => {
          console.log('An error has occurred', error);
          this.toastr.error('Ocurrió un error al eliminar el post. Por favor, inténtalo de nuevo más tarde.');
        }
      }
    );
  }

  deleteWorker(workerId:any){
    this.workerService.deleteWorker(workerId, this.id).subscribe(
      {
        next: data => {
          console.log('Worker profile deleted: '+data);
          this.toastr.success('El chambeador fue eliminado satisfactoriamente.');
          this.getPost()
        },
        error: error => {
          console.log('An error has occurred', error);
          this.toastr.error('Ocurrió un error al eliminar el chambeador. Por favor, inténtalo de nuevo más tarde.');
        }
      }
    );
  }
}
