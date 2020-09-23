const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('../app/routes/routes');
const cors = require('cors')

app.use(cors({
    allowedHeaders: ['GET', 'POST', 'UPDATE', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes(app);

module.exports = app;
