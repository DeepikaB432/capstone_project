import { Component, inject } from '@angular/core';
import { PetsService } from '../pets.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-lost-pets',
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './lost-pets.component.html',
  styleUrls: ['./lost-pets.component.css']
})
export class LostPetsComponent {

  petService: PetsService = inject(PetsService);
  route: ActivatedRoute = inject(ActivatedRoute);
  pets_data: any = []; 
  filteredData: any = []; 
  filterActive: string = ''; 
  petType: string = '';
  p: number = 1;  // Current page for pagination
  pageSize: number = 9; // Items per page
  isAuthenticated: boolean = false; // Track if user is logged in

  ngOnInit(): void {
    // Check if the user is logged in
    this.isAuthenticated = this.petService.isAuthenticated(); 

    this.route.paramMap.subscribe(params => {
      this.petType = params.get('petType') || '';
      this.getPetsData();
    });
  }

  getPetsData(): void {
    this.petService.getPetsData().subscribe((val) => {
      this.pets_data = val;
      this.filterPets(this.petType);
    });
  }

  filterPets(petType: string): void {
    this.filterActive = petType; 
    if (petType === '') {
      this.filteredData = this.pets_data;
    } else {
      this.filteredData = this.pets_data.filter((pet: any) =>
        pet.pet_type.toLowerCase() === petType.toLowerCase()
      );
    }

    this.p = 1;
  }

  onPageChange(event: number): void {
    this.p = event; // Set the current page number from the event
    window.scrollTo(0, 0);  // Scrolls to the top of the page
  }
  
}
