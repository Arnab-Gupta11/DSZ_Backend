import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { AdminManagementService } from './adminManagement.service.js';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminManagementService.createAdmin(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Admin created successfully and email sent',
    data: result,
  });
});

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminManagementService.getAllAdmins(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admins retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const blockAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminManagementService.blockAdmin(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin status updated successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await AdminManagementService.deleteAdmin(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin deleted successfully',
    data: null,
  });
});

export const AdminManagementController = {
  createAdmin,
  getAllAdmins,
  blockAdmin,
  deleteAdmin,
};

