import { Component, inject } from '@angular/core';
import { PetsService } from '../pets.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lost-pets',
  imports: [CommonModule],
  templateUrl: './lost-pets.component.html',
  styleUrls: ['./lost-pets.component.css']
})
export class LostPetsComponent {

  petService: PetsService = inject(PetsService);
  route: ActivatedRoute = inject(ActivatedRoute)
  pets_data: any = []; 
  filteredData: any = []; 
  filterActive: string = ''; 
  petType: string = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.petType = params.get('petType') || '';
      this.getPetsData();
    }); 
  }

  getPetsData(): void {
    this.petService.getPetsData().subscribe((val) => {
      this.pets_data = val;
      // this.filteredData = val; 
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
  }
}
