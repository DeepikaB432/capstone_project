import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor() { }

  http:HttpClient = inject(HttpClient);

  url:string = "http://localhost:3000/";

  sendMail(data:{}){
    return this.http.post(this.url + "sendemail/", data)
  }
  
}
