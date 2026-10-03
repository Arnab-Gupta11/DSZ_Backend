import { Router } from 'express';
import { WorkController } from './work.controller.js';
import { auth } from '../../middlewares/auth.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { WorkValidation } from './work.validation.js';

const publicRouter = Router();
publicRouter.get('/', WorkController.getPublicWorks);
publicRouter.get('/:slug', WorkController.getPublicSingleWork);

const adminRouter = Router();
adminRouter.post('/', auth(), validateRequest(WorkValidation.createSchema), WorkController.createWork);
adminRouter.get('/', auth(), WorkController.getAdminWorks);
adminRouter.get('/:id', auth(), WorkController.getAdminSingleWork);
adminRouter.patch('/:id', auth(), validateRequest(WorkValidation.updateSchema), WorkController.updateWork);
adminRouter.delete('/:id', auth(), WorkController.deleteWork);
adminRouter.patch('/:id/reorder', auth(), WorkController.reorderWork);

export const WorkRoutes = { publicRouter, adminRouter };