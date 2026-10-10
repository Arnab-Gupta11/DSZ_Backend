import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { WorkService } from './work.service.js';
import { calculatePagination } from '../../utils/pagination.js';

const createWork = catchAsync(async (req: Request, res: Response) => {
  const result = await WorkService.createWork(req.body);
  sendResponse(res, { statusCode: 201, success: true, message: 'Work created successfully', data: result });
});

const getPublicWorks = catchAsync(async (req: Request, res: Response) => {
  const { works, total } = await WorkService.getAllWorks(req.query as Record<string, unknown>, false);
  const { page, limit } = calculatePagination(req.query);
  const totalPages = Math.ceil(total / limit);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Works fetched successfully',
    data: works,
    meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 },
  });
});

const getAdminWorks = catchAsync(async (req: Request, res: Response) => {
  const { works, total } = await WorkService.getAllWorks(req.query as Record<string, unknown>, true);
  const { page, limit } = calculatePagination(req.query);
  const totalPages = Math.ceil(total / limit);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Works fetched successfully',
    data: works,
    meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 },
  });
});

const getPublicSingleWork = catchAsync(async (req: Request, res: Response) => {
  const result = await WorkService.getWorkBySlug(req.params.slug);
  sendResponse(res, { statusCode: 200, success: true, message: 'Work fetched successfully', data: result });
});

const getAdminSingleWork = catchAsync(async (req: Request, res: Response) => {
  const result = await WorkService.getWorkById(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Work fetched successfully', data: result });
});

const updateWork = catchAsync(async (req: Request, res: Response) => {
  const result = await WorkService.updateWork(req.params.id, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: 'Work updated successfully', data: result });
});

const deleteWork = catchAsync(async (req: Request, res: Response) => {
  await WorkService.deleteWork(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Work deleted successfully' });
});

const reorderWork = catchAsync(async (req: Request, res: Response) => {
  const result = await WorkService.reorderWork(req.params.id, Number(req.body.order));
  sendResponse(res, { statusCode: 200, success: true, message: 'Work reordered successfully', data: result });
});

export const WorkController = {
  createWork,
  getPublicWorks,
  getAdminWorks,
  getPublicSingleWork,
  getAdminSingleWork,
  updateWork,
  deleteWork,
  reorderWork,
};