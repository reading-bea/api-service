const logger = require('../helpers/logger');
const error = require('../models/error');

module.exports = (res, err, next) => {
  console.log('------- err -------');
  console.log(err);
  if (res.headersSent) {
    return next(err);
  }

  logger.error(err);

  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.status(err.status || 500);
  res.json(error(err.message));
};
