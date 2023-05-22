const express = require('express');
const cors = require('cors');
const swaggerJSDdocs = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const PORT = 4000;
const app = express();

app.use(cors());
app.use(express());

const opotions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Cosmo api',
            version: '1.0.0',
        },
    },
    apis: ['app.js', './router/*.js'],
};

const openapiSpec = swaggerJSDdocs(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(penapiSpec));


app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

const indexRouter = require('./Router/indexRouter.js');
app.use('/api/', indexRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
