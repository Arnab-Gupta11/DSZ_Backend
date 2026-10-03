import mongoose from 'mongoose';
export const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const statusCode = 400;
  const message = Object.values(err.errors).map(val => val.message).join(', ');
  return { statusCode, message, code: 'VALIDATION_ERROR' };
};