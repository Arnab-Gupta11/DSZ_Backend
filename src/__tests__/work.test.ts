import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { Work } from '../app/modules/work/work.model.js';

describe('Work API', () => {
  it('should get public works', async () => {
    await Work.create({
      slug: 'test-work', title: 'Test', client: 'Client', industry: 'Ind', services: [], categories: ['Branding'],
      result: 'Res', year: '2023', image: 'img.jpg', imageAlt: 'alt', imagePulicId: 'pub',
      summary: 'sum', challenge: 'chal', strategy: 'strat', execution: 'exec', executionPoints: [], results: [], gallery: [], status: 'PUBLISHED'
    });
    const res = await request(app).get('/api/v1/works');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
  });
});