import nodemailer from 'nodemailer';
import { config } from '../../config/env.js';

export const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: false, // TLS
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASSWORD,
  },
});