import { Component, HostListener  } from '@angular/core';
import { EmployerPostService } from 'src/app/services/employer-post.service';
import { WorkerProfileService } from 'src/app/services/worker-profile.service';
import { Worker } from 'src/app/models/worker';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  search : String ="";
  workers : any;
  employers :any;
  postPosition !: number;
  postPositionWorker !: number;

  posts : any;

  /**/
  cols: number = 4;

  constructor(private postService:EmployerPostService, private workerService:WorkerProfileService,private route:ActivatedRoute , private router:Router) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Cuando cambie el tamaño de la ventana, llama a la función para ajustar las columnas
    this.checkScreenWidth();
  }

  private checkScreenWidth(): void {
    const wideScreenWidth = 1200; // Umbral para pantallas anchas
    const mediumScreenWidth = 800; // Umbral para pantallas medianas
    const smallScreenWidth = 600; // Umbral para pantallas pequeñas

    const windowWidth = window.innerWidth;

    if (windowWidth >= wideScreenWidth) {
      // Pantallas anchas
      this.cols = 4;
    } else if (windowWidth >= mediumScreenWidth) {
      // Pantallas medianas
      this.cols = 2;
    } else if (windowWidth >= smallScreenWidth) {
      // Pantallas pequeñas
      this.cols = 1;
    } else {
      this.cols = 1; 
    }
  }

  /**/

  workerSelect: any;

  ngOnInit(): void {
    this.getWorkers();
    this.checkScreenWidth();
  }

  getWorkers(){
    this.postService.getPostList().subscribe(
      (data) => {
        console.log(data);
        this.posts = data;

        this.startPosts(this.posts.length);
        this.employers= this.posts[this.postPosition].workers;
        this.workers= this.posts[this.postPositionWorker].workers;



        let size = this.workers.length;
        console.log("tamaño de trabajadores: " + size);
        
        this.workerSelect =  Math.floor(Math.random() * (size));
        console.log("workerd selected: " + this.workerSelect);

        console.log(this.workers[this.workerSelect].name);
      },
      (error) => {
        console.error('Ha ocurrido un error:', error);
      }

    );
  }

  startPosts(numberOne: number){
    this.postPosition = Math.floor(Math.random() * numberOne);
    console.log("Posicion 1: "+this.postPosition);
    this.postPositionWorker = Math.floor(Math.random() * numberOne);
    console.log("Posicion 2: "+this.postPositionWorker);
  }


  viewProfile(){ 
    this.router.navigate(['/worker/'+ this.workers[this.workerSelect].id],{ queryParams: { postId:this.posts[this.postPositionWorker].id } });
  }

  //Styles
  shouldApplyMarginBottomWorker() {
    return this.workers.length > 3;
  }

  shouldApplyMarginBottomEmployer() {
    return this.employers.length > 3;
  }
  
  // Función para obtener la clase CSS condicional
  get marginBottomClassWorker() {
    return this.shouldApplyMarginBottomWorker() ? 'with-margin-bottom' : '';
  }

  get marginBottomClassEmployer() {
    return this.shouldApplyMarginBottomEmployer() ? 'with-margin-bottom' : '';
  }

  home(){
    this.router.navigateByUrl('/home');
  };
}
