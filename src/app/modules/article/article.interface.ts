import { Types } from 'mongoose';
export type ArticleBlock = { type: 'p'; text: string } | { type: 'h2'; text: string } | { type: 'quote'; text: string } | { type: 'list'; items: string[] };
export interface IArticle {
  _id: Types.ObjectId;
  slug: string;
  title: string;
  category: 'Marketing Tips' | 'AI Tools' | 'Case Studies' | 'DSZ News';
  excerpt: string;
  image: string;
  imageAlt: string;
  imagePublicId: string;
  author: string;
  body: ArticleBlock[];
  readTime: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  order: number;
  seo: { metaTitle?: string; metaDescription?: string; ogImage?: string; canonicalUrl?: string; noIndex: boolean; };
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}