const config = require('config');
const cluster = require('cluster');
const cpuCount = require('os').cpus().length;
const app = require('./app');
const logger = require('./helpers/logger');

const port = 8080;
const isClusteringEnabled = config.get('clustering') === 'on';

const onExit = (worker, code, signal) => {
  let message;
  if (signal) {
    message = `Worker ${worker.process.pid} was killed by signal ${signal}`;
  } else if (code !== 0) {
    message = `Worker ${worker.process.pid} exited with error code ${code}`;
  } else {
    message = `Worker ${worker.process.pid} exited with no error`;
  }
  message = `${message}. Forking a new one.`;
  logger.error(message);
  app.locals.monitoring.batchMetricData('dead-workers-count', 1);
  cluster.fork();
};

const startSever = () => {
  if (isClusteringEnabled && cpuCount > 1 && cluster.isMaster) {
    logger.info('Process started');

    for (let i = 0; i < cpuCount; i++) {
      logger.info('Forking a new worker');
      cluster.fork();
    }

    // Listen for dying workers and create a new one
    cluster.on('exit', onExit);
  } else {
    app.listen(port, err => {
      if (err) {
        logger.error(err);
        return;
      }
      logger.info(`Process started listening on port ${port}`);
    });
  }
};

startSever();
