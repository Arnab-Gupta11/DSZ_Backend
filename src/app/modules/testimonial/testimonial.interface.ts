import { Types } from 'mongoose';
export interface ITestimonial {
  _id: Types.ObjectId;
  quote: string;
  name: string;
  company: string;
  role: string;
  initials: string;
  category?: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}