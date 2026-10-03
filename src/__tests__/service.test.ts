import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { Service } from '../app/modules/service/service.model.js';

describe('Service API', () => {
  it('should get public services', async () => {
    await Service.create({
      slug: 'test-service', number: '01', title: 'Test', category: 'Branding', short: 'short', description: 'desc',
      whatWeDo: [], deliverables: [], whoFor: 'who', iconName: 'icon', visual: 'brand', status: 'PUBLISHED'
    });
    const res = await request(app).get('/api/v1/services');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
  });
});