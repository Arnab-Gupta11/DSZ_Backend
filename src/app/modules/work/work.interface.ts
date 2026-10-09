import { Types } from 'mongoose';
export interface IProjectResult { value: string; label: string; }
export interface IProjectImage { src: string; alt: string; publicId?: string; }
export interface IWork {
  _id: Types.ObjectId;
  slug: string;
  title: string;
  client: string;
  industry: string;
  services: string[];
  service: Types.ObjectId;
  result: string;
  year: string;
  heroImages: IProjectImage[];
  summary: string;
  challenge: string;
  strategy: string;
  execution: string;
  executionPoints: string[];
  results: IProjectResult[];
  gallery: IProjectImage[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  isFeatured?: boolean;
  order: number;
  seo: { metaTitle?: string; metaDescription?: string; ogImage?: string; canonicalUrl?: string; noIndex: boolean; };
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
