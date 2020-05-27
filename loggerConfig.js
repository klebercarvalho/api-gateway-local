const log4js = require('log4js');

const logLevel = process.env.LOG_LEVEL || 'debug';

// only use newRelic appender in production mode
if (['development', 'qa', 'integration', 'production'].includes(process.env.NODE_ENV)) {
  log4js.configure({
    appenders: {
      newrelicAppender: { type: 'newrelicAppender' }
    },
    categories: {
      default: { appenders: ['newrelicAppender'], level: logLevel }
    }
  });
} else {
  log4js.configure({
    appenders: {
      log: { type: 'stdout' }
    },
    categories: {
      default: { appenders: ['log'], level: logLevel }
    }
  });
}
