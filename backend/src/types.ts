export type UserRole = 'ADMIN' | 'MANAGER' | 'STUDENT' | 'COMPANY_GUARDIAN';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  company?: string;
  employeeLimit?: number;
  passwordHash: string;
}

export interface Employee {
  id: string;
  guardianId: string;
  email: string;
  name: string;
  phone?: string;
  status: 'active' | 'pending';
  inviteToken?: string;
  createdDate: string;
}
