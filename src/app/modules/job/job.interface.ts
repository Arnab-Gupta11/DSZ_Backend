import { Types } from 'mongoose';

export type TJobType = 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
export type TJobLocation = 'On-site' | 'Remote' | 'Hybrid';
export type TJobStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface IJob {
  _id: Types.ObjectId;
  slug: string;
  title: string;
  openings: number;
  type: TJobType;
  location: TJobLocation;
  city: string;
  experience: string;
  salary?: string;
  postedAt: Date;
  deadline: Date;
  short: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  tools: string[];
  benefits: string[];
  status: TJobStatus;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    noIndex?: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}