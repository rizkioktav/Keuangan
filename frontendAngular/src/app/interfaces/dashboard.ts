export interface Company {
  id: number;
  c_nama: string;
  c_alamat: string;
  c_no_hp: string;
  c_email: string;
  owner: Owner;
  total_members: number;
}

export interface Owner {
  id: number;
  username: string;
  nama:string
  no_hp: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  profile: Profile;
}

export interface Profile {
  nama:string;
}

export interface InfoDashboard {
  total_users: number;
  total_companies: number;
  total_users_today: number;
}

export interface RoleUser{
id: number;
role:[    
  ['investor'],
  ['business owner'],
  ['komisaris'],
  ['direktur'],
  ['manager'],
  ['supervisor'],
  ['staff']]
}

