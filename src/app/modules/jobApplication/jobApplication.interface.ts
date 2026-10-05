import { Types } from 'mongoose';

export type TJobApplicationStatus = 'NEW' | 'REVIEWING' | 'SHORTLISTED' | 'REJECTED';

export interface IJobApplication {
  _id: Types.ObjectId;
  jobId: Types.ObjectId; // Reference to Job
  name: string;
  email: string;
  phone: string;
  portfolio?: string;
  salary?: string;
  notice: string;
  cvUrl: string; // Cloudinary secure URL
  cvPublicId: string;
  cover?: string;
  status: TJobApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}