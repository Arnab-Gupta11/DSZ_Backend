import { Schema, model } from 'mongoose';
import { IContact } from './contact.interface.js';
const contactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  need: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['NEW', 'READ', 'REPLIED', 'ARCHIVED'], default: 'NEW' },
  ipAddress: { type: String }
}, { timestamps: true });
export const Contact = model<IContact>('Contact', contactSchema);