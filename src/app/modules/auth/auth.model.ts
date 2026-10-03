import { Schema, model } from 'mongoose';
import { IAdmin } from './auth.interface.js';
const adminSchema = new Schema<IAdmin>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['ADMIN'], default: 'ADMIN' },
  isActive: { type: Boolean, default: true },
  lastLoginAt: { type: Date }
}, { timestamps: true });
export const Admin = model<IAdmin>('Admin', adminSchema);