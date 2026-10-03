import { Service } from './service.model.js';
import { AppError } from '../../errors/AppError.js';

const createService = async (payload: any) => await Service.create(payload);
const getAllServices = async (isAdmin: boolean) => {
  const query = isAdmin ? {} : { status: 'PUBLISHED' as const };
  return await Service.find(query).sort('order');
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