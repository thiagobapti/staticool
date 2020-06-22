/* eslint-disable prefer-rest-params */
/* eslint-disable no-console */
const logger = {
  verboseMode: process.argv.includes('--v') || process.argv.includes('verbose'),
  log() {
    console.log.apply(this, arguments);
  },
  error(message, url) {
    console.error.apply(this, [
      ` 🥵 ${message.red}`,
      ...(url ? [`(See more at ${url})`.yellow] : []),
    ]);
  },
  warn(message, url) {
    console.log.apply(this, [
      ` ⚠️ ${message.orange}`,
      ...(url ? [`(See more at ${url})`.yellow] : []),
    ]);
  },
  verbose() {
    if (logger.verboseMode) logger.log.apply(this, arguments);
  },
};

export default logger;
