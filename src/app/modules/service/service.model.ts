import { Schema, model } from 'mongoose';
import { IService } from './service.interface.js';
const serviceSchema = new Schema<IService>({
  slug: { type: String, required: true, unique: true },
  number: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, enum: ['Branding', 'Marketing', 'Design', 'Video', 'Web/App', 'Automation'], required: true },
  short: { type: String, required: true },
  description: { type: String, required: true },
  whatWeDo: [{ type: String }],
  deliverables: [{ type: String }],
  whoFor: { type: String, required: true },
  iconName: { type: String, required: true },
  visual: { type: String, enum: ['brand', 'marketing', 'design', 'video', 'web', 'automation'], required: true },
  status: { type: String, enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'], default: 'DRAFT' },
  order: { type: Number, default: Date.now },
  seo: { metaTitle: String, metaDescription: String, noIndex: { type: Boolean, default: false } }
}, { timestamps: true });
export const Service = model<IService>('Service', serviceSchema);