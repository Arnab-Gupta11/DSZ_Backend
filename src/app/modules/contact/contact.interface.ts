import { Types } from 'mongoose';
export interface IContact {
  _id: Types.ObjectId;
  name: string;
  contact: string;
  need: string;
  message: string;
  status: 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';
  ipAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}