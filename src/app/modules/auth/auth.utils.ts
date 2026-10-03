import jwt from 'jsonwebtoken';
import { config } from '../../config/env.js';

export const createToken = (jwtPayload: { _id: string; role: string }): string => {
  return jwt.sign(jwtPayload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });
};