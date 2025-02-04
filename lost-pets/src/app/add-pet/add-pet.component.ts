import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PetsService } from '../pets.service';

@Component({
  selector: 'app-add-pet',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-pet.component.html',
  styleUrl: './add-pet.component.css'
})
export class AddPetComponent {

  pet_data: PetsService = inject(PetsService);
  successMessage: string = '';
  formSubmitted: boolean = false;

  currentImage:any;
  preview="";

  petForm:any = new FormGroup({
    pet_type: new FormControl('',Validators.required),
    pet_name: new FormControl(''),
    location: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    contact_info: new FormControl('',Validators.required),
    // file_upload: this.currentImage
  })

  submitForm(){
    console.log(this.petForm);
    const formData = new FormData();
    formData.append('pet_type', this.petForm.get('pet_type').value);
    formData.append('pet_name', this.petForm.get('pet_name')?.value);
    formData.append('location', this.petForm.get('location')?.value);
    formData.append('description', this.petForm.get('description')?.value);
    formData.append('contact_info', this.petForm.get('contact_info')?.value);
    formData.append('files', this.currentImage);
    console.log(formData)
    if(this.currentImage){
      console.log('here1')
      this.pet_data.addpets(formData).subscribe((result) => {
        console.log('here2')
        console.log(result)
        console.log('Added Successfully');
      });
    }
    this.successMessage = 'Your pet report has been successfully submitted!';
    this.formSubmitted = true;
  }

  onFileSelect(event: any): void {
    const uploadedFile = event.target.files;
    this.preview = "";
    if(uploadedFile){
      const file: File | null = uploadedFile.item(0);

      if(file){
        console.log(file)
        this.currentImage = file;
        const reader = new FileReader();
        reader.onload = (e:any)=>{
          console.log(e.target.result);
          this.preview = e.target.result;
        }
        reader.readAsDataURL(this.currentImage)
      }
    }
  }
  
}
