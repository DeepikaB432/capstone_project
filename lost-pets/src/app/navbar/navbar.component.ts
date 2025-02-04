import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PetsService } from '../pets.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    petService:PetsService = inject(PetsService);
    router:Router= inject(Router);
    isAuthenticated :boolean = false;
    token:any = '';

    constructor(){
      // this.token = localStorage.getItem('token');
      // console.log(this.token)
      // this.petService.isAuthenticated()
    }
    ngOnInit() {


      this.token = localStorage.getItem('token');
      console.log("ngoninit changes" + this.token)
      if (this.token) {
        this.isAuthenticated = true;
        console.log('Token exists:', this.token);
      } else {
        this.isAuthenticated = false;
        console.log('Token does not exist');
      }
    }

    ngOnChanges(){
      console.log("ngOnChanges changes" + this.token)
    }

    logout(){
      this.isAuthenticated = false;
      localStorage.removeItem('token');
      this.router.navigate(['signin']);
    }
}
