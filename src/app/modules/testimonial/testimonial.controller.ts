import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { TestimonialService } from './testimonial.service.js';
export const TestimonialController = {
  createTestimonial: catchAsync(async (req, res) => {
    const result = await TestimonialService.createTestimonial(req.body);
    sendResponse(res, { statusCode: 201, success: true, message: 'Testimonial created', data: result });
  }),
  getPublicTestimonials: catchAsync(async (req, res) => {
    const result = await TestimonialService.getAllTestimonials(false);
    sendResponse(res, { statusCode: 200, success: true, message: 'Testimonials fetched', data: result });
  }),
  getAdminTestimonials: catchAsync(async (req, res) => {
    const result = await TestimonialService.getAllTestimonials(true);
    sendResponse(res, { statusCode: 200, success: true, message: 'Testimonials fetched', data: result });
  }),
  updateTestimonial: catchAsync(async (req, res) => {
    const result = await TestimonialService.updateTestimonial(req.params.id, req.body);
    sendResponse(res, { statusCode: 200, success: true, message: 'Testimonial updated', data: result });
  }),
  deleteTestimonial: catchAsync(async (req, res) => {
    await TestimonialService.deleteTestimonial(req.params.id);
    sendResponse(res, { statusCode: 200, success: true, message: 'Testimonial deleted' });
  })
};