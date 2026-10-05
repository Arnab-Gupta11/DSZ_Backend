import { JobApplication } from './jobApplication.model.js';
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
  const dataURI = `data:${file.mimetype};base64,${b64}`;
  
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
};