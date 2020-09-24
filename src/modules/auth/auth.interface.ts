import { Document } from 'mongoose';

export interface User extends Document {
  fullName?: string;
  email: string;
  password: string;
  roles?: string;
  phone?: String;
  address?: String;
  block?: boolean;
  permission?: [string];
  verified?: boolean;
}


export enum UserRoles {
  ADMIN = 'admin',
  MENTOR = 'mentor',
  USER = 'user',
}
