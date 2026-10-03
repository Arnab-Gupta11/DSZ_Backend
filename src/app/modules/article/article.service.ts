import { Article } from './article.model.js';
import { IArticle, ArticleBlock } from './article.interface.js';
import { slugify } from '../../utils/slugify.js';
import { QueryBuilder } from '../../utils/queryBuilder.js';
import { AppError } from '../../errors/AppError.js';

type CreateArticlePayload = Omit<IArticle, '_id' | 'slug' | 'readTime' | 'createdAt' | 'updatedAt'> & {
  slug?: string;
  readTime?: string;
};

type UpdateArticlePayload = Partial<Omit<IArticle, '_id' | 'createdAt' | 'updatedAt'>>;

/**
 * Auto-calculates read time based on body content.
 * Assumes ~200 words per minute reading speed.
 */
const calculateReadTime = (blocks: ArticleBlock[]): string => {
  const text = blocks
    .map((b) => {
      if (b.type === 'list') return b.items.join(' ');
      return b.text;
    })
    .join(' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
};

/**
 * Generates a unique slug. On collision appends -2, -3, etc.
 */
const generateUniqueSlug = async (title: string, excludeId?: string): Promise<string> => {
  const base = slugify(title);
  let slug = base;
  let counter = 2;
  while (true) {
    const existing = await Article.findOne({
      slug,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    });
    if (!existing) break;
    slug = `${base}-${counter}`;
    counter++;
  }
  return slug;
};

const createArticle = async (payload: CreateArticlePayload): Promise<IArticle> => {
  const slug = await generateUniqueSlug(payload.title);
  const readTime = payload.readTime || calculateReadTime(payload.body);
  const article = await Article.create({ ...payload, slug, readTime });
  return article;
};

const getAllArticles = async (
  rawQuery: Record<string, unknown>,
  isAdmin: boolean,
): Promise<{ articles: IArticle[]; total: number }> => {
  const statusFilter = isAdmin ? {} : { status: 'PUBLISHED' as const };

  const queryBuilder = new QueryBuilder<IArticle>(Article.find(statusFilter), rawQuery)
    .search(['title', 'excerpt'])
    .filterByCategory(['status', 'category'])
    .sort()
    .paginate()
    .fields();

  const [articles, total] = await Promise.all([
    queryBuilder.modelQuery.lean(),
    Article.countDocuments(statusFilter),
  ]);

  return { articles: articles as unknown as IArticle[], total };
};

const getArticleBySlug = async (slug: string): Promise<{ article: IArticle; related: IArticle[] }> => {
  const article = await Article.findOne({ slug, status: 'PUBLISHED' }).lean();
  if (!article) throw new AppError(404, 'Article not found', 'ARTICLE_NOT_FOUND');

  // Same-category articles first, up to 3 total — excluding current
  const sameCat = await Article.find({
    status: 'PUBLISHED',
    category: article.category,
    _id: { $ne: article._id },
  })
    .limit(3)
    .select('slug title category excerpt date image imageAlt readTime author order')
    .lean();

  let related: IArticle[] = sameCat as IArticle[];

  if (related.length < 3) {
    const others = await Article.find({
      status: 'PUBLISHED',
      category: { $ne: article.category },
      _id: { $ne: article._id },
    })
      .limit(3 - related.length)
      .select('slug title category excerpt date image imageAlt readTime author order')
      .lean();
    related = [...related, ...(others as IArticle[])];
  }

  return { article: article as IArticle, related };
};

const getArticleById = async (id: string): Promise<IArticle> => {
  const article = await Article.findById(id).lean();
  if (!article) throw new AppError(404, 'Article not found', 'ARTICLE_NOT_FOUND');
  return article as IArticle;
};

const updateArticle = async (id: string, payload: UpdateArticlePayload): Promise<IArticle> => {
  if (payload.title) {
    payload.slug = await generateUniqueSlug(payload.title, id);
  }

  if (payload.body && !payload.readTime) {
    payload.readTime = calculateReadTime(payload.body);
  }

  if (payload.status === 'PUBLISHED') {
    (payload as Record<string, unknown>).publishedAt = new Date();
  }

  const article = await Article.findByIdAndUpdate(id, payload, { new: true, runValidators: true }).lean();
  if (!article) throw new AppError(404, 'Article not found', 'ARTICLE_NOT_FOUND');
  return article as IArticle;
};

const deleteArticle = async (id: string): Promise<IArticle> => {
  const article = await Article.findByIdAndDelete(id).lean();
  if (!article) throw new AppError(404, 'Article not found', 'ARTICLE_NOT_FOUND');
  return article as IArticle;
};

export const ArticleService = {
  createArticle,
  getAllArticles,
  getArticleBySlug,
  getArticleById,
  updateArticle,
  deleteArticle,
};