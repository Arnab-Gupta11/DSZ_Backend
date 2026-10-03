import { z } from 'zod';

const testimonialBodySchema = z.object({
  quote: z.string().min(10).max(1000),
  name: z.string().min(1).max(100),
  company: z.string().min(1).max(100),
  role: z.string().min(1).max(100),
  initials: z.string().min(1).max(3),
  isActive: z.boolean().optional().default(true),
  order: z.number().int().min(0).optional(),
});

export const TestimonialValidation = {
  createSchema: z.object({
    body: testimonialBodySchema,
  }),
  updateSchema: z.object({
    body: testimonialBodySchema.partial(),
  }),
};