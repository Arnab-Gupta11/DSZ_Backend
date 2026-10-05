const fs = require('fs');
const path = require('path');

const files = {
  'src/app/modules/job/job.interface.ts': `import { Types } from 'mongoose';

export type TJobDepartment = 'Development' | 'Design' | 'Marketing' | 'Video' | 'Operations';
export type TJobType = 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
export type TJobLocation = 'On-site' | 'Remote' | 'Hybrid';
export type TJobStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface IJob {
  _id: Types.ObjectId;
  slug: string;
  title: string;
  department: TJobDepartment;
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
}`,

  'src/app/modules/job/job.model.ts': `import { Schema, model } from 'mongoose';
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
export const Job = model<IJob>('Job', jobSchema);`,

  'src/app/modules/job/job.validation.ts': `import { z } from 'zod';

const createSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    department: z.enum(['Development', 'Design', 'Marketing', 'Video', 'Operations']),
    type: z.enum(['Full-time', 'Part-time', 'Internship', 'Contract']),
    location: z.enum(['On-site', 'Remote', 'Hybrid']),
    city: z.string().min(1, 'City is required'),
    experience: z.string().min(1, 'Experience is required'),
    salary: z.string().optional(),
    postedAt: z.string().datetime().or(z.date()),
    deadline: z.string().datetime().or(z.date()),
    short: z.string().min(1, 'Short description is required'),
    overview: z.string().min(1, 'Overview is required'),
    responsibilities: z.array(z.string()).default([]),
    requirements: z.array(z.string()).default([]),
    niceToHave: z.array(z.string()).default([]),
    tools: z.array(z.string()).default([]),
    benefits: z.array(z.string()).default([]),
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
    seo: z
      .object({
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        noIndex: z.boolean().optional(),
      })
      .optional(),
  }),
});

const updateSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    department: z.enum(['Development', 'Design', 'Marketing', 'Video', 'Operations']).optional(),
    type: z.enum(['Full-time', 'Part-time', 'Internship', 'Contract']).optional(),
    location: z.enum(['On-site', 'Remote', 'Hybrid']).optional(),
    city: z.string().optional(),
    experience: z.string().optional(),
    salary: z.string().optional(),
    postedAt: z.string().datetime().or(z.date()).optional(),
    deadline: z.string().datetime().or(z.date()).optional(),
    short: z.string().optional(),
    overview: z.string().optional(),
    responsibilities: z.array(z.string()).optional(),
    requirements: z.array(z.string()).optional(),
    niceToHave: z.array(z.string()).optional(),
    tools: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
    seo: z
      .object({
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        noIndex: z.boolean().optional(),
      })
      .optional(),
  }),
});

export const JobValidation = {
  createSchema,
  updateSchema,
};`,

  'src/app/modules/job/job.service.ts': `import { Job } from './job.model.js';
import { IJob } from './job.interface.js';
import { AppError } from '../../errors/AppError.js';
import { slugify } from '../../utils/slugify.js';

const createJob = async (payload: Partial<IJob>) => {
  const slug = slugify(payload.title as string);
  
  const existing = await Job.findOne({ slug });
  const finalSlug = existing ? \`\${slug}-\${Date.now()}\` : slug;

  const job = await Job.create({ ...payload, slug: finalSlug });
  return job;
};

const getAllJobs = async (query: Record<string, unknown>, isAuth: boolean) => {
  const { page = 1, limit = 10, search, sort, department } = query;
  
  const filter: Record<string, unknown> = {};
  if (!isAuth) {
    filter.status = 'PUBLISHED';
  } else if (query.status) {
    filter.status = query.status;
  }

  if (department) {
    filter.department = department;
  }

  if (search) {
    filter.$text = { $search: search as string };
  }

  const sortOption = sort ? (sort as string) : '-createdAt';
  const skip = (Number(page) - 1) * Number(limit);

  const jobs = await Job.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(Number(limit));

  const total = await Job.countDocuments(filter);

  return { jobs, total };
};

const getJobById = async (id: string) => {
  const job = await Job.findById(id);
  if (!job) throw new AppError(404, 'Job not found', 'JOB_NOT_FOUND');
  return job;
};

const getJobBySlug = async (slug: string) => {
  const job = await Job.findOne({ slug, status: 'PUBLISHED' });
  if (!job) throw new AppError(404, 'Job not found', 'JOB_NOT_FOUND');
  return job;
};

const updateJob = async (id: string, payload: Partial<IJob>) => {
  const job = await Job.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  if (!job) throw new AppError(404, 'Job not found', 'JOB_NOT_FOUND');
  return job;
};

const deleteJob = async (id: string) => {
  const job = await Job.findByIdAndDelete(id);
  if (!job) throw new AppError(404, 'Job not found', 'JOB_NOT_FOUND');
  return job;
};

export const JobService = {
  createJob,
  getAllJobs,
  getJobById,
  getJobBySlug,
  updateJob,
  deleteJob,
};`,

  'src/app/modules/job/job.controller.ts': `import { Request, Response } from 'express';
import { JobService } from './job.service.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { calculatePagination } from '../../utils/pagination.js';

const createJob = async (req: Request, res: Response) => {
  const result = await JobService.createJob(req.body);
  sendResponse(res, { statusCode: 201, success: true, message: 'Job created successfully', data: result });
};

const getPublicJobs = async (req: Request, res: Response) => {
  const { jobs, total } = await JobService.getAllJobs(req.query as Record<string, unknown>, false);
  const { page, limit } = calculatePagination(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Jobs fetched successfully',
    data: jobs,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPreviousPage: page > 1,
    }
  });
};

const getAdminJobs = async (req: Request, res: Response) => {
  const { jobs, total } = await JobService.getAllJobs(req.query as Record<string, unknown>, true);
  const { page, limit } = calculatePagination(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Jobs fetched successfully',
    data: jobs,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPreviousPage: page > 1,
    }
  });
};

const getPublicSingleJob = async (req: Request, res: Response) => {
  const result = await JobService.getJobBySlug(req.params.slug);
  sendResponse(res, { statusCode: 200, success: true, message: 'Job fetched successfully', data: result });
};

const getAdminSingleJob = async (req: Request, res: Response) => {
  const result = await JobService.getJobById(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Job fetched successfully', data: result });
};

const updateJob = async (req: Request, res: Response) => {
  const result = await JobService.updateJob(req.params.id, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: 'Job updated successfully', data: result });
};

const deleteJob = async (req: Request, res: Response) => {
  await JobService.deleteJob(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Job deleted successfully', data: null });
};

export const JobController = {
  createJob,
  getPublicJobs,
  getAdminJobs,
  getPublicSingleJob,
  getAdminSingleJob,
  updateJob,
  deleteJob,
};`,

  'src/app/modules/job/job.routes.ts': `import { catchAsync } from '../../utils/catchAsync.js';
import { Router } from 'express';
import { JobController } from './job.controller.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { JobValidation } from './job.validation.js';
import { auth } from '../../middlewares/auth.js';

const publicRouter: Router = Router();
publicRouter.get('/', catchAsync(JobController.getPublicJobs));
publicRouter.get('/:slug', catchAsync(JobController.getPublicSingleJob));

const adminRouter: Router = Router();
adminRouter.post('/', auth(), validateRequest(JobValidation.createSchema), catchAsync(JobController.createJob));
adminRouter.get('/', auth(), catchAsync(JobController.getAdminJobs));
adminRouter.get('/:id', auth(), catchAsync(JobController.getAdminSingleJob));
adminRouter.patch('/:id', auth(), validateRequest(JobValidation.updateSchema), catchAsync(JobController.updateJob));
adminRouter.delete('/:id', auth(), catchAsync(JobController.deleteJob));

export const JobRoutes = { publicRouter, adminRouter };`,

  'src/app/modules/jobApplication/jobApplication.interface.ts': `import { Types } from 'mongoose';

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
}`,

  'src/app/modules/jobApplication/jobApplication.model.ts': `import { Schema, model } from 'mongoose';
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

export const JobApplication = model<IJobApplication>('JobApplication', jobApplicationSchema);`,

  'src/app/modules/jobApplication/jobApplication.service.ts': `import { JobApplication } from './jobApplication.model.js';
import { IJobApplication } from './jobApplication.interface.js';
import { AppError } from '../../errors/AppError.js';
import { Job } from '../job/job.model.js';

const applyForJob = async (jobId: string, payload: Partial<IJobApplication>, file: Express.Multer.File) => {
  const job = await Job.findById(jobId);
  if (!job) throw new AppError(404, 'Job not found', 'JOB_NOT_FOUND');

  if (!file) {
    throw new AppError(400, 'CV file is required', 'VALIDATION_ERROR');
  }
  
  const cloudinary = (await import('cloudinary')).v2;
  
  const b64 = Buffer.from(file.buffer).toString('base64');
  const dataURI = \`data:\${file.mimetype};base64,\${b64}\`;
  
  const uploadResult = await cloudinary.uploader.upload(dataURI, {
    folder: 'dsz/cvs',
    resource_type: 'auto',
  });

  const application = await JobApplication.create({
    ...payload,
    jobId,
    cvUrl: uploadResult.secure_url,
    cvPublicId: uploadResult.public_id,
  });

  return application;
};

const getAdminApplications = async (query: Record<string, unknown>) => {
  const { page = 1, limit = 10, status, jobId } = query;
  
  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (jobId) filter.jobId = jobId;

  const skip = (Number(page) - 1) * Number(limit);

  const applications = await JobApplication.find(filter)
    .populate('jobId', 'title slug')
    .sort('-createdAt')
    .skip(skip)
    .limit(Number(limit));

  const total = await JobApplication.countDocuments(filter);

  return { applications, total };
};

const updateApplicationStatus = async (id: string, status: string) => {
  const application = await JobApplication.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
  if (!application) throw new AppError(404, 'Application not found', 'APPLICATION_NOT_FOUND');
  return application;
};

const deleteApplication = async (id: string) => {
  const application = await JobApplication.findByIdAndDelete(id);
  if (!application) throw new AppError(404, 'Application not found', 'APPLICATION_NOT_FOUND');
  
  const cloudinary = (await import('cloudinary')).v2;
  await cloudinary.uploader.destroy(application.cvPublicId, { resource_type: 'raw' }).catch(() => null);
  await cloudinary.uploader.destroy(application.cvPublicId).catch(() => null);

  return application;
};

export const JobApplicationService = {
  applyForJob,
  getAdminApplications,
  updateApplicationStatus,
  deleteApplication,
};`,

  'src/app/modules/jobApplication/jobApplication.controller.ts': `import { Request, Response } from 'express';
import { JobApplicationService } from './jobApplication.service.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { calculatePagination } from '../../utils/pagination.js';

const applyForJob = async (req: Request, res: Response) => {
  const file = req.file as Express.Multer.File;
  const result = await JobApplicationService.applyForJob(req.params.jobId, req.body, file);
  sendResponse(res, { statusCode: 201, success: true, message: 'Application submitted successfully', data: result });
};

const getAdminApplications = async (req: Request, res: Response) => {
  const { applications, total } = await JobApplicationService.getAdminApplications(req.query as Record<string, unknown>);
  const { page, limit } = calculatePagination(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Applications fetched successfully',
    data: applications,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPreviousPage: page > 1,
    }
  });
};

const updateStatus = async (req: Request, res: Response) => {
  const result = await JobApplicationService.updateApplicationStatus(req.params.id, req.body.status);
  sendResponse(res, { statusCode: 200, success: true, message: 'Status updated successfully', data: result });
};

const deleteApplication = async (req: Request, res: Response) => {
  await JobApplicationService.deleteApplication(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Application deleted successfully', data: null });
};

export const JobApplicationController = {
  applyForJob,
  getAdminApplications,
  updateStatus,
  deleteApplication,
};`,

  'src/app/modules/jobApplication/jobApplication.routes.ts': `import { Router } from 'express';
import multer from 'multer';
import { JobApplicationController } from './jobApplication.controller.js';
import { auth } from '../../middlewares/auth.js';
import { catchAsync } from '../../utils/catchAsync.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

const publicRouter: Router = Router();
publicRouter.post('/:jobId/apply', upload.single('cv'), catchAsync(JobApplicationController.applyForJob));

const adminRouter: Router = Router();
adminRouter.get('/', auth(), catchAsync(JobApplicationController.getAdminApplications));
adminRouter.patch('/:id/status', auth(), catchAsync(JobApplicationController.updateStatus));
adminRouter.delete('/:id', auth(), catchAsync(JobApplicationController.deleteApplication));

export const JobApplicationRoutes = { publicRouter, adminRouter };`
};

for (const [filepath, content] of Object.entries(files)) {
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content);
  console.log(`Restored ${filepath}`);
}
