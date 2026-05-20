import api from './api';
import type { LoginResponse, User } from '../types';

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/auth/login', { email, password });
  return response.data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export function getStoredUser(): User | null {
  const stored = localStorage.getItem('user');
  if (stored) {
    try {
      return JSON.parse(stored) as User;
    } catch {
      return null;
    }
  }
  return null;
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}
