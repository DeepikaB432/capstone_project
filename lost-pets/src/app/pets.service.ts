import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  http:HttpClient = inject(HttpClient);
  jwt:JwtHelperService = inject(JwtHelperService);
  
  url:string = 'http://localhost:3000/';

  constructor() { }

  addpets(data:{}){
    return this.http.post(this.url + 'add_pets_data/', data);
  } 
  
  isAuthenticated(){
    const token = localStorage.getItem('token');
    // console.log(token)
    return !this.jwt.isTokenExpired(token);
  }

  login(data:{}){
    return this.http.post(this.url + 'login', data)
  }

  register(data:{}){
    return this.http.post(this.url + 'register', data)
  }

  getPetsData(){
    return this.http.get(this.url + 'get_pets_data');
  }

}
