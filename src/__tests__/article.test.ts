import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { Article } from '../app/modules/article/article.model.js';

describe('Article API', () => {
  it('should get public articles', async () => {
    await Article.create({
      slug: 'test-article', title: 'Test', category: 'Marketing Tips', excerpt: 'exc', image: 'img.jpg', imageAlt: 'alt',
      imagePublicId: 'pub', author: 'auth', body: [], readTime: '5 min', status: 'PUBLISHED'
    });
    const res = await request(app).get('/api/v1/articles');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
  });
});