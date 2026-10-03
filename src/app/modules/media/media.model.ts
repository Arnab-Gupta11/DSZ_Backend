import { Schema, model } from 'mongoose';
import { IMedia } from './media.interface.js';
const mediaSchema = new Schema<IMedia>({
  publicId: { type: String, required: true, unique: true },
  secureUrl: { type: String, required: true },
  resourceType: { type: String, enum: ['image', 'video', 'raw'], required: true },
  format: { type: String, required: true },
  width: Number, height: Number, bytes: { type: Number, required: true },
  folder: { type: String, required: true },
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'Admin', required: true }
}, { timestamps: true });
export const Media = model<IMedia>('Media', mediaSchema);