import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from './AppError.js';
import { handleZodError } from './handleZodError.js';
import { handleDuplicateError } from './handleDuplicateError.js';
import { handleValidationError } from './handleValidationError.js';
import { handleCastError } from './handleCastError.js';
import mongoose from 'mongoose';
import { config } from '../config/env.js';

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let code = 'INTERNAL_SERVER_ERROR';

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    code = simplifiedError.code;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    code = simplifiedError.code;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    code = simplifiedError.code;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    code = simplifiedError.code;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    code = err.code;
  } else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: { code },
    ...(config.NODE_ENV === 'development' && { stack: err.stack }),
  });
};