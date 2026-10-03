import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { ArticleService } from './article.service.js';
import { calculatePagination } from '../../utils/pagination.js';

const createArticle = catchAsync(async (req: Request, res: Response) => {
  const result = await ArticleService.createArticle(req.body);
  sendResponse(res, { statusCode: 201, success: true, message: 'Article created successfully', data: result });
});

const getPublicArticles = catchAsync(async (req: Request, res: Response) => {
  const { articles, total } = await ArticleService.getAllArticles(req.query as Record<string, unknown>, false);
  const { page, limit } = calculatePagination(req.query);
  const totalPages = Math.ceil(total / limit);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Articles fetched successfully',
    data: articles,
    meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 },
  });
});

const getAdminArticles = catchAsync(async (req: Request, res: Response) => {
  const { articles, total } = await ArticleService.getAllArticles(req.query as Record<string, unknown>, true);
  const { page, limit } = calculatePagination(req.query);
  const totalPages = Math.ceil(total / limit);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Articles fetched successfully',
    data: articles,
    meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 },
  });
});

// Public: returns article + related articles (matching frontend behavior)
const getPublicSingleArticle = catchAsync(async (req: Request, res: Response) => {
  const result = await ArticleService.getArticleBySlug(req.params.slug);
  sendResponse(res, { statusCode: 200, success: true, message: 'Article fetched successfully', data: result });
});

// Admin: returns just the article by ID
const getAdminSingleArticle = catchAsync(async (req: Request, res: Response) => {
  const result = await ArticleService.getArticleById(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Article fetched successfully', data: result });
});

const updateArticle = catchAsync(async (req: Request, res: Response) => {
  const result = await ArticleService.updateArticle(req.params.id, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: 'Article updated successfully', data: result });
});

const deleteArticle = catchAsync(async (req: Request, res: Response) => {
  await ArticleService.deleteArticle(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Article deleted successfully' });
});

export const ArticleController = {
  createArticle,
  getPublicArticles,
  getAdminArticles,
  getPublicSingleArticle,
  getAdminSingleArticle,
  updateArticle,
  deleteArticle,
};