import chokidar from 'chokidar';
import regexParser from 'regex-parser';
import config from './config';
import logger from './logger';

let instance;

const watcher = () => {
  const validateWatcherIgnore = (basePath, watcherIgnore) => {
    try {
      return new RegExp(regexParser(basePath + watcherIgnore));
    } catch (e) {
      logger.error('Invalid watcherIgnore'.red, watcherIgnore);
      throw e;
    }
  };

  if (instance) return instance;

  const ignoreRegex = validateWatcherIgnore(process.cwd(), config.watcherIgnore);

  instance = chokidar
    .watch(process.cwd(), {
      ignoreInitial: true,
      ignored: ignoreRegex,
    })
    .on('all', (event, path) => {
      logger.log(event, path);
    });

  return instance;
};

export default watcher;
