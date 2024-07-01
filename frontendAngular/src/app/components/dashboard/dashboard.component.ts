import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Company, InfoDashboard } from '../../interfaces/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  companiesWithOwners: Company[] = [];
  dashboardStat: InfoDashboard | null = null;
  hoveredCompany: Company | null = null;
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

  openHoverJoin(company: Company): void {
    this.hoveredCompany = company;
    this.hoveredCardJoin = true;
    this.showOverlay = true;
  }

  hideHoverJoin(): void {
    this.hoveredCardJoin = false;
    this.showOverlay = false;
  }

  onAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'fadeOut') {
      this.hoveredCompany = null;
    }
  }

  submitForm(): void {
    if (this.hoveredCompany && this.selectedRole) {
      const requestData = {
        id_company: this.hoveredCompany.id,
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
