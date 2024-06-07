import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private pageTitleSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public pageTitle$: Observable<string> = this.pageTitleSubject.asObservable();
  private pageSubtitleSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public pageSubtitle$: Observable<string> = this.pageSubtitleSubject.asObservable();

  private sidenavVisibleSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public sidenavVisible$: Observable<boolean> = this.sidenavVisibleSource.asObservable();
  public toggleConfiguratorEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.routerState.root),
      map(route => {
        let child = route.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data['title']) {
            return { title: child.snapshot.data['title'], subtitle: child.snapshot.data['subtitle'] || '' };
          } else {
            return { title: '', subtitle: '' };
          }
        }
        return { title: '', subtitle: '' };
      })
    ).subscribe(({ title, subtitle }) => {
      this.pageTitleSubject.next(title);
      this.pageSubtitleSubject.next(subtitle);
    });   
  }
  toggleSidenav() {
    console.log('Toggling sidenav visibility');
    this.sidenavVisibleSource.next(!this.sidenavVisibleSource.value);
  }

  showSidenav() {
    console.log('Showing sidenav');
    this.sidenavVisibleSource.next(true);
  }

  hideSidenav() {
    console.log('Hiding sidenav');
    this.sidenavVisibleSource.next(false);
  }
}
