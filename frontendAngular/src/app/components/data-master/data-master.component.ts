import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-data-master',
  templateUrl: './data-master.component.html',
  styleUrls: ['./data-master.component.css']
})
export class DataMasterComponent implements OnInit {
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
