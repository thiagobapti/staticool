import fs from 'fs-extra';
import config from './config';
import logger from './logger';

const renderPage = (pageJSON, parentSlug) => {
  // eslint-disable-next-line no-param-reassign
  if (pageJSON.slug.substr(0, 1) !== '/') pageJSON.slug = `/${pageJSON.slug}`;
  const pagePath =
    pageJSON.slug === '/'
      ? `${process.cwd()}/${config.buildDir}`
      : `${process.cwd()}/${config.buildDir}${parentSlug || ''}${
          pageJSON.slug
        }`;
  fs.ensureDirSync(pagePath);

  if (pageJSON.layout) {
    logger.log(`Rendering ${parentSlug || ''}${pageJSON.slug}`);
    fs.outputFileSync(
      `${pagePath}/${config.htmlFileName}`,
      `<html><head><title>${pageJSON.title}</title></head><body></body></html>`,
    );
  }

  if (pageJSON.pages && Array.isArray(pageJSON.pages)) {
    pageJSON.pages.forEach((nestedPageJSON) => {
      renderPage(
        nestedPageJSON,
        parentSlug ? parentSlug + pageJSON.slug : pageJSON.slug,
      );
    });
  }
};

const renderPages = (pagesFileBuffer, pagesFilePath) => {
  try {
    const pagesJSON = JSON.parse(pagesFileBuffer);
    pagesJSON.forEach((pageJSON) => {
      renderPage(pageJSON);
    });
  } catch (e) {
    logger.error(`Error on parsing the page file ${pagesFilePath}`.red, e);
  }
};

export { renderPages, renderPages as other };
