import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PetsService } from '../pets.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  petService:PetsService = inject(PetsService);
  router:Router = inject(Router);

  signInDetails ={
    email: '',
    password:''
  }

  onSubmit(data:any){
    console.log(data)
    if(data.form.valid){
      this.petService.login(data.form.value).subscribe({
        next: (results:any)=>{
          localStorage.setItem('token',results.token);
          this.router.navigate(['home'])
          // console.log(results)
        },
        error:(errors)=>{
          // this.errors.error = true;
          // this.errors.message = errors.error.message;
          console.log(errors)
        }
      }
    )}
  }
}
