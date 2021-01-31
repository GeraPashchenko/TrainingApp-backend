const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./components/index');

dotenv.config();

const port = +process.env.SERVER_PORT || 3000;

/** App settings **/
app.use(bodyParser.json());// parse application/json
app.use(bodyParser.urlencoded({extended: false}));// parse application/x-www-form-urlencoded
app.use(cors());


/** Routs **/
app.use('/', router);

app.listen(port, async () => {
    return console.log(`Server is listening on ${port}`);
});