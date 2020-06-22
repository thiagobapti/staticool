import fs from 'fs-extra';
import path from 'path';
import colors from 'colors';
import settings from './settings';
import config, { localConfig } from './config';
import { renderPages } from './render';
import watcher from './watch';
import logger from './logger';
import DOC_URLS from './constants/doc-urls';

const loadJSONPageFile = (pageFilePath) => {
  logger.verbose('loadJSONPageFile', pageFilePath);
  const pageFileBuffer = fs.readFileSync(pageFilePath);
  if (!pageFileBuffer.toString()) {
    return false;
  }
  try {
    logger.verbose(`Page file ${pageFilePath} loaded successfully`.green);
    renderPages(pageFileBuffer, pageFilePath);
    return true;
  } catch (e) {
    logger.error(`Bad page file ${pageFilePath}`.red);
    return false;
  }
};

// eslint-disable-next-line no-unused-vars
const loadJSPageFile = (pageFilePath) => {
  // TODO
};

const loadPageFile = (pageFilePath) => {
  const pageFileExtension = path.extname(pageFilePath);
  if (settings.allowedPageFileExtensions.includes(pageFileExtension)) {
    switch (pageFileExtension) {
      case '.json':
        return loadJSONPageFile(pageFilePath);
      case '.js':
        return loadJSPageFile(pageFilePath);
      default:
        logger.warn(
          `Skipping unknown page file extension ${pageFileExtension}`.yellow,
          DOC_URLS.PAGE_FILES,
        );
        return false;
    }
  } else {
    logger.warn(
      `Skipping unknown page file extension ${pageFileExtension}`.yellow,
      DOC_URLS.PAGE_FILES,
    );
    return false;
  }
};

// eslint-disable-next-line no-unused-vars
const loadPages = (pages) => {
  logger.verbose('Load pages');
  fs.emptyDirSync(`${process.cwd()}/${settings.buildDir}`);
  if (!Array.isArray(config.pageFiles) || !config.pageFiles.length) {
    logger.error('No page files provided'.red);
    process.exit();
  }

  const existingPageFilePaths = config.pageFiles.filter((pageFile) => {
    const pageFilePath = `${process.cwd()}/${pageFile}`;
    return fs.existsSync(pageFilePath);
  });

  if (!existingPageFilePaths.length) {
    if (localConfig && localConfig.pageFiles) {
      logger.error('Page files not found'.red, colors.red(localConfig.pageFiles));
      process.exit();
    } else {
      loadPageFile(`${__dirname}/${settings.defaultPageFilePath}`);
    }
  } else {
    const validpageFileExtensions = existingPageFilePaths.filter((pageFilePath) =>
      loadPageFile(`${process.cwd()}/${pageFilePath}`),
    );

    if (!validpageFileExtensions.length) {
      logger.error('No valid page files'.red);
      process.exit();
    }
  }

  watcher();
  watcher();
  watcher();

  // browserSync.reload();
};

export { loadPages };
