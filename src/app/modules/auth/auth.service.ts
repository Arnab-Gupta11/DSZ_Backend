import argon2 from 'argon2';
import { Admin } from './auth.model.js';
import { AppError } from '../../errors/AppError.js';
import { createToken } from './auth.utils.js';

const login = async (payload: any) => {
  const admin = await Admin.findOne({ email: payload.email });
  if (!admin || !admin.isActive) throw new AppError(401, 'Invalid credentials', 'AUTH_INVALID_CREDENTIALS');
  
  const isMatch = await argon2.verify(admin.passwordHash, payload.password);
  if (!isMatch) throw new AppError(401, 'Invalid credentials', 'AUTH_INVALID_CREDENTIALS');
  
  admin.lastLoginAt = new Date();
  await admin.save();
  
  const token = createToken({ _id: admin._id.toString(), role: admin.role });
  return { admin: { _id: admin._id, name: admin.name, email: admin.email, role: admin.role }, token };
};

const getMe = async (id: string) => {
  const admin = await Admin.findById(id).select('-passwordHash');
  if (!admin) throw new AppError(404, 'Admin not found', 'AUTH_UNAUTHORIZED');
  return admin;
};

export const AuthService = { login, getMe };