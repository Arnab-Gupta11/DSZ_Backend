import { Router } from 'express';
import { ServiceController } from './service.controller.js';
import { auth } from '../../middlewares/auth.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { ServiceValidation } from './service.validation.js';

const publicRouter = Router();
publicRouter.get('/', ServiceController.getPublicServices);
publicRouter.get('/:slug', ServiceController.getPublicSingleService);

const adminRouter = Router();
adminRouter.post('/', auth(), validateRequest(ServiceValidation.createSchema), ServiceController.createService);
adminRouter.get('/', auth(), ServiceController.getAdminServices);
adminRouter.get('/:id', auth(), ServiceController.getAdminSingleService);
adminRouter.patch('/:id', auth(), validateRequest(ServiceValidation.updateSchema), ServiceController.updateService);
adminRouter.delete('/:id', auth(), ServiceController.deleteService);

export const ServiceRoutes = { publicRouter, adminRouter };