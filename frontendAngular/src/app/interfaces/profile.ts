export interface Profile{
  id: number;
  id_user: number;
  username: string;
  nama: string;
  no_hp: number;
  email: string;
  alamat: string;
  tanggal_lahir: Date;
  gender: string;
}

export interface CompanyUser{
  company: Company;
  user: User;
  total_members: number;
}
export interface Company{
  id: number;
  c_nama: string;
  c_alamat: string;
  c_no_hp: string;
  c_email: string;
  role: Role;
}
export interface Role{
  id: number;
  role: string;
}
export interface User{
  id: number;
  no_hp: number;
  email: string;
}