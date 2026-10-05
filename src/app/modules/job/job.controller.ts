import { Request, Response } from 'express';
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
};