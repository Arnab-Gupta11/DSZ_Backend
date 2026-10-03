import { z } from 'zod';
export const ContactValidation = {
  createSchema: z.object({
    body: z.object({
      name: z.string().min(1),
      contact: z.string().regex(/^\+?[\d\s-]{7,}|[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/),
      need: z.string().min(1),
      message: z.string().min(10)
    })
  })
};