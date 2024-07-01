import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../services/token.service';
import { NavbarService } from '../../services/navbar.service';
import { Profile } from '../../interfaces/profile';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean = false;
  public pageTitle: string = '';
  public pageSubtitle: string = '';
  showConfigurator: boolean = false;
  profileUser: Profile | null = null;

  private apiUrl = environment.apiUrl;
  
  constructor(private Auth:AuthService, private router:Router, private Token:TokenService, private navbarService: NavbarService, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
    this.Auth.authStatus.subscribe (
      value=>{
        this.loggedIn = value;
      }
    )
    this.navbarService.pageTitle$.subscribe(title => {
      this.pageTitle = title;
    });

    this.navbarService.pageSubtitle$.subscribe(subtitle => {
      this.pageSubtitle = subtitle;
    });  
  }
  
  private fetchData(): void {
    this.http.get<any>(`${this.apiUrl}/user/profile`)
    .subscribe((response: any) => {
      if (response.success) {
        this.profileUser = response.profile;
        console.log(this.profileUser);
      } else {
        console.error('Failed to fetch data');
      }
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
