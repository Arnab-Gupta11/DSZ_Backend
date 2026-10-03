import { Router } from 'express';
import { ArticleController } from './article.controller.js';
import { auth } from '../../middlewares/auth.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { ArticleValidation } from './article.validation.js';

const publicRouter = Router();
publicRouter.get('/', ArticleController.getPublicArticles);
publicRouter.get('/:slug', ArticleController.getPublicSingleArticle);

const adminRouter = Router();
adminRouter.post('/', auth(), validateRequest(ArticleValidation.createSchema), ArticleController.createArticle);
adminRouter.get('/', auth(), ArticleController.getAdminArticles);
adminRouter.get('/:id', auth(), ArticleController.getAdminSingleArticle);
adminRouter.patch('/:id', auth(), validateRequest(ArticleValidation.updateSchema), ArticleController.updateArticle);
adminRouter.delete('/:id', auth(), ArticleController.deleteArticle);

export const ArticleRoutes = { publicRouter, adminRouter };