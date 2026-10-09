import { z } from 'zod';

const seoSchema = z.object({
  metaTitle: z.string().max(70).optional(),
  metaDescription: z.string().max(160).optional(),
  ogImage: z.string().url().optional(),
  canonicalUrl: z.string().url().optional(),
  noIndex: z.boolean().optional().default(false),
}).optional();

// Discriminated union matching the ArticleBlock type exactly
const articleBlockSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('p'), text: z.string().min(1) }),
  z.object({ type: z.literal('h2'), text: z.string().min(1) }),
  z.object({ type: z.literal('quote'), text: z.string().min(1) }),
  z.object({ type: z.literal('list'), items: z.array(z.string().min(1)).min(1) }),
  z.object({ type: z.literal('html'), text: z.string().min(1) }),
]);

const articleBodySchema = z.object({
  title: z.string().min(1).max(300),
  category: z.string().min(1),
  excerpt: z.string().min(10).max(500),
  image: z.string().min(1),
  imageAlt: z.string().min(1).max(300),
  imagePublicId: z.string().optional(),
  author: z.string().min(1).max(100).default('DSZ Team'),
  body: z.array(articleBlockSchema).min(1),
  readTime: z.string().optional(), // auto-calculated if omitted
  isFeatured: z.boolean().optional().default(false),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional().default('DRAFT'),
  order: z.number().int().optional(),
  seo: seoSchema,
});

export const ArticleValidation = {
  createSchema: z.object({
    body: articleBodySchema,
  }),
  updateSchema: z.object({
    body: articleBodySchema.partial(),
  }),
};