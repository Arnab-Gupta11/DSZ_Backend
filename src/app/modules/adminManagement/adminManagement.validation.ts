import { z } from 'zod';

export const AdminManagementValidation = {
  createAdminZodSchema: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email address'),
    }),
  }),
  blockAdminZodSchema: z.object({
    body: z.object({
      isActive: z.boolean(),
    }),
  }),
};

