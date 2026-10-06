const fs = require('fs');
let content = fs.readFileSync('src/app/modules/work/work.service.ts', 'utf8');

// fix getAllWorks
content = content.replace("Work.find(statusFilter)", "Work.find(statusFilter).populate('service')");
content = content.replace(".filterByCategory(['status', 'categories'])", ".filterByCategory(['status', 'service'])");

// fix getWorkBySlug
content = content.replace("Work.findOne({ slug, status: 'PUBLISHED' }).lean()", "Work.findOne({ slug, status: 'PUBLISHED' }).populate('service').lean()");

// fix getWorkById
content = content.replace("Work.findById(id).lean()", "Work.findById(id).populate('service').lean()");

fs.writeFileSync('src/app/modules/work/work.service.ts', content);
