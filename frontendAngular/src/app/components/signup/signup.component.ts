import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public loggedIn: boolean = false;
  public form = {
    no_hp: null,
    email: null,
    password: null,
    password_confirmation: null,
    terms: false
  };

  passwordVisible: boolean = false;
  passwordConfirmVisible: boolean = false;

  constructor(private backend: BackendService, private router: Router, private Auth: AuthService) {}

  public error: any = [];

  ngOnInit(): void {
    this.Auth.authStatus.subscribe(
      value => {
        this.loggedIn = value;
      }
    );
  }

  submitSignup(): void {
    console.log(this.form);
    this.backend.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  togglePasswordConfirmVisibility(): void {
    this.passwordConfirmVisible = !this.passwordConfirmVisible;
  }
  handleResponse(data: any): void {
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 3000);
  }

  handleError(error: any): void {
    this.error = error.error.error;
  }
}
