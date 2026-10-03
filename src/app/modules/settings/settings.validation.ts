import { z } from 'zod';

const socialLinkSchema = z.object({
  key: z.enum(['instagram', 'facebook', 'linkedin', 'x', 'youtube']),
  label: z.string().min(1).max(50),
  href: z.string().url().or(z.literal('#')),
});

const settingsBodySchema = z.object({
  siteName: z.string().min(1).max(100).optional(),
  tagline: z.string().max(500).optional(),
  email: z.string().email().optional(),
  phone: z.string().max(30).optional(),
  whatsappNumber: z.string().max(30).optional(),
  whatsappUrl: z.string().url().optional(),
  addressLine: z.string().max(200).optional(),
  city: z.string().max(100).optional(),
  logoUrl: z.string().url().optional().or(z.literal('')),
  ogImage: z.string().url().optional().or(z.literal('')),
  socialLinks: z.array(socialLinkSchema).max(10).optional(),
  seo: z.object({
    defaultTitle: z.string().max(70).optional(),
    defaultDescription: z.string().max(160).optional(),
    defaultOgImage: z.string().url().optional().or(z.literal('')),
  }).optional(),
});

export const SettingsValidation = {
  updateSchema: z.object({
    body: settingsBodySchema,
  }),
};