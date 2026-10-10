import { z } from 'zod';

const createSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    openings: z.number().min(1, 'At least 1 opening is required'),
    type: z.enum(['Full-time', 'Part-time', 'Internship', 'Contract']),
    location: z.enum(['On-site', 'Remote', 'Hybrid']),
    city: z.string().min(1, 'City is required'),
    experience: z.string().min(1, 'Experience is required'),
    salary: z.string().optional(),
    postedAt: z.string().or(z.date()).optional(),
    deadline: z.string().or(z.date()),
    short: z.string().min(1, 'Short description is required'),
    overview: z.string().min(1, 'Overview is required'),
    responsibilities: z.array(z.string()).default([]),
    requirements: z.array(z.string()).default([]),
    niceToHave: z.array(z.string()).default([]),
    tools: z.array(z.string()).default([]),
    benefits: z.array(z.string()).default([]),
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
    seo: z
      .object({
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        noIndex: z.boolean().optional(),
      })
      .optional(),
  }),
});

const updateSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    openings: z.number().min(1).optional(),
    type: z.enum(['Full-time', 'Part-time', 'Internship', 'Contract']).optional(),
    location: z.enum(['On-site', 'Remote', 'Hybrid']).optional(),
    city: z.string().optional(),
    experience: z.string().optional(),
    salary: z.string().optional(),
    postedAt: z.string().or(z.date()).optional(),
    deadline: z.string().or(z.date()).optional(),
    short: z.string().optional(),
    overview: z.string().optional(),
    responsibilities: z.array(z.string()).optional(),
    requirements: z.array(z.string()).optional(),
    niceToHave: z.array(z.string()).optional(),
    tools: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
    seo: z
      .object({
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        noIndex: z.boolean().optional(),
      })
      .optional(),
  }),
});

export const JobValidation = {
  createSchema,
  updateSchema,
};