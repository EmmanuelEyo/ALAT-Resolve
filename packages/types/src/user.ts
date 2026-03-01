export type UserRole = 'USER' | 'AGENT' | 'ADMIN';

export interface WemaUser {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
  role: UserRole;
  accountNumber?: string;
  staffId?: string;
  isVerified: boolean;
  createdAt: Date;
}