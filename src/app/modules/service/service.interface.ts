import { Types } from 'mongoose';
export interface IService {
  _id: Types.ObjectId;
  slug: string;
  number: string;
  title: string;
  category: 'Branding' | 'Marketing' | 'Design' | 'Video' | 'Web/App' | 'Automation';
  short: string;
  description: string;
  whatWeDo: string[];
  deliverables: string[];
  whoFor: string;
  iconName: string;
  visual: 'brand' | 'marketing' | 'design' | 'video' | 'web' | 'automation';
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  order: number;
  seo: { metaTitle?: string; metaDescription?: string; noIndex: boolean; };
  createdAt: Date;
  updatedAt: Date;
}