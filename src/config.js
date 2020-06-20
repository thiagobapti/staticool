//TODO Rewrite the config module as Singleton
import fs from "fs";
import { settings } from "./settings";
import { DOC_URLS } from "./constants/doc-urls";
import { logger } from "./logger"

const defaultConfig = (() => {
  try {
    return JSON.parse(
      fs.readFileSync(`${__dirname}/${settings.defaultConfigFilePath}`)
    );
  } catch (e) {
    logger.error("Bad default config file", DOC_URLS.DEFAULT_CONFIG_FILE);
    throw e;
  }
})();

const localConfig = (() => {
  const localConfigFilePath = `${process.cwd()}/${
    settings.defaultConfigFilePath
  }`;

  if (fs.existsSync(localConfigFilePath)) {
    const localConfigBuffer = fs.readFileSync(localConfigFilePath);
    if (!localConfigBuffer.toString()) {
      return null;
    } else {
      try {
        return JSON.parse(localConfigBuffer);
      } catch (e) {
        console.log("Bad local config file".red);
        throw e;
      }
    }
  } else {
    return null;
  }
})();

const config = (() => {
  return localConfig ? { ...defaultConfig, ...localConfig } : defaultConfig;
})();

export { config as default, defaultConfig, localConfig };
  