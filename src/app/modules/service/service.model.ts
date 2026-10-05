import { Schema, model } from 'mongoose';
import { IService } from './service.interface.js';

const serviceSchema = new Schema<IService>({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  tag: { type: String, required: true },
  short: { type: String, required: true },
  description: { type: String, required: true },
  whatWeDo: [{ type: String }],
  deliverables: [{ type: String }],
  whoFor: { type: String, required: true },
  image: { type: String, required: true },
  imageAlt: { type: String },
  imagePublicId: { type: String },
  status: { type: String, enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'], default: 'DRAFT' },
  order: { type: Number, default: Date.now },
  seo: { metaTitle: String, metaDescription: String, noIndex: { type: Boolean, default: false } }
}, { timestamps: true });

export const Service = model<IService>('Service', serviceSchema);
