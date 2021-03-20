const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
global.__appRoot = path.resolve(__dirname);

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./components/index');
const passport = require('./middlewares/auth');
const port = +process.env.SERVER_PORT || 3000;

/** Swagger Doc settings **/
const options = require('./swaggerOptions.js');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerSpec = swaggerJSDoc(options);
const swaggerUi = require('swagger-ui-express');

/** App settings **/
app.use(bodyParser.json());// parse application/json
app.use(bodyParser.urlencoded({extended: false}));// parse application/x-www-form-urlencoded
app.use(cors());
app.use(
    '/api/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);


/** Routs **/
app.use('/', router);

app.listen(port, async () => {
    return console.log(`Server is listening on ${port}`);
});