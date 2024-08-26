import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Company, InfoDashboard } from '../../interfaces/dashboard';

@Component({
  selector: 'app-beranda',
  templateUrl: './beranda.component.html',
  styleUrls: ['./beranda.component.css'],
})
export class BerandaComponent implements OnInit {
  companiesWithOwners: Company[] = [];
  dashboardStat: InfoDashboard | null = null;
  getCompany: Company | null = null;
  hoveredCardJoin: boolean = false;
  showOverlay: boolean = false;
  selectedRole: string = '';
  searchText: string = '';

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.backendService.getAllCompaniesWithOwners().subscribe((response: any) => {
      if (response.success) {
        this.companiesWithOwners = response.companies;
      } else {
        console.error('Failed to fetch companies data');
      }
    });

    this.backendService.getDashboardStat().subscribe((response: any) => {
      if (response.success) {
        this.dashboardStat = response.data;
      } else {
        console.error('Failed to fetch dashboard data');
      }
    });
  }

  joinCompany(company: Company): void {
    this.getCompany = company;
  }

  hideHoverJoin(): void {
    this.hoveredCardJoin = false;
    this.showOverlay = false;
  }

  submitForm(): void {
    if (this.getCompany && this.selectedRole) {
      const requestData = {
        id_company: this.getCompany.id,
        id_role: this.selectedRole
      };

      this.backendService.joinCompany(requestData).subscribe((response: any) => {
        if (response.success) {
          console.log('Joined company successfully:', response.message);
          this.hideHoverJoin();
        } else {
          console.error('Failed to join company:', response.message);
        }
      }, error => {
        console.error('Error joining company:', error);
      });
    } else {
      console.error('Company or role is not selected');
    }
  } 
}
