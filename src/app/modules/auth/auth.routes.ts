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
export const AuthRoutes = router;