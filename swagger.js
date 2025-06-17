const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Primary School ApI',
        description: 'Primary School Api'
    },
    host: 'https://primary-school-api.onrender.com',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);