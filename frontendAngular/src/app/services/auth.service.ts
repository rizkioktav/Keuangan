import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
  authStatus = this.loggedIn.asObservable();

  constructor(private token: TokenService) { }

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }

  // Method untuk menyimpan token otentikasi
  setAuthToken(token: string) {
    this.token.set(token);
    this.changeAuthStatus(true);
  }

  // Method untuk mendapatkan token otentikasi
  getAuthToken(): string | null {
    return this.token.get();
  }

  // Method untuk menghapus token otentikasi
  removeAuthToken() {
    this.token.remove();
    this.changeAuthStatus(false);
  }

  // Method untuk memeriksa status otentikasi
  isLoggedIn(): boolean {
    return this.token.loggedIn();
  }
}
