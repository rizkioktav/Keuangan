import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../../interfaces/company';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  companiesWithOwners: Company[] = [];

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
  }
}
