import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loggedIn: boolean = false;

  public form = {
    no_hp: null,
    email: null,
    password: null,
    rememberMe: false // Add rememberMe to the form
  };
  public loginType = 'email'; // Default login type is email
  passwordVisible: boolean = false;

  constructor(private backend: BackendService, private token: TokenService, private router: Router, private Auth: AuthService) { }

  ngOnInit(): void {
    this.Auth.authStatus.subscribe(value => {
      this.loggedIn = value;
    });
  }

  public error = null;

  isFormComplete(): boolean {
    if (this.loginType === 'email') {
      return this.form.email !== null && this.form.password !== null;
    } else if (this.loginType === 'phone') {
      return this.form.no_hp !== null && this.form.password !== null;
    }
    return false;
  }

  submitLogin() {
    let loginData;
    if (this.loginType === 'email') {
      loginData = { email: this.form.email, password: this.form.password };
    } else if (this.loginType === 'phone') {
      loginData = { no_hp: this.form.no_hp, password: this.form.password };
    }

    // Send login request
    return this.backend.login(loginData).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  handleResponse(data: any) {
    console.log(data.token);
    this.Auth.setAuthToken(data.token, this.form.rememberMe); // Pass rememberMe to setAuthToken
    this.router.navigateByUrl('/dashboard');
  }

  handleError(error: any) {
    this.error = error.error.error;
  }
}
