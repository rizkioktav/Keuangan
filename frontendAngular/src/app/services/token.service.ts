import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private apiUrl = environment.apiUrl;

  constructor() { }

  handle(token: any, rememberMe: boolean) {
    this.set(token, rememberMe);
    console.log(this.isValid());
  }

  set(token: any, rememberMe: boolean) {
    if (rememberMe) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
  }

  get() {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return (payload.iss === `${this.apiUrl}/login`);
      }
    }
    return false;
  }

  payload(token: any) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload: any) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }
}
