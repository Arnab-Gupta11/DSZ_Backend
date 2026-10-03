import { Types } from 'mongoose';
export interface IMedia {
  _id: Types.ObjectId;
  publicId: string;
  secureUrl: string;
  resourceType: 'image' | 'video' | 'raw';
  format: string;
  width?: number;
  height?: number;
  bytes: number;
  folder: string;
  uploadedBy: Types.ObjectId;
  createdAt: Date;
}