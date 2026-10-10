import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { ContactService } from './contact.service.js';
import { calculatePagination } from '../../utils/pagination.js';

export const ContactController = {
  createContact: catchAsync(async (req: any, res: any) => {
    const result = await ContactService.createContact({
      ...req.body,
      ipAddress: req.ip,
    });
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Message sent successfully',
      data: result,
    });
  }),
  getAdminContacts: catchAsync(async (req: any, res: any) => {
    const { data, total } = await ContactService.getAllContacts(req.query);
    const { page, limit } = calculatePagination(req.query);
    const totalPages = Math.ceil(total / limit);
    const meta = {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Contacts fetched',
      data,
      meta,
    });
  }),
  getContactById: catchAsync(async (req: any, res: any) => {
    const result = await ContactService.getContactById(req.params.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Contact fetched',
      data: result,
    });
  }),
  updateContactStatus: catchAsync(async (req: any, res: any) => {
    const result = await ContactService.updateStatus(
      req.params.id,
      req.body.status
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Status updated',
      data: result,
    });
  }),
  deleteContact: catchAsync(async (req: any, res: any) => {
    const result = await ContactService.deleteContact(req.params.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Contact deleted',
      data: result,
    });
  }),
};
