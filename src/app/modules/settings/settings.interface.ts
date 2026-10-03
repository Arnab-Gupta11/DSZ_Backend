import { Types } from 'mongoose';
export interface ISettings {
  _id: Types.ObjectId;
  siteName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  whatsappUrl: string;
  addressLine: string;
  city: string;
  logoUrl?: string;
  ogImage?: string;
  socialLinks: { key: 'instagram'|'facebook'|'linkedin'|'x'|'youtube'; label: string; href: string; }[];
  seo: { defaultTitle: string; defaultDescription: string; defaultOgImage?: string; };
  createdAt: Date;
  updatedAt: Date;
}