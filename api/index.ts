import mongoose from 'mongoose';
import app from '../src/app.js';
import { config } from '../src/app/config/env.js';

let cachedDb: typeof mongoose | null = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  console.log('Connecting to MongoDB for Serverless...');
  const db = await mongoose.connect(config.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });
  cachedDb = db;
  return db;
}

export default async function handler(req: any, res: any) {
  try {
    await connectToDatabase();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Database connection failed. Please check MongoDB Atlas Network Access IP Whitelist.', 
      error: error instanceof Error ? error.message : error 
    });
  }
  return app(req as any, res as any);
}
