import mongoose from 'mongoose';
export const handleCastError = (err: mongoose.Error.CastError) => {
  const statusCode = 400;
  const message = `Invalid ${err.path}: ${err.value}`;
  return { statusCode, message, code: 'INVALID_ID' };
};