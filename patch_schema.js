const fs = require('fs');
let yaml = fs.readFileSync('src/docs/swagger.yaml', 'utf8');

const jobBodySchema = `
    JobBody:
      type: object
      example:
        title: "Frontend Engineer"
        department: "Development"
        type: "Full-time"
        location: "Remote"
        city: "Dhaka"
        experience: "2+ Years"
        salary: "Competitive"
        postedAt: "2024-03-10T10:00:00.000Z"
        deadline: "2024-04-10T10:00:00.000Z"
        short: "Join our team to build next-gen web apps."
        overview: "Detailed overview here..."
        responsibilities: ["Develop UI", "Integrate APIs"]
        requirements: ["React", "TypeScript"]
        niceToHave: ["Next.js"]
        tools: ["VS Code", "Git"]
        benefits: ["Remote Work", "Health Insurance"]
        status: "PUBLISHED"
      properties:
        title: { type: string }
        department: { type: string, enum: [Development, Design, Marketing, Video, Operations] }
        type: { type: string, enum: [Full-time, Part-time, Internship, Contract] }
        location: { type: string, enum: [On-site, Remote, Hybrid] }
        city: { type: string }
        experience: { type: string }
        salary: { type: string }
        postedAt: { type: string, format: date-time }
        deadline: { type: string, format: date-time }
        short: { type: string }
        overview: { type: string }
        responsibilities: { type: array, items: { type: string } }
        requirements: { type: array, items: { type: string } }
        niceToHave: { type: array, items: { type: string } }
        tools: { type: array, items: { type: string } }
        benefits: { type: array, items: { type: string } }
        status: { type: string, enum: [DRAFT, PUBLISHED, ARCHIVED] }
`;

yaml = yaml.replace('  parameters:', jobBodySchema + '\n  parameters:');
fs.writeFileSync('src/docs/swagger.yaml', yaml);
