import { Component, inject } from '@angular/core';
import { PetsService } from '../pets.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lost-pets',
  imports: [CommonModule],
  templateUrl: './lost-pets.component.html',
  styleUrl: './lost-pets.component.css'
})
export class LostPetsComponent {

  petService:PetsService = inject(PetsService);
  pets_data: any;
  filteredData = [];

  ngOnInit(){
    this.getPetsData();
  }

  getPetsData(){
    this.petService.getPetsData().subscribe((val)=>{
      this.pets_data = val;
      console.log(this.pets_data)
    })
  }

  filterPets(petType: string): void {
    if (petType === '') {
      this.petService.getPetsData().subscribe((val)=>{
        this.pets_data = val;
        console.log(this.pets_data)
      })
      } else {
      // this.filteredData = this.pets_data.filter(pet => pet.pet_type.toLowerCase() === petType.toLowerCase());
    }
  }

}
