import { z } from 'zod';
export const AuthValidation = {
  loginZodSchema: z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string().min(6),
    }),
  }),
};