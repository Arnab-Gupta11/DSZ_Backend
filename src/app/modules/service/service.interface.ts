import { Types } from 'mongoose';
export interface IService {
  _id: Types.ObjectId;
  slug: string;
  title: string;
  tag: string;
  short: string;
  description: string;
  whatWeDo: string[];
  deliverables: string[];
  whoFor: string;
  image: string;
  imageAlt?: string;
  imagePublicId?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  isFeatured?: boolean;
  order: number;
  seo: { metaTitle?: string; metaDescription?: string; noIndex: boolean; };
  createdAt: Date;
  updatedAt: Date;
}
