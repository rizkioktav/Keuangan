import { Component, OnInit, Renderer2} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../assets/css/soft-ui-dashboard.css']
})
export class AppComponent implements OnInit {
  public loggedIn: boolean = false;
  title = 'frontendAngular';
  showNavbar = true;
  sidenavVisible$ = this.navbarService.sidenavVisible$;
  // showConfigurator: boolean = false;

  constructor(private router: Router, private Auth:AuthService, private navbarService:NavbarService, private renderer: Renderer2) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !(event.url === '/' || event.url === '/login' || event.url === '/signup');
      }
    });
  }
  ngOnInit(): void {
    this.Auth.authStatus.subscribe (
      value=>{
        this.loggedIn = value;
      }
    )
    this.loadScripts();
    // this.navbarService.toggleConfiguratorEvent.subscribe(() => {
    //   this.toggleConfigurator();
    // });
  }
  hideSidenav() {
    this.navbarService.hideSidenav();
  }
  // toggleConfigurator() {
  //   console.log(this.showConfigurator)
  //   this.showConfigurator = !this.showConfigurator; //dari emitter di navbar service
  // }
  loadScripts() {
    const scripts = [
      'assets/js/core/popper.min.js',
      'assets/js/core/bootstrap.min.js',
      'assets/js/plugins/perfect-scrollbar.min.js',
      'assets/js/plugins/smooth-scrollbar.min.js',
      'assets/js/plugins/chartjs.min.js',
      'assets/js/soft-ui-dashboard.min.js'
    ];

    scripts.forEach(script => {
      const scriptElement = this.renderer.createElement('script');
      scriptElement.src = script;
      scriptElement.type = 'text/javascript';
      scriptElement.async = true;
      scriptElement.defer = true;
      this.renderer.appendChild(document.body, scriptElement);
    });
  }
}
