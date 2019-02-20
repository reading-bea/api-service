const logger = require('../helpers/logger');

module.exports = (error, _, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  logger.error(error.message);
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.status(500).send(`Error: ${error.message}`);
};
