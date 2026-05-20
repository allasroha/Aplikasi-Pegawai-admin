export interface User {
  id: number;
  nama: string;
  email: string;
  role: string;
}

export interface Employee {
  id: number;
  nik: string;
  nama: string;
  email: string;
  status_pengisian: string;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface EmployeeInput {
  nik: string;
  nama: string;
  email: string;
  password?: string;
}