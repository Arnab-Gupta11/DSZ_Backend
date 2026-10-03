import { Work } from './work.model.js';
import { IWork } from './work.interface.js';
import { slugify } from '../../utils/slugify.js';
import { QueryBuilder } from '../../utils/queryBuilder.js';
import { AppError } from '../../errors/AppError.js';

type CreateWorkPayload = Omit<IWork, '_id' | 'slug' | 'createdAt' | 'updatedAt'> & {
  slug?: string;
};

type UpdateWorkPayload = Partial<Omit<IWork, '_id' | 'createdAt' | 'updatedAt'>>;

/**
 * Generates a unique slug from the title.
 * On collision appends -2, -3, etc.
 */
const generateUniqueSlug = async (title: string, excludeId?: string): Promise<string> => {
  const base = slugify(title);
  let slug = base;
  let counter = 2;
  while (true) {
    const existing = await Work.findOne({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) });
    if (!existing) break;
    slug = `${base}-${counter}`;
    counter++;
  }
  return slug;
};

const createWork = async (payload: CreateWorkPayload): Promise<IWork> => {
  const slug = await generateUniqueSlug(payload.title);
  const work = await Work.create({ ...payload, slug });
  return work;
};

const getAllWorks = async (
  rawQuery: Record<string, unknown>,
  isAdmin: boolean,
): Promise<{ works: IWork[]; total: number }> => {
  const statusFilter = isAdmin ? {} : { status: 'PUBLISHED' as const };

  const queryBuilder = new QueryBuilder<IWork>(Work.find(statusFilter), rawQuery)
    .search(['title', 'client'])
    .filterByCategory(['status', 'categories'])
    .sort()
    .paginate()
    .fields();

  // Run both queries in parallel for efficiency
  const [works, total] = await Promise.all([
    queryBuilder.modelQuery.lean(),
    Work.countDocuments(statusFilter),
  ]);

  return { works: works as unknown as IWork[], total };
};

const getWorkBySlug = async (slug: string): Promise<IWork> => {
  const work = await Work.findOne({ slug, status: 'PUBLISHED' }).lean();
  if (!work) throw new AppError(404, 'Work not found', 'WORK_NOT_FOUND');
  return work as IWork;
};

const getWorkById = async (id: string): Promise<IWork> => {
  const work = await Work.findById(id).lean();
  if (!work) throw new AppError(404, 'Work not found', 'WORK_NOT_FOUND');
  return work as IWork;
};

const updateWork = async (id: string, payload: UpdateWorkPayload): Promise<IWork> => {
  // If title is changing, regenerate slug
  if (payload.title) {
    payload.slug = await generateUniqueSlug(payload.title, id);
  }

  // Auto-set publishedAt when status becomes PUBLISHED
  if (payload.status === 'PUBLISHED') {
    (payload as Record<string, unknown>).publishedAt = new Date();
  }

  const work = await Work.findByIdAndUpdate(id, payload, { new: true, runValidators: true }).lean();
  if (!work) throw new AppError(404, 'Work not found', 'WORK_NOT_FOUND');
  return work as IWork;
};

const deleteWork = async (id: string): Promise<IWork> => {
  const work = await Work.findByIdAndDelete(id).lean();
  if (!work) throw new AppError(404, 'Work not found', 'WORK_NOT_FOUND');
  return work as IWork;
};

const reorderWork = async (id: string, order: number): Promise<IWork> => {
  const work = await Work.findByIdAndUpdate(id, { order }, { new: true }).lean();
  if (!work) throw new AppError(404, 'Work not found', 'WORK_NOT_FOUND');
  return work as IWork;
};

export const WorkService = {
  createWork,
  getAllWorks,
  getWorkBySlug,
  getWorkById,
  updateWork,
  deleteWork,
  reorderWork,
};