import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User  ={
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    profilePic: ""
  };
  imgUrl:string ="";
  fullName:string ="";
  email:string ="";

  constructor(private cookie:CookieService, private loginService:LoginService){}

  ngOnInit() {
    const userId = this.cookie.get('userId');
    this.loginService.getUser(userId).subscribe((res: any) => {
      this.user = res;

      this.imgUrl = this.user.profilePic;
      this.fullName = this.user.firstName + " " + this.user.lastName;
      this.email = this.user.email;
    });
  }
}
