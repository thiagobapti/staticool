export const logger = {
  verboseMode: process.argv.includes("--v") || process.argv.includes("verbose"),
  log (){
    console.log.apply(this, arguments);
  },
  error(message, url) {
    console.error.apply(this, [` 🥵 ${message.red}`, ...(url ? [`(See more at ${url})`.yellow] : [])]);
  },
  verbose() {
    if(logger.verboseMode) logger.log.apply(this, arguments);
  }
}