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

  setAuthToken(token: string, rememberMe: boolean) {
    this.token.handle(token, rememberMe);
    this.changeAuthStatus(true);
  }

  getAuthToken(): string | null {
    return this.token.get();
  }

  removeAuthToken() {
    this.token.remove();
    this.changeAuthStatus(false);
  }

  isLoggedIn(): boolean {
    return this.token.loggedIn();
  }
}
