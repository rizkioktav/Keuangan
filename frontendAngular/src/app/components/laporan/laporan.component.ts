import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-laporan',
  templateUrl: './laporan.component.html',
  styleUrls: ['./laporan.component.css']
})
export class LaporanComponent implements OnInit {
  public loggedIn: boolean = false;

  constructor(private Auth: AuthService) {}

  ngOnInit(): void {
    this.Auth.authStatus.subscribe(
      value => {
        this.loggedIn = value;
      }
    );
  }
}
