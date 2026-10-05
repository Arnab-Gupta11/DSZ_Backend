import { Schema, model } from 'mongoose';
import { IJobApplication } from './jobApplication.interface.js';

const jobApplicationSchema = new Schema<IJobApplication>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    portfolio: { type: String },
    salary: { type: String },
    notice: { type: String, required: true },
    cvUrl: { type: String, required: true },
    cvPublicId: { type: String, required: true },
    cover: { type: String },
    status: {
      type: String,
      enum: ['NEW', 'REVIEWING', 'SHORTLISTED', 'REJECTED'],
      default: 'NEW',
    },
  },
  { timestamps: true }
);

export const JobApplication = model<IJobApplication>('JobApplication', jobApplicationSchema);