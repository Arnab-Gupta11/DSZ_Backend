import { Schema, model } from 'mongoose';
import { ITestimonial } from './testimonial.interface.js';
const testimonialSchema = new Schema<ITestimonial>({
  quote: { type: String, required: true },
  name: { type: String, required: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  initials: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: Date.now }
}, { timestamps: true });
export const Testimonial = model<ITestimonial>('Testimonial', testimonialSchema);