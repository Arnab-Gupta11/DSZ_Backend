import mongoose from 'mongoose';
import app from '../src/app.js';
import { config } from '../src/app/config/env.js';

mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('MongoDB connected for Serverless'))
  .catch(err => console.error('MongoDB connection error:', err));

export default app;
