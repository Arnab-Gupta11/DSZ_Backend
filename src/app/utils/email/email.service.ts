import { transporter } from './email.config.js';
import { contactEmailTemplate, adminCredentialsTemplate, resetPasswordOTPTemplate } from './email.templates.js';
import { config } from '../../config/env.js';

export const sendContactEmail = async (data: { name: string; contact: string; need: string; message: string }) => {
  try {
    await transporter.sendMail({
      from: config.SMTP_FROM,
      to: config.SMTP_TO,
      subject: `New Inquiry: ${data.need} from ${data.name}`,
      html: contactEmailTemplate(data),
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const sendAdminCredentialsEmail = async (data: { name: string; email: string; password: string }) => {
  try {
    const loginUrl = `${config.CLIENT_URL}/login`;
    await transporter.sendMail({
      from: config.SMTP_FROM,
      to: data.email,
      subject: 'Your Admin Credentials for DSZ',
      html: adminCredentialsTemplate({ ...data, loginUrl }),
    });
    } catch (error) {
    console.error('Error sending admin credentials email:', error);
  }
};

export const sendPasswordResetOTP = async (data: { name: string; email: string; otp: string }) => {
  try {
    await transporter.sendMail({
      from: config.SMTP_FROM,
      to: data.email,
      subject: 'Password Reset Verification Code - DSZ',
      html: resetPasswordOTPTemplate(data),
    });
  } catch (error) {
    console.error('Error sending password reset OTP email:', error);
  }
};