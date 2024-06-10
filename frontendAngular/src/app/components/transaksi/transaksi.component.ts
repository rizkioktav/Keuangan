import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.component.html',
  styleUrls: ['./transaksi.component.css']
})
export class TransaksiComponent implements OnInit {
  public loggedIn: boolean = false;
  constructor (private Auth:AuthService, private router:Router){}

  ngOnInit(): void {
    this.Auth.authStatus.subscribe (
      value=>{
        this.loggedIn = value;
      }
    )
    this.router.events.subscribe(event => {
      console.log(event);
    });
  }
}
