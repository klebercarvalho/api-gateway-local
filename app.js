const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const log4js = require('log4js');
const compression = require('compression');
const httpProxy = require('express-http-proxy');
const url = require('url');

const logger = log4js.getLogger('[App]');
const loggerMiddleware = require('./middlewares/loggerMiddleware');

function configureExpressApp() {
  logger.trace('Starting to configure Express App');

  const app = express();

  const portalServiceProxy = httpProxy('http://localhost:7070');
  const eventLogServiceProxy = httpProxy('http://localhost:7072', {
    forwardPath: req => {
      return url.parse(req.url).path.replace('/activity-logs', '');
    }
  });

  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json({ limit: '35mb', extended: true }));
  app.use(bodyParser.urlencoded({ limit: '35mb', extended: true }));
  app.use(loggerMiddleware());
  app.use(cookieParser());

  // Proxy requests

  app.all(['/activity-logs/*'], (req, res, next) => {
    logger.info('Calling logs service');
    eventLogServiceProxy(req, res, next);
  });

  app.all(['*'], (req, res, next) => {
    logger.info('Calling portal service');
    portalServiceProxy(req, res, next);
  });

  app.use(errors());

  return app;
}

module.exports = configureExpressApp;
