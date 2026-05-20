import api from './api';
import type { Employee, EmployeeInput, PaginatedResponse } from '../types';

export async function getEmployees(page = 1, limit = 10): Promise<PaginatedResponse<Employee>> {
  const response = await api.get<PaginatedResponse<Employee>>('/admin/employees', {
    params: { page, limit },
  });
  return response.data;
}

export async function createEmployee(data: EmployeeInput): Promise<Employee> {
  const response = await api.post<Employee>('/admin/employees', data);
  return response.data;
}

export async function updateEmployee(id: number, data: Partial<EmployeeInput>): Promise<Employee> {
  const response = await api.put<Employee>(`/admin/employees/${id}`, data);
  return response.data;
}

export async function deleteEmployee(id: number): Promise<void> {
  await api.delete(`/admin/employees/${id}`);
}
