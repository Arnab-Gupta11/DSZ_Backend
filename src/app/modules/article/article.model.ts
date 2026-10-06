import { Schema, model } from 'mongoose';
import { IArticle } from './article.interface.js';
const articleSchema = new Schema<IArticle>({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, enum: ['Marketing Tips', 'AI Tools', 'Case Studies', 'DSZ News'], required: true },
  excerpt: { type: String, required: true },
  image: { type: String, required: true },
  imageAlt: { type: String, required: true },
  imagePublicId: { type: String },
  author: { type: String, required: true },
  body: [{ type: Schema.Types.Mixed }],
  readTime: { type: String, required: true },
  status: { type: String, enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'], default: 'DRAFT' },
  order: { type: Number, default: Date.now },
  seo: { metaTitle: String, metaDescription: String, ogImage: String, canonicalUrl: String, noIndex: { type: Boolean, default: false } },
  publishedAt: { type: Date }
}, { timestamps: true });
articleSchema.index({ title: 'text', excerpt: 'text' });
export const Article = model<IArticle>('Article', articleSchema);