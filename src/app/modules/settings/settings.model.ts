import { Schema, model } from 'mongoose';
import { ISettings } from './settings.interface.js';
const settingsSchema = new Schema<ISettings>({
  siteName: { type: String, required: true },
  tagline: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  whatsappNumber: { type: String, required: true },
  whatsappUrl: { type: String, required: true },
  addressLine: { type: String, required: true },
  city: { type: String, required: true },
  logoUrl: { type: String },
  ogImage: { type: String },
  socialLinks: [{ key: String, label: String, href: String }],
  seo: { defaultTitle: String, defaultDescription: String, defaultOgImage: String }
}, { timestamps: true });
export const Settings = model<ISettings>('Settings', settingsSchema);