import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { MailService } from '../mail.service';

@Component({
  selector: 'app-contactus',
  imports: [FormsModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {

  // email= 'bansaldeepika432@gmail.com';
  
  mail:MailService = inject(MailService);

  emailDetails={
    name:"",
    to_email:"",
    subject:"",
    message:""
  }

  sendEmail(data:any){
    console.log(data.form);
    if(data.form.status == "VALID"){
      this.mail.sendMail(data.form.value).subscribe({
        next:(data)=>{
          console.log('Data' + data);
        },
        error:(error)=>{
          console.log('Error' + error)
        }
      })
    }
  }

}
