import { Document } from 'mongoose';

export interface User extends Document {
  fullName?: string;
  email: string;
  password: string;
  roles?: string;
  phone?: String;
  address?: String;
  gender?: boolean;
  block?: boolean;
  permission?: [string];
  verified?: boolean;
  created_at?: string;
  updated_at?: string;
}

export enum UserRoles {
  ADMIN = 'admin',
  MENTOR = 'mentor',
  USER = 'user',
}
