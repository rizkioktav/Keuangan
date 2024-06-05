import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  public loggedIn: boolean = false;
  constructor(public Auth: AuthService, private router:Router){}

  ngOnInit():void{
    this.Auth.authStatus.subscribe (
      value=>{
        this.loggedIn = value;
      }
    )
  }
}
