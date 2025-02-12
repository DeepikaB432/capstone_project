import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router,RouterModule  } from '@angular/router';
import { PetsService } from '../pets.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent{

  isAuthenticated: boolean = false; 
  private authStatusSubscription: Subscription | undefined;

  petService: PetsService = inject(PetsService);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.authStatusSubscription = this.petService.isAuthenticated$.subscribe(
      (status) => {
        this.isAuthenticated = status;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.authStatusSubscription) {
      this.authStatusSubscription.unsubscribe();
    }
  }

  logout() {
    this.petService.logout();  
    this.router.navigate(['signin']); 
  }
  
}
