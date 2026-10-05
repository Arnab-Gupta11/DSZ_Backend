import { Schema, model } from 'mongoose';
import { IJob } from './job.interface.js';

const jobSchema = new Schema<IJob>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    department: {
      type: String,
      enum: ['Development', 'Design', 'Marketing', 'Video', 'Operations'],
      required: true,
    },
    type: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Internship', 'Contract'],
      required: true,
    },
    location: {
      type: String,
      enum: ['On-site', 'Remote', 'Hybrid'],
      required: true,
    },
    city: { type: String, required: true },
    experience: { type: String, required: true },
    salary: { type: String },
    postedAt: { type: Date, required: true },
    deadline: { type: Date, required: true },
    short: { type: String, required: true },
    overview: { type: String, required: true },
    responsibilities: [{ type: String }],
    requirements: [{ type: String }],
    niceToHave: [{ type: String }],
    tools: [{ type: String }],
    benefits: [{ type: String }],
    status: {
      type: String,
      enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
      default: 'DRAFT',
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      noIndex: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

jobSchema.index({ title: 'text', short: 'text' });
export const Job = model<IJob>('Job', jobSchema);