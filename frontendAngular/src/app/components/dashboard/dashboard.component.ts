import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company, InfoDashboard } from '../../interfaces/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  companiesWithOwners: Company[] = [];
  dashboardStat: InfoDashboard | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.http.get<any>('http://127.0.0.1:8000/api/companies')
    .subscribe((response: any) => {
      if (response.success) {
        this.companiesWithOwners = response.companies;
        console.log(this.companiesWithOwners);
      } else {
        console.error('Failed to fetch data');
      }
    });
    this.http.get<any>('http://127.0.0.1:8000/api/dashboard-stat')
    .subscribe((response: any) => {
      if (response.success) {
        this.dashboardStat = response.data;
        console.log(this.dashboardStat);
      } else {
        console.error('Failed to fetch data');
      }
    });
  }
}
