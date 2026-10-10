import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { AuthValidation } from './auth.validation.js';
import { auth } from '../../middlewares/auth.js';
import { loginLimiter } from '../../middlewares/rateLimiter.js';

const router = Router();
router.post('/login', loginLimiter, validateRequest(AuthValidation.loginZodSchema), AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/me', auth(), AuthController.getMe);
router.patch('/update-profile', auth(), validateRequest(AuthValidation.updateProfileZodSchema), AuthController.updateProfile);
router.patch('/change-password', auth(), validateRequest(AuthValidation.changePasswordZodSchema), AuthController.changePassword);
router.post('/forget-password', validateRequest(AuthValidation.forgetPasswordZodSchema), AuthController.forgetPassword);
router.post('/reset-password', validateRequest(AuthValidation.resetPasswordZodSchema), AuthController.resetPassword);
export const AuthRoutes = router;