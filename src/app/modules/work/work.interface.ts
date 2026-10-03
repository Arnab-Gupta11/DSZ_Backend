import { Types } from 'mongoose';
export interface IProjectResult { value: string; label: string; }
export interface IProjectImage { src: string; alt: string; publicId: string; }
export interface IWork {
  _id: Types.ObjectId;
  slug: string;
  title: string;
  client: string;
  industry: string;
  services: string[];
  categories: ('Branding'|'Marketing'|'Design'|'Video'|'Web/App'|'Automation')[];
  result: string;
  year: string;
  image: string;
  imageAlt: string;
  imagePulicId: string;
  summary: string;
  challenge: string;
  strategy: string;
  execution: string;
  executionPoints: string[];
  results: IProjectResult[];
  gallery: IProjectImage[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  order: number;
  seo: { metaTitle?: string; metaDescription?: string; ogImage?: string; canonicalUrl?: string; noIndex: boolean; };
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}