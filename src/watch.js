import chokidar from "chokidar";
import regexParser from "regex-parser";
import config from "./config";

const watcher =  {
  instance: null,
  get() {
    return !watcher.instance ?  watcher.init() : this.instance;
  },
  validateWatcherIgnore(basePath, watcherIgnore) {
    try {
      return new RegExp(regexParser(
        basePath + watcherIgnore
        ));
    } catch(e) {
      console.log('Invalid watcherIgnore'.red, watcherIgnore)
      throw e;
    }
  },
  init() {
    const ignoreRegex = watcher.validateWatcherIgnore(process.cwd(), config.watcherIgnore);

    return watcher.instance = chokidar
      .watch(process.cwd(), {
        ignoreInitial: true,
        ignored: ignoreRegex,
      })
      .on("all", (event, path) => {
        console.log(event, path);
      });
    },
};

export default watcher;