const fs = require('fs');

const yamlContent = fs.readFileSync('src/docs/swagger.yaml', 'utf8');

// I will just use sed or directly write the yaml file since it's easy.
