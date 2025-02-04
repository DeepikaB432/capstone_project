import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PetsService } from '../pets.service';
@Component({
  selector: 'app-signup',
  imports: [RouterModule,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  petService:PetsService = inject(PetsService);
  router:Router = inject(Router);

  signupDetails = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''
  };

  onSubmit(data: any) {
    if(data.form.valid){
      this.petService.register(data.form.value).subscribe({
        next:(result)=>{
          // this.success = true;
          console.log(result);
          setTimeout(() => {
            this.router.navigate(['signin']);
          }, 2000);
        },
        error:(errors)=>{
          // this.errors= true;
          console.log(errors);
          if(errors.message){
            // this.error_message = errors.message;
          }
        }
      })
    }
  }
}
