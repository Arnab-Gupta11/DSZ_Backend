import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { Admin } from '../app/modules/auth/auth.model.js';
import argon2 from 'argon2';

describe('Auth API', () => {
  it('should login an admin successfully', async () => {
    const passwordHash = await argon2.hash('password123');
    await Admin.create({ name: 'Admin', email: 'admin@test.com', passwordHash, role: 'ADMIN', isActive: true });
    
    const res = await request(app).post('/api/v1/auth/login').send({ email: 'admin@test.com', password: 'password123' });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe('admin@test.com');
  });
});