import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  signup(data: any) {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getAllCompaniesWithOwners() {
    return this.http.get(`${this.apiUrl}/companies`);
  }

  getDashboardStat() {
    return this.http.get(`${this.apiUrl}/dashboard-stat`);
  }

  joinCompany(data: any) {
    return this.http.post(`${this.apiUrl}/company/join`, data);
  }
}
