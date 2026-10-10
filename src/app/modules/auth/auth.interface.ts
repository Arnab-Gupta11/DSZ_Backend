import { Types } from 'mongoose';
export interface IAdmin {
  _id: Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
  isActive: boolean;
  lastLoginAt?: Date;
  resetPasswordOTP?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}