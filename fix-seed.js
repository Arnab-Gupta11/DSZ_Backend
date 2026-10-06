const fs = require('fs');
let content = fs.readFileSync('src/scripts/seed.ts', 'utf8');

// Replace await Service.insertMany(servicesData);
content = content.replace("await Service.insertMany(servicesData);", "const createdServices = await Service.insertMany(servicesData);");

// Map worksData to include a random service from createdServices
content = content.replace("await Work.insertMany(worksData);", `const mappedWorksData = worksData.map(w => ({ ...w, service: createdServices[Math.floor(Math.random() * createdServices.length)]._id }));\n    await Work.insertMany(mappedWorksData);`);

// Remove categories from worksData
content = content.replace(/categories:\s*\[[^\]]+\]\s*,/g, '');

fs.writeFileSync('src/scripts/seed.ts', content);
