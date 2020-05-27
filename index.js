require('./loggerConfig');

const log4js = require('log4js');
const http = require('http');
const chalk = require('chalk');
const configureExpressApp = require('./app');

const port = process.env.PORT || 8888;

const logger = log4js.getLogger('[Start up script]');

const app = configureExpressApp();

async function run() {
  const server = http.createServer(app);
  const divider = chalk.gray('-----------------------------------');

  server.listen(port, () => {
    const protocol = 'http';
    logger.info(`Localhost: ${chalk.magenta(`${protocol}://localhost:${port}`)}`);
    logger.info(`Server started with NODE_ENV=${process.env.NODE_ENV}! ${chalk.green('✓')}`);
    logger.info(divider);
  });
}

run().catch(error => {
  logger.error(error);
});
