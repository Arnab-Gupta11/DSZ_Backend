import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { AuthService } from './auth.service.js';
import { config } from '../../config/env.js';

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  res.cookie('token', result.token, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  sendResponse(res, { statusCode: 200, success: true, message: 'Logged in successfully', data: result.admin });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie('token');
  sendResponse(res, { statusCode: 200, success: true, message: 'Logged out successfully' });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.getMe((req as any).user._id.toString());
  sendResponse(res, { statusCode: 200, success: true, message: 'Admin fetched successfully', data: result });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.updateProfile((req as any).user._id.toString(), req.body);
  sendResponse(res, { statusCode: 200, success: true, message: 'Profile updated successfully', data: result });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  await AuthService.changePassword((req as any).user._id.toString(), req.body);
  sendResponse(res, { statusCode: 200, success: true, message: 'Password changed successfully' });
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  await AuthService.forgetPassword(req.body.email);
  sendResponse(res, { statusCode: 200, success: true, message: 'Password reset OTP sent to your email' });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await AuthService.resetPassword(req.body);
  sendResponse(res, { statusCode: 200, success: true, message: 'Password reset successfully' });
});

export const AuthController = { login, logout, getMe, updateProfile, changePassword, forgetPassword, resetPassword };