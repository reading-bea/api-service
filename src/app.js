const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const setupDatabase = require('./db');
const errorRoute = require('./routes/error');
const app = express();

// Configure app
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'reading-bea-service', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

setupDatabase();

// Models & routes
require('./models/users');
require('./config/passport');
// API routes
app.use(require('./routes'));
// 404 route
app.get('*', (req, res, next) => errorRoute(res, { message: `${req.path} was not found`, status: 404 }, next));
// 500 route
app.use(errorRoute);

module.exports = app;
