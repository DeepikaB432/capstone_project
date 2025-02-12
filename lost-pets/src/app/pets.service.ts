import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  http: HttpClient = inject(HttpClient);
  jwt: JwtHelperService = inject(JwtHelperService);
  url: string = 'http://localhost:3000/';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {}

  private hasToken(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && !this.jwt.isTokenExpired(token);
  }

  addpets(data: {}) {
    return this.http.post(this.url + 'add_pets_data/', data);
  }

  isAuthenticated(): boolean {
    return this.hasToken(); 
  }

  login(data: {}) {
    return this.http.post<any>(this.url + 'login', data).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.isAuthenticatedSubject.next(true); 
        }
        return response;
      })
    );
  }

  register(data: {}) {
    return this.http.post(this.url + 'register', data);
  }

  getPetsData() {
    return this.http.get(this.url + 'get_pets_data');
  }

  logout() {
    localStorage.removeItem('token');  
    this.isAuthenticatedSubject.next(false);
  }
  
}
