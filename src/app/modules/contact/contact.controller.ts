import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { ContactService } from './contact.service.js';
export const ContactController = {
  createContact: catchAsync(async (req, res) => {
    const result = await ContactService.createContact({ ...req.body, ipAddress: req.ip });
    sendResponse(res, { statusCode: 201, success: true, message: 'Message sent successfully', data: result });
  }),
  getAdminContacts: catchAsync(async (req, res) => {
    const result = await ContactService.getAllContacts();
    sendResponse(res, { statusCode: 200, success: true, message: 'Contacts fetched', data: result });
  }),
  updateContactStatus: catchAsync(async (req, res) => {
    const result = await ContactService.updateStatus(req.params.id, req.body.status);
    sendResponse(res, { statusCode: 200, success: true, message: 'Status updated', data: result });
  })
};