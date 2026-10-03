export interface IPaginationOptions {
  page?: number;
  limit?: number;
  sort?: string;
}
export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  error?: any;
}
export interface IErrorResponse {
  code: string;
  message: string;
  details?: any;
}