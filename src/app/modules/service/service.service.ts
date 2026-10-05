import { Service } from './service.model.js';
import { AppError } from '../../errors/AppError.js';
import { slugify } from '../../utils/slugify.js';
import { QueryBuilder } from '../../utils/queryBuilder.js';

const createService = async (payload: any) => {
  if (!payload.slug && payload.title) {
    let baseSlug = slugify(payload.title);
    let slug = baseSlug;
    let counter = 1;
    while (await Service.exists({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    payload.slug = slug;
  }
  return await Service.create(payload);
};

const getAllServices = async (rawQuery: Record<string, unknown>, isAdmin: boolean) => {
  const statusFilter = isAdmin ? {} : { status: 'PUBLISHED' as const };
  
  const queryBuilder = new QueryBuilder(Service.find(statusFilter), rawQuery)
    .search(['title', 'tag'])
    .filterByCategory(['status'])
    .sort()
    .paginate()
    .fields();

  const services = await queryBuilder.modelQuery;
  
  const countQueryBuilder = new QueryBuilder(Service.find(statusFilter), rawQuery)
    .search(['title', 'tag'])
    .filterByCategory(['status']);
    
  const total = await countQueryBuilder.modelQuery.countDocuments();
  
  return { services, total };
};

const getSingleService = async (idOrSlug: string, isAdmin: boolean) => {
  const query = isAdmin ? { $or: [{ _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null }, { slug: idOrSlug }] } : { slug: idOrSlug, status: 'PUBLISHED' as const };
  const service = await Service.findOne(query);
  if (!service) throw new AppError(404, 'Service not found', 'SERVICE_NOT_FOUND');
  return service;
};

const updateService = async (id: string, payload: any) => {
  const service = await Service.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  if (!service) throw new AppError(404, 'Service not found', 'SERVICE_NOT_FOUND');
  return service;
};

const deleteService = async (id: string) => {
  const service = await Service.findByIdAndDelete(id);
  if (!service) throw new AppError(404, 'Service not found', 'SERVICE_NOT_FOUND');
  return service;
};

export const ServiceService = { createService, getAllServices, getSingleService, updateService, deleteService };
