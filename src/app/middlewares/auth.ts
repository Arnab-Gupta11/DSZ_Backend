import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError.js';
import { config } from '../config/env.js';
import { Admin } from '../modules/auth/auth.model.js';
import { catchAsync } from '../utils/catchAsync.js';

export const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
      throw new AppError(401, 'You are not authorized', 'AUTH_UNAUTHORIZED');
    }

    let decoded;
    try {
      decoded = jwt.verify(token, config.JWT_SECRET) as { _id: string; role: string };
    } catch (err) {
      throw new AppError(401, 'Invalid token', 'AUTH_UNAUTHORIZED');
    }

    const user = await Admin.findById(decoded._id);
    if (!user || !user.isActive) {
      throw new AppError(401, 'User not found or inactive', 'AUTH_UNAUTHORIZED');
    }

    if (requiredRoles.length && !requiredRoles.includes(user.role)) {
      throw new AppError(403, 'Forbidden access', 'AUTH_FORBIDDEN');
    }

    (req as any).user = user;
    next();
  });
};