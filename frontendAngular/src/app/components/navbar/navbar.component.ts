import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean = false;
  public pageTitle: string = '';
  showConfigurator: boolean = false;
  constructor(private Auth:AuthService, private router:Router, private Token:TokenService, private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.Auth.authStatus.subscribe (
      value=>{
        this.loggedIn = value;
      }
    )
    this.navbarService.pageTitle$.subscribe(title => {
      this.pageTitle = title;
    });
  }
  logout(event:MouseEvent){
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }
  toggleSidenav() {
    this.navbarService.toggleSidenav();
  }
  // toggleConfigurator() {
  //   console.log("cek boolean : ")
  //   this.navbarService.toggleConfiguratorEvent.emit();
  // }
  toggleConfigurator() {
    console.log(this.showConfigurator)
    this.showConfigurator = !this.showConfigurator; //dari emitter di navbar service
  }
}
