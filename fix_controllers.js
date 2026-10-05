const fs = require('fs');

function fixController(path) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/sendResponse\(res,\s*(\d+),\s*(true|false),\s*([^,]+),\s*([^,\)]+)(?:,\s*([^)]+))?\);/g, (match, statusCode, success, message, data, meta) => {
    let obj = `{ statusCode: ${statusCode}, success: ${success}, message: ${message}, data: ${data} }`;
    if (meta && meta.trim() !== '') {
      obj = `{ statusCode: ${statusCode}, success: ${success}, message: ${message}, data: ${data}, meta: ${meta} }`;
    }
    return `sendResponse(res, ${obj});`;
  });
  fs.writeFileSync(path, content);
}

fixController('src/app/modules/job/job.controller.ts');
fixController('src/app/modules/jobApplication/jobApplication.controller.ts');
