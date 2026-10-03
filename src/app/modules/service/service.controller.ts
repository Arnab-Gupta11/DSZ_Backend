import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { ServiceService } from './service.service.js';

const createService = catchAsync(async (req, res) => {
  const result = await ServiceService.createService(req.body);
  sendResponse(res, { statusCode: 201, success: true, message: 'Service created', data: result });
});
const getPublicServices = catchAsync(async (req, res) => {
  const result = await ServiceService.getAllServices(false);
  sendResponse(res, { statusCode: 200, success: true, message: 'Services fetched', data: result });
});
const getAdminServices = catchAsync(async (req, res) => {
  const result = await ServiceService.getAllServices(true);
  sendResponse(res, { statusCode: 200, success: true, message: 'Services fetched', data: result });
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