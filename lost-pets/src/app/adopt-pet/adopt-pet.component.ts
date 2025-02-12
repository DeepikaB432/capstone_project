import { Component, OnInit } from '@angular/core';
import { PetsService } from '../pets.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-adopt-pet',
  imports: [CommonModule, RouterModule, NgxPaginationModule],
  templateUrl: './adopt-pet.component.html',
  styleUrls: ['./adopt-pet.component.css'],
})
export class AdoptPetComponent implements OnInit {
  pets_data: any;
  filteredPets: any;
  selectedPet: any = null;
  filterActive: string = '';
  p: number = 1; // Current page for pagination
  pageSize: number = 12; // Items per page

  constructor(private petService: PetsService) {}

  ngOnInit(): void {
    // Fetch all pets
    this.petService.getPetsData().subscribe((pets) => {
      this.pets_data = pets;
      this.filteredPets = pets; // Initially show all pets
    });
  }

  // Filter pets by type (dog, cat, etc.)
  filterPetsByType(petType: string): void {
    this.filterActive = petType;
    if (petType === '') {
      this.filteredPets = this.pets_data;
    } else {
      this.filteredPets = this.pets_data.filter(
        (pet: any) => pet.pet_type.toLowerCase() === petType.toLowerCase()
      );
    }
    this.p = 1;
  }

  onPageChange(event: number): void {
    this.p = event; // Set the current page number from the event
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }
}
