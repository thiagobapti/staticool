import notifier from 'node-notifier';

export const logger = {
  verboseMode: process.argv.includes("--v") || process.argv.includes("verbose"),
  log (){
    console.log.apply(this, arguments);
  },
  error() {
    logger.log.apply(this, arguments);
    // notifier.notify({
    //   title: 'Staticool',
    //   message: 'Error',
    // });
  },
  verbose() {
    if(logger.verboseMode) logger.log.apply(this, arguments);
  }
}