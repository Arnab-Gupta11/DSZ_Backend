import { z } from 'zod';

const seoSchema = z.object({
  metaTitle: z.string().max(70).optional(),
  metaDescription: z.string().max(160).optional(),
  noIndex: z.boolean().optional().default(false),
}).optional();

const serviceBodySchema = z.object({
  slug: z.string().min(1).max(100).optional(), // auto-generated if omitted
  title: z.string().min(1).max(100),
  tag: z.string().min(1).max(100),
  short: z.string().min(1).max(200),
  description: z.string().min(10),
  whatWeDo: z.array(z.string().min(1)).min(1),
  deliverables: z.array(z.string().min(1)).min(1),
  whoFor: z.string().min(1),
  image: z.string().url('Must be a valid URL'),
  imageAlt: z.string().optional(),
  imagePublicId: z.string().optional(),
  isFeatured: z.boolean().optional().default(false),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional().default('DRAFT'),
  order: z.number().int().min(1).optional(),
  seo: seoSchema,
});

export const ServiceValidation = {
  createSchema: z.object({
    body: serviceBodySchema,
  }),
  updateSchema: z.object({
    body: serviceBodySchema.partial(),
  }),
};
