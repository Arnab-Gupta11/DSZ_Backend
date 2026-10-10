import type { Request, Response } from 'express';
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

const getApplicationById = async (req: Request, res: Response) => {
  const result = await JobApplicationService.getApplicationById(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Application fetched successfully', data: result });
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
  getApplicationById,
  updateStatus,
  deleteApplication,
};