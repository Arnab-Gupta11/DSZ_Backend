import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { SettingsService } from './settings.service.js';
export const SettingsController = {
  getSettings: catchAsync(async (req, res) => {
    const result = await SettingsService.getSettings();
    sendResponse(res, { statusCode: 200, success: true, message: 'Settings fetched', data: result });
  }),
  updateSettings: catchAsync(async (req, res) => {
    const result = await SettingsService.updateSettings(req.body);
    sendResponse(res, { statusCode: 200, success: true, message: 'Settings updated', data: result });
  })
};