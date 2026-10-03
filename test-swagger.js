const swaggerJsdoc = require('swagger-jsdoc');
const spec = swaggerJsdoc({
  definition: { openapi: '3.0.0', info: { title: 'DSZ API', version: '1.0.0' } },
  apis: ['./src/docs/swagger.yaml'],
});
console.log(JSON.stringify(spec.components.schemas.WorkBody, null, 2));
console.log("-----")
console.log(JSON.stringify(spec.paths['/api/v1/admin/works'].post.requestBody, null, 2));
