import { z } from 'zod';
export const ContactValidation = {
  createSchema: z.object({
    body: z.object({
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string().regex(/^\+?[\d\s-]{7,}$/),
      need: z.string().min(1),
      serviceId: z.string().optional(),
      message: z.string().min(10)
    })
  })
};