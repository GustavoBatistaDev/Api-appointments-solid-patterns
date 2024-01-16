export interface User {
  id: number;
  first_name: string;
  last_name: string;
  cpf: string;
  email: string;
  active: boolean;
  photo: string;
  rg: string;
  dateOfBirth: string;
  phone: string;
  isAdmin: boolean;
  password: string;
  created_at: Date;
}

