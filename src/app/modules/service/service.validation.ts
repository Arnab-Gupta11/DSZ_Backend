import { z } from 'zod';

const seoSchema = z.object({
  metaTitle: z.string().max(70).optional(),
  metaDescription: z.string().max(160).optional(),
  noIndex: z.boolean().optional().default(false),
}).optional();

const serviceBodySchema = z.object({
  slug: z.string().min(1).max(100).optional(), // auto-generated if omitted
  number: z.string().regex(/^\d{2}$/, 'Must be a 2-digit string like "01"'),
  title: z.string().min(1).max(100),
  category: z.enum(['Branding', 'Marketing', 'Design', 'Video', 'Web/App', 'Automation']),
  short: z.string().min(1).max(200),
  description: z.string().min(10),
  whatWeDo: z.array(z.string().min(1)).min(1),
  deliverables: z.array(z.string().min(1)).min(1),
  whoFor: z.string().min(1),
  iconName: z.string().min(1).max(50), // LucideIcon name as string
  visual: z.enum(['brand', 'marketing', 'design', 'video', 'web', 'automation']),
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