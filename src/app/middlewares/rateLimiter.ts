import { rateLimit } from 'express-rate-limit';

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  message: { success: false, message: 'Too many requests, please try again later.', error: { code: 'RATE_LIMIT_EXCEEDED' } }
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { success: false, message: 'Too many login attempts, please try again later.', error: { code: 'RATE_LIMIT_EXCEEDED' } }
});

export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  message: { success: false, message: 'Too many contact inquiries, please try again later.', error: { code: 'RATE_LIMIT_EXCEEDED' } }
});