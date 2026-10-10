import { z } from 'zod';
export const AuthValidation = {
  loginZodSchema: z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string().min(6),
    }),
  }),
  updateProfileZodSchema: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required'),
    }),
  }),
  changePasswordZodSchema: z.object({
    body: z.object({
      oldPassword: z.string().min(6, 'Old password must be at least 6 characters'),
      newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    }),
  }),
};