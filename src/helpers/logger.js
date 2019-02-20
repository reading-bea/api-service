const config = require('config');
const { createLogger, transports, format } = require('winston');
const moment = require('moment');
const environmentHelper = require('./environment-helper');

const { printf } = format;

/**
 * Setting a custom format for On Air Panel logger
 */
const oapFormat = printf(
  info => `[${moment().format('YYYY-MM-DD HH:mm:ss')}] [${process.pid}] ${info.level.toUpperCase()}: ${info.message}`
);

/**
 * @see https://github.com/winstonjs/winston/blob/3.0.0/lib/winston/logger.js#L46
 */
const logger = createLogger({
  level: config.get('logging.level'),
  format: oapFormat,
  exitOnError: false
});

/*
 * see https://github.com/winstonjs/winston-transport/blob/master/index.js
 */

if (environmentHelper.isCloudEnvironment()) {
  // see https://github.com/winstonjs/winston/blob/3.0.0/lib/winston/transports/file.js
  logger.add(new transports.File({
    filename: config.get('logging.fileName'),
    handleExceptions: true
  }));
} else {
  // see https://github.com/winstonjs/winston/blob/3.0.0/lib/winston/transports/console.js
  logger.add(new transports.Console({
    handleExceptions: true
  }));
}

module.exports = logger;
