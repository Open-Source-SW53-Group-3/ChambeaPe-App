import { Component, HostListener  } from '@angular/core';
import { EmployerService } from 'src/app/services/user/employer/employer.service';
//import { WorkerProfileService } from 'src/app/services/worker-profile.service';
import { WorkerService } from 'src/app/services/user/worker/worker.service';
import { Worker } from 'src/app/models/worker-entity';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/user/login/login.service';
import { CookieService } from 'ngx-cookie-service';


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
  user : any;
  posts : any;

  /**/
  cols: number = 4;

  constructor(private loginService : LoginService,private cookieService: CookieService,private employerService:EmployerService, private workerService:WorkerService, private route:ActivatedRoute , private router:Router) {
    this.user = this.cookieService.get('user');

    console.log("user: ");
    console.log(this.user);
  }

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
    this.getEmployers();
    this.checkScreenWidth();
  }

 getWorkers(){
    this.workerService.getAllWorkers().subscribe(
      (data) => {
        console.log(data);
        this.workers = data;
        let size = this.workers.length;
        console.log("tamaño de trabajadores: " + size);
        this.workerSelect =  Math.floor(Math.random() * (size));
        console.log("workerd selected: " + this.workerSelect);
      },
      (error) => {
        console.error('Ha ocurrido un error:', error);
      }
    );
  }

  getEmployers(){
    this.employerService.getAllWorkers().subscribe(
      (data) => {
        console.log(data);
        this.employers = data;
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
