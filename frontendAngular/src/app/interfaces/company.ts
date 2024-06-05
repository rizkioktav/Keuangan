// company.interface.ts
export interface Company {
  id: number;
  company_name: string;
  company_address: string;
  company_phone: string;
  company_email: string;
  owner: Owner;
}

export interface Owner {
  id: number;
  username: string;
  no_hp: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}
