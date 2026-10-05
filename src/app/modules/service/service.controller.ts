import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { ServiceService } from './service.service.js';
import { calculatePagination } from '../../utils/pagination.js';

const createService = catchAsync(async (req, res) => {
  const result = await ServiceService.createService(req.body);
  sendResponse(res, { statusCode: 201, success: true, message: 'Service created', data: result });
});

const getPublicServices = catchAsync(async (req, res) => {
  const { services, total } = await ServiceService.getAllServices(req.query as Record<string, unknown>, false);
  const { page, limit } = calculatePagination(req.query);
  const totalPages = Math.ceil(total / limit);
  sendResponse(res, { 
    statusCode: 200, 
    success: true, 
    message: 'Services fetched', 
    data: services,
    meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 }
  });
});

const getAdminServices = catchAsync(async (req, res) => {
  const { services, total } = await ServiceService.getAllServices(req.query as Record<string, unknown>, true);
  const { page, limit } = calculatePagination(req.query);
  const totalPages = Math.ceil(total / limit);
  sendResponse(res, { 
    statusCode: 200, 
    success: true, 
    message: 'Services fetched', 
    data: services,
    meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 }
  });
});

const getPublicSingleService = catchAsync(async (req, res) => {
  const result = await ServiceService.getSingleService(req.params.slug, false);
  sendResponse(res, { statusCode: 200, success: true, message: 'Service fetched', data: result });
});

const getAdminSingleService = catchAsync(async (req, res) => {
  const result = await ServiceService.getSingleService(req.params.id, true);
  sendResponse(res, { statusCode: 200, success: true, message: 'Service fetched', data: result });
});

const updateService = catchAsync(async (req, res) => {
  const result = await ServiceService.updateService(req.params.id, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: 'Service updated', data: result });
});

const deleteService = catchAsync(async (req, res) => {
  await ServiceService.deleteService(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Service deleted' });
});

export const ServiceController = { createService, getPublicServices, getAdminServices, getPublicSingleService, getAdminSingleService, updateService, deleteService };
