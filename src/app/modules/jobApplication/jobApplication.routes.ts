import { Router } from 'express';
import multer from 'multer';
import { JobApplicationController } from './jobApplication.controller.js';
import { auth } from '../../middlewares/auth.js';
import { catchAsync } from '../../utils/catchAsync.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

const publicRouter: Router = Router();
publicRouter.post('/:jobId/apply', upload.single('cv'), catchAsync(JobApplicationController.applyForJob));

const adminRouter: Router = Router();
adminRouter.get('/', auth(), catchAsync(JobApplicationController.getAdminApplications));
adminRouter.get('/:id', auth(), catchAsync(JobApplicationController.getApplicationById));
adminRouter.patch('/:id/status', auth(), catchAsync(JobApplicationController.updateStatus));
adminRouter.delete('/:id', auth(), catchAsync(JobApplicationController.deleteApplication));

export const JobApplicationRoutes = { publicRouter, adminRouter };