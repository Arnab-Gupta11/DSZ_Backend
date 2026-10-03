const MAX_LIMIT = 100;

/**
 * Extracts and validates pagination params from query string.
 * Matches the caps used in QueryBuilder to ensure consistency.
 */
export const calculatePagination = (query: Record<string, unknown>) => {
  const page = Math.max(1, parseInt(String(query.page ?? '1'), 10) || 1);
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(1, parseInt(String(query.limit ?? '10'), 10) || 10),
  );
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};