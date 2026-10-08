import { Types } from 'mongoose';
export interface IContact {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  need: string;
  message: string;
  status: 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';
  serviceId?: Types.ObjectId;
  ipAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}