import { Component, OnInit } from '@angular/core';
import { PetsService } from '../pets.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adopt-pet',
  imports: [CommonModule],
  templateUrl: './adopt-pet.component.html',
  styleUrls: ['./adopt-pet.component.css']
})
export class AdoptPetComponent implements OnInit {
  pets_data: any ;
  filteredPets: any;
  selectedPet: any = null;

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
    if (petType === '') {
      this.filteredPets = this.pets_data;
    } else {
      this.filteredPets = this.pets_data.filter((pet:any) => pet.pet_type.toLowerCase() === petType.toLowerCase());
    }
  }

  // Filter pets by size (small, medium, large)
  filterPetsBySize(size: string): void {
    if (size === '') {
      this.filteredPets = this.pets_data;
    } else {
      this.filteredPets = this.pets_data.filter((pet:any) => pet.size.toLowerCase() === size.toLowerCase());
    }
  }

  // Show pet details in a modal
  showPetDetails(pet: any): void {
    this.selectedPet = pet;
    // Display the modal using Bootstrap (can also use Angular Material Dialog or custom modals)
    // const modal = new bootstrap.Modal(document.getElementById('petDetailsModal') as Element);
    // modal.show();
  }

  // Initiate the adoption process
  initiateAdoption(): void {
    alert('You have initiated the adoption process!');
    // This can be replaced with actual logic like filling out an adoption form or sending an email.
  }
}
