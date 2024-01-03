const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerSpec = swaggerJsDoc({
  swaggerDefinition: {

  },
  apis: [
    path.resolve(__dirname, '../routes/*.js'),
  ],
});

module.exports = {
  swaggerSpec,
};
