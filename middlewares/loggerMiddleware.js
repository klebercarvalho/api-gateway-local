const log4js = require('log4js');

const logger = log4js.getLogger('[Express Logger]');

module.exports = () =>
  log4js.connectLogger(logger, {
    level: 'auto',
    format: (req, res, format) => {
      const formatString = `{"remote-addr": ":remote-addr", "remote-user": ":remote-user", "timestamp": "[:date[clf]]", "http-method": ":method", "url": ":url", "http-version": "HTTP/:http-version", "status": ":status", "content-length": ":content-length", "referrer": ":referrer", "user-agent": ":user-agent", "response-time": ":response-time ms"}`;
      return format(formatString);
    }
  });
