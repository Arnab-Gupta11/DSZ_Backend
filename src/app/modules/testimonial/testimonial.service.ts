import { Testimonial } from './testimonial.model.js';
import { AppError } from '../../errors/AppError.js';
export const TestimonialService = {
  createTestimonial: async (payload: any) => await Testimonial.create(payload),
  getAllTestimonials: async (isAdmin: boolean) => {
    const query = isAdmin ? {} : { isActive: true };
    return await Testimonial.find(query).sort('order');
  },
  updateTestimonial: async (id: string, payload: any) => {
    const t = await Testimonial.findByIdAndUpdate(id, payload, { new: true });
    if (!t) throw new AppError(404, 'Testimonial not found', 'TESTIMONIAL_NOT_FOUND');
    return t;
  },
  deleteTestimonial: async (id: string) => {
    const t = await Testimonial.findByIdAndDelete(id);
    if (!t) throw new AppError(404, 'Testimonial not found', 'TESTIMONIAL_NOT_FOUND');
    return t;
  }
};