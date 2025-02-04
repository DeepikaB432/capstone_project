import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
// import { HomeComponent } from './home/home.component';
import { PetsService } from './pets.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,FooterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lost-pets';
  petService:PetsService = inject(PetsService);
  isAuthenticated :boolean = false;
  token:any = '';

  ngOnInit() {


  //   this.token = localStorage.getItem('token');
  //   console.log("token:"  +  this.token)
  //   if (this.token) {
  //     this.isAuthenticated = true;
  //     console.log('Token exists:', this.token);
  //   } else {
  //     this.isAuthenticated = false;
  //     console.log('Token does not exist');
  //   }
  }
  
}
