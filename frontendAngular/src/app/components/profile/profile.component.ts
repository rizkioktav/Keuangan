import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  showCompanyList: boolean = true;
  showCompanyProfile: boolean = false;
  showAddCompanyForm: boolean = false;
  showEditProfileUser: boolean = false;
  showProfileUser: boolean = true;
  showEditCompanyProfile: boolean = false;

  ngOnInit(): void {
    
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

  showCompanyProfileCard() {
    this.showCompanyList = false;
    this.showCompanyProfile = true;
    this.showEditCompanyProfile = false;
  }

  showCompanyListCard() {
    this.showCompanyList = true;
    this.showCompanyProfile = false;
    this.showEditCompanyProfile = false;
  }

  showEditCompanyProfileCard(){
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
