const fs = require('fs');

let content = fs.readFileSync('src/app/routes/index.ts', 'utf8');

if (!content.includes('JobRoutes')) {
  content = content.replace(
    "import { MediaRoutes } from '../modules/media/media.routes.js';",
    "import { MediaRoutes } from '../modules/media/media.routes.js';\nimport { JobRoutes } from '../modules/job/job.routes.js';\nimport { JobApplicationRoutes } from '../modules/jobApplication/jobApplication.routes.js';"
  );

  content = content.replace(
    "{ path: '/admin/media', route: MediaRoutes.adminRouter },",
    "{ path: '/admin/media', route: MediaRoutes.adminRouter },\n  { path: '/jobs', route: JobRoutes.publicRouter },\n  { path: '/admin/jobs', route: JobRoutes.adminRouter },\n  { path: '/jobs', route: JobApplicationRoutes.publicRouter },\n  { path: '/admin/job-applications', route: JobApplicationRoutes.adminRouter },"
  );

  fs.writeFileSync('src/app/routes/index.ts', content);
}
