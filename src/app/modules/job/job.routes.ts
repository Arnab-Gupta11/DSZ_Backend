import { catchAsync } from '../../utils/catchAsync.js';
import { Router } from 'express';
import { JobController } from './job.controller.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { JobValidation } from './job.validation.js';
import { auth } from '../../middlewares/auth.js';

const publicRouter: Router = Router();
publicRouter.get('/', catchAsync(JobController.getPublicJobs));
publicRouter.get('/:slug', catchAsync(JobController.getPublicSingleJob));

const adminRouter: Router = Router();
adminRouter.post('/', auth(), validateRequest(JobValidation.createSchema), catchAsync(JobController.createJob));
adminRouter.get('/', auth(), catchAsync(JobController.getAdminJobs));
adminRouter.get('/:id', auth(), catchAsync(JobController.getAdminSingleJob));
adminRouter.patch('/:id', auth(), validateRequest(JobValidation.updateSchema), catchAsync(JobController.updateJob));
adminRouter.delete('/:id', auth(), catchAsync(JobController.deleteJob));

export const JobRoutes = { publicRouter, adminRouter };