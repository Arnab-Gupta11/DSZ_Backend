import { Router } from 'express';
import { AdminManagementController } from './adminManagement.controller.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { AdminManagementValidation } from './adminManagement.validation.js';
import { auth } from '../../middlewares/auth.js';

const router = Router();

// All routes are protected and only accessible by SUPER_ADMIN
router.use(auth('SUPER_ADMIN'));

router.post('/', validateRequest(AdminManagementValidation.createAdminZodSchema), AdminManagementController.createAdmin);
router.get('/', AdminManagementController.getAllAdmins);
router.patch('/:id/block', validateRequest(AdminManagementValidation.blockAdminZodSchema), AdminManagementController.blockAdmin);
router.delete('/:id', AdminManagementController.deleteAdmin);

export const AdminManagementRoutes = router;

