import { Schema, model } from 'mongoose';
import { IWork } from './work.interface.js';
const workSchema = new Schema<IWork>({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  client: { type: String, required: true },
  industry: { type: String, required: true },
  services: [{ type: String }],
  service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  result: { type: String, required: true },
  year: { type: String, required: true },
  heroImages: [{ src: { type: String, required: true }, alt: { type: String, required: true }, publicId: { type: String } }],
  summary: { type: String, required: true },
  challenge: { type: String, required: true },
  strategy: { type: String, required: true },
  execution: { type: String, required: true },
  executionPoints: [{ type: String }],
  results: [{ value: String, label: String }],
  gallery: [{ src: String, alt: String, publicId: String }],
  status: { type: String, enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'], default: 'DRAFT' },
  order: { type: Number, default: Date.now },
  seo: { metaTitle: String, metaDescription: String, ogImage: String, canonicalUrl: String, noIndex: { type: Boolean, default: false } },
  publishedAt: { type: Date }
}, { timestamps: true });
export const Work = model<IWork>('Work', workSchema);
