import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public loggedIn: boolean = false;
  showSubmenu: boolean = false;
  isTransaksiActive: boolean = false;

  constructor(public Auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.Auth.authStatus.subscribe(
      value => {
        this.loggedIn = value;
      }
    );

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkIfSubmenuActive(event.urlAfterRedirects);
      }
    });
  }

  checkIfSubmenuActive(url: string): void {
    const submenuPaths = ['pemasukan', 'pengeluaran', 'hutang', 'piutang', 'tanam-modal', 'tarik-modal', 'transfer-uang'];
    this.isTransaksiActive = url.includes('transaksi') || submenuPaths.some(path => url.includes(path));
  }
}
