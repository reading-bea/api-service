const express = require('express');
const app = express();

// User route
const UserController = require('./user/user-controller');
app.use('/users', UserController);

// Book route
const BookController = require('./book/book-controller');
app.use('/books', BookController);

// Not found route
const NotFoundController = require('./error/not-found-controller');
app.get('*', NotFoundController);

// Error route
const ErrorController = require('./error/error-controller');
app.use(ErrorController);

module.exports = app;
