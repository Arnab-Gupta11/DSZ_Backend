import { z } from 'zod';

const seoSchema = z.object({
  metaTitle: z.string().max(70).optional(),
  metaDescription: z.string().max(160).optional(),
  ogImage: z.string().url().optional(),
  canonicalUrl: z.string().url().optional(),
  noIndex: z.boolean().optional().default(false),
}).optional();

const projectResultSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});

const galleryImageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  publicId: z.string().min(1),
});

const workBodySchema = z.object({
  title: z.string().min(1).max(200),
  client: z.string().min(1).max(200),
  industry: z.string().min(1).max(100),
  services: z.array(z.string().min(1)).min(1),
  categories: z.array(
    z.enum(['Branding', 'Marketing', 'Design', 'Video', 'Web/App', 'Automation'])
  ).min(1),
  result: z.string().min(1).max(200),
  year: z.string().regex(/^\d{4}$/, 'Year must be a 4-digit number'),
  image: z.string().min(1),
  imageAlt: z.string().min(1).max(300),
  imagePulicId: z.string().min(1),
  summary: z.string().min(10),
  challenge: z.string().min(10),
  strategy: z.string().min(10),
  execution: z.string().min(10),
  executionPoints: z.array(z.string().min(1)).min(1),
  results: z.array(projectResultSchema).min(1),
  gallery: z.array(galleryImageSchema).max(10),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional().default('DRAFT'),
  order: z.number().int().optional(),
  seo: seoSchema,
});

export const WorkValidation = {
  createSchema: z.object({
    body: workBodySchema,
  }),
  updateSchema: z.object({
    body: workBodySchema.partial(),
  }),
  reorderSchema: z.object({
    body: z.object({
      order: z.number().int().min(0),
    }),
  }),
};