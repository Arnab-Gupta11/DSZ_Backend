import mongoose from 'mongoose';
import readline from 'readline';
import argon2 from 'argon2';
import { connectDB, disconnectDB } from '../app/db/index.js';
import { Admin } from '../app/modules/auth/auth.model.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => new Promise((resolve) => rl.question(query, resolve));

async function createAdmin() {
  try {
    await connectDB();
    
    console.log('\\n--- Create New Admin ---\\n');
    const name = await question('Name: ');
    const email = await question('Email: ');
    
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log('Error: Admin with this email already exists.');
      return;
    }

    const password = await question('Password: ');
    const confirmPassword = await question('Confirm Password: ');
    
    if (password !== confirmPassword) {
      console.log('Error: Passwords do not match.');
      return;
    }
    
    if (password.length < 6) {
      console.log('Error: Password must be at least 6 characters.');
      return;
    }

    const passwordHash = await argon2.hash(password);
    
    await Admin.create({
      name,
      email,
      passwordHash,
      role: 'ADMIN',
      isActive: true
    });
    
    console.log('\\nAdmin created successfully!');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    rl.close();
    await disconnectDB();
  }
}

createAdmin();
