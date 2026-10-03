import mongoose, { Query } from 'mongoose';

// Whitelisted sort fields per entity type
const ALLOWED_SORT_FIELDS = new Set([
  'createdAt',
  'updatedAt',
  'publishedAt',
  'title',
  'order',
  'name',
  '-createdAt',
  '-updatedAt',
  '-publishedAt',
  '-title',
  '-order',
  '-name',
]);

const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 10;

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  private rawQuery: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, rawQuery: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.rawQuery = rawQuery;
  }

  /**
   * Full-text style search using $regex on whitelisted fields only.
   * The search term is sanitized — only alphanumeric + spaces + hyphens allowed.
   */
  search(searchableFields: string[]) {
    const rawSearch = this.rawQuery['search'];
    if (typeof rawSearch === 'string' && rawSearch.trim().length > 0) {
      // Sanitize: strip anything that could be a regex injection
      const safe = rawSearch.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&').slice(0, 100);
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: safe, $options: 'i' },
        })),
      } as any);
    }
    return this;
  }

  /**
   * Explicit category filter — only allows known safe fields to be filtered.
   * NEVER passes raw req.query into MongoDB.
   */
  filterByCategory(allowedFields: string[]) {
    const filterObj: Record<string, unknown> = {};

    for (const field of allowedFields) {
      const value = this.rawQuery[field];
      if (value === undefined || value === null || value === '') continue;

      // Reject anything that looks like a MongoDB operator object
      if (typeof value === 'object') continue;

      // Only accept primitive string/number/boolean
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        filterObj[field] = value;
      }
    }

    if (Object.keys(filterObj).length > 0) {
      this.modelQuery = this.modelQuery.find(filterObj as any);
    }

    return this;
  }

  /**
   * Sort by whitelisted fields only.
   * Client can pass: sort=-createdAt,title
   * Each field is validated against the whitelist.
   */
  sort() {
    const rawSort = this.rawQuery['sort'];
    if (typeof rawSort === 'string') {
      const fields = rawSort
        .split(',')
        .map((f) => f.trim())
        .filter((f) => ALLOWED_SORT_FIELDS.has(f))
        .join(' ');

      if (fields) {
        this.modelQuery = this.modelQuery.sort(fields);
        return this;
      }
    }
    // Default sort
    this.modelQuery = this.modelQuery.sort('-order -createdAt');
    return this;
  }

  /**
   * Paginate with safe upper limit.
   */
  paginate() {
    const rawPage = this.rawQuery['page'];
    const rawLimit = this.rawQuery['limit'];

    const page = Math.max(1, parseInt(String(rawPage ?? '1'), 10) || 1);
    const limit = Math.min(
      MAX_LIMIT,
      Math.max(1, parseInt(String(rawLimit ?? DEFAULT_LIMIT), 10) || DEFAULT_LIMIT),
    );
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  /**
   * Projection: only allow safe, explicit field selections (no client-controlled exclusions).
   * Default always hides __v and passwordHash.
   */
  fields() {
    this.modelQuery = this.modelQuery.select('-__v -passwordHash');
    return this;
  }

  /**
   * Use lean() for read-heavy public queries (returns plain JS objects, faster).
   */
  lean() {
    this.modelQuery = this.modelQuery.lean() as unknown as Query<T[], T>;
    return this;
  }
}