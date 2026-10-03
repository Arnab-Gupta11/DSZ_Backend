import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { MediaService } from './media.service.js';
export const MediaController = {
  uploadMedia: catchAsync(async (req, res) => {
    if (!req.file) throw new Error('File is missing');
    const folder = req.body.folder || 'dsz/general';
    const result = await MediaService.uploadMedia(req.file, folder, (req as any).user._id.toString());
    sendResponse(res, { statusCode: 201, success: true, message: 'Media uploaded', data: result });
  }),
  getAllMedia: catchAsync(async (req, res) => {
    const result = await MediaService.getAllMedia();
    sendResponse(res, { statusCode: 200, success: true, message: 'Media fetched', data: result });
  }),
  deleteMedia: catchAsync(async (req, res) => {
    await MediaService.deleteMedia(decodeURIComponent(req.params.publicId));
    sendResponse(res, { statusCode: 200, success: true, message: 'Media deleted' });
  })
};