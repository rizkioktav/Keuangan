import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile, CompanyUser, Company, Member } from '../../interfaces/profile';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  showCompanyList = true;
  showCompanyProfile = false;
  showAddCompanyForm = false;
  showEditProfileUser = false;
  showProfileUser = true;
  showEditCompanyProfile = false;
  hoveredCompany: CompanyUser | null = null;
  showOverlay = false;

  companyUser: CompanyUser[] = [];
  profileCompany: Company | null = null;
  profileUser: Profile | null = null;
  companyMember: Member[] = [];

  // Pagination for members in the overlay
  paginatedMembers: Member[] = [];
  pageSizeOptions = [5, 10, 20];
  memberPageSize = 5;
  memberCurrentPage = 0;
  memberTotalPages = 0;

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
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

    this.http.get<any>(`${this.apiUrl}/user/companies`)
      .subscribe((response: any) => {
        if (response.success) {
          this.companyUser = response.companies;
          console.log(this.companyUser);
        } else {
          console.error('Failed to fetch data');
        }
      });
  }

  updateProfileUser() {
    if (this.profileUser) {
      this.http.put(`${this.apiUrl}/user/profile/update`, this.profileUser)
      .subscribe((response: any) => {
        if (response.success) {
          this.profileUser = response.profile;
          console.log('Profile updated successfully:', response.profile);
          this.showProfileUserCard();
        } else {
          console.error('Failed to update profile');
        }
      }, error => {
        console.error('Error updating profile:', error);
      });
    }
  }

  updateProfileCompany() {
    if (this.profileCompany) {
      this.http.put(`${this.apiUrl}/api/company/edit`, this.profileCompany)
      .subscribe((response: any) => {
        if (response.success) {
          this.profileCompany = response.company;
          console.log('Profile company updated successfully:', response.company);
          if (this.profileCompany) {
            this.showCompanyProfileCard(this.profileCompany);
          } else {
            console.error('Updated profile company is null');
          }
        } else {
          console.error('Failed to update profile company');
        }
      }, error => {
        console.error('Error updating profile company:', error);
      });
    } else {
      console.error('profileCompany is null');
    }
  }

  showMembers(company: CompanyUser) {
     this.hoveredCompany = company;
    this.showOverlay = true;
    console.log('Selected Company:', company);

    this.http.get<any>(`${this.apiUrl}/company/${company.company.id}/members`)
      .subscribe((response: any) => {
        if (response.success) {
          this.companyMember = response.members;
          console.log('Company Members:', this.companyMember);
          this.updateMemberPagination();
        } else {
          console.error('Failed to fetch members data');
        }
      }, error => {
        console.error('Error fetching members data:', error);
      });
  }

  hideMembers() {
    this.hoveredCompany = null;
    this.showOverlay = false;
  }

  onAnimationEnd(event: AnimationEvent) {
    if (event.animationName === 'fadeOut') {
      this.hoveredCompany = null;
    }
  }

  updateMemberPagination() {
    if (this.companyMember.length) {
      this.memberTotalPages = Math.ceil(this.companyMember.length / this.memberPageSize);
      this.paginateMembers();
    }
  }

  paginateMembers() {
    const start = this.memberCurrentPage * this.memberPageSize;
    const end = start + this.memberPageSize;
    this.paginatedMembers = this.companyMember.slice(start, end);
  }

  nextMemberPage() {
    if (this.memberCurrentPage < this.memberTotalPages - 1) {
      this.memberCurrentPage++;
      this.paginateMembers();
    }
  }

  prevMemberPage() {
    if (this.memberCurrentPage > 0) {
      this.memberCurrentPage--;
      this.paginateMembers();
    }
  }

  toggleAddCompanyForm() {
    this.showAddCompanyForm = !this.showAddCompanyForm;
  }

  cancelAddCompany() {
    this.showAddCompanyForm = false;
  }

  addCompany() {
    this.showAddCompanyForm = false;
  }

  showCompanyProfileCard(company: Company): void {
    this.profileCompany = company;
    this.showCompanyList = false;
    this.showCompanyProfile = true;
    this.showEditCompanyProfile = false;
  }

  showCompanyProfileCardBefore(): void {
    this.showCompanyList = false;
    this.showCompanyProfile = true;
    this.showEditCompanyProfile = false;
  }

  showCompanyListCard() {
    this.showCompanyList = true;
    this.showCompanyProfile = false;
    this.showEditCompanyProfile = false;
  }

  showEditCompanyProfileCard() {
    this.showEditCompanyProfile = true;
    this.showCompanyList = false;
    this.showCompanyProfile = false;
  }
 
  showEditProfileUserCard() {
    this.showEditProfileUser = true;
    this.showProfileUser = false;
  }

  showProfileUserCard() {
    this.showEditProfileUser = false;
    this.showProfileUser = true;
  }
}