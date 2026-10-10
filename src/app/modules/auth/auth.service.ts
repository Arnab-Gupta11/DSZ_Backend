import argon2 from 'argon2';
import { Admin } from './auth.model.js';
import { AppError } from '../../errors/AppError.js';
import { createToken } from './auth.utils.js';
import { sendPasswordResetOTP } from '../../utils/email/email.service.js';

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

const updateProfile = async (id: string, payload: { name: string }) => {
  const admin = await Admin.findByIdAndUpdate(id, { name: payload.name }, { new: true, runValidators: true }).select('-passwordHash');
  if (!admin) throw new AppError(404, 'Admin not found', 'AUTH_UNAUTHORIZED');
  return admin;
};

const changePassword = async (id: string, payload: any) => {
  const admin = await Admin.findById(id);
  if (!admin) throw new AppError(404, 'Admin not found', 'AUTH_UNAUTHORIZED');

  const isMatch = await argon2.verify(admin.passwordHash, payload.oldPassword);
  if (!isMatch) throw new AppError(400, 'Incorrect old password', 'AUTH_INVALID_PASSWORD');

  const newHash = await argon2.hash(payload.newPassword);
  admin.passwordHash = newHash;
  await admin.save();
  return null;
};

const forgetPassword = async (email: string) => {
  const admin = await Admin.findOne({ email });
  if (!admin || !admin.isActive) throw new AppError(404, 'No active account found with that email address', 'NOT_FOUND');

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  admin.resetPasswordOTP = otp;
  admin.resetPasswordExpires = resetPasswordExpires;
  await admin.save();

  await sendPasswordResetOTP({ name: admin.name, email: admin.email, otp });
  return null;
};

const resetPassword = async (payload: any) => {
  const admin = await Admin.findOne({ 
    email: payload.email,
    resetPasswordOTP: payload.otp,
    resetPasswordExpires: { $gt: new Date() }
  });

  if (!admin || !admin.isActive) {
    throw new AppError(400, 'Invalid or expired OTP', 'BAD_REQUEST');
  }

  const newHash = await argon2.hash(payload.newPassword);
  admin.passwordHash = newHash;
  admin.resetPasswordOTP = undefined;
  admin.resetPasswordExpires = undefined;
  await admin.save();
  
  return null;
};

export const AuthService = { login, getMe, updateProfile, changePassword, forgetPassword, resetPassword };