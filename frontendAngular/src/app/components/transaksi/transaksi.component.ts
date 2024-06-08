import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.component.html',
  styleUrls: ['./transaksi.component.css']
})
export class TransaksiComponent implements OnInit {
  public loggedIn: boolean = false;
  constructor (private Auth:AuthService){}

  ngOnInit(): void {
    this.Auth.authStatus.subscribe (
      value=>{
        this.loggedIn = value;
      }
    )
  }
}
