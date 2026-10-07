import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes.js';
import { WorkRoutes } from '../modules/work/work.routes.js';
import { ArticleRoutes } from '../modules/article/article.routes.js';
import { ServiceRoutes } from '../modules/service/service.routes.js';
import { TestimonialRoutes } from '../modules/testimonial/testimonial.routes.js';
import { ContactRoutes } from '../modules/contact/contact.routes.js';
import { SettingsRoutes } from '../modules/settings/settings.routes.js';
import { MediaRoutes } from '../modules/media/media.routes.js';
import { JobRoutes } from '../modules/job/job.routes.js';
import { JobApplicationRoutes } from '../modules/jobApplication/jobApplication.routes.js';
import { AdminManagementRoutes } from '../modules/adminManagement/adminManagement.routes.js';

const router = Router();

const moduleRoutes = [
  { path: '/auth', route: AuthRoutes },
  { path: '/works', route: WorkRoutes.publicRouter },
  { path: '/admin/works', route: WorkRoutes.adminRouter },
  { path: '/articles', route: ArticleRoutes.publicRouter },
  { path: '/admin/articles', route: ArticleRoutes.adminRouter },
  { path: '/services', route: ServiceRoutes.publicRouter },
  { path: '/admin/services', route: ServiceRoutes.adminRouter },
  { path: '/testimonials', route: TestimonialRoutes.publicRouter },
  { path: '/admin/testimonials', route: TestimonialRoutes.adminRouter },
  { path: '/contact', route: ContactRoutes.publicRouter },
  { path: '/admin/contacts', route: ContactRoutes.adminRouter },
  { path: '/settings', route: SettingsRoutes.publicRouter },
  { path: '/admin/settings', route: SettingsRoutes.adminRouter },
  { path: '/admin/media', route: MediaRoutes.adminRouter },
  { path: '/jobs', route: JobRoutes.publicRouter },
  { path: '/admin/jobs', route: JobRoutes.adminRouter },
  { path: '/jobs', route: JobApplicationRoutes.publicRouter },
  { path: '/admin/job-applications', route: JobApplicationRoutes.adminRouter },
  { path: '/admin/admins', route: AdminManagementRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
