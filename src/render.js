import fs from "fs-extra";
import path from "path";
import colors from "colors";
import settings from "./settings";
import config, { defaultConfig, localConfig } from "./config";
import { loadPages } from "./pages";

const renderPage = (pageJSON, parentSlug) => {
  if (pageJSON.slug.substr(0, 1) !== "/") pageJSON.slug = "/" + pageJSON.slug;
  let pagePath =
    pageJSON.slug === "/"
      ? `${process.cwd()}/${config.buildDir}`
      : `${process.cwd()}/${config.buildDir}${parentSlug || ""}${
          pageJSON.slug
        }`;
  fs.ensureDirSync(pagePath);

  if (pageJSON.layout) {
    console.log(`Rendering ${parentSlug || ""}${pageJSON.slug}`);
    fs.outputFileSync(
      `${pagePath}/${config.htmlFileName}`,
      `<html><head><title>${pageJSON.title}</title></head><body></body></html>`
    );
  }

  if (pageJSON.pages && Array.isArray(pageJSON.pages)) {
    pageJSON.pages.forEach((nestedPageJSON) => {
      renderPage(
        nestedPageJSON,
        parentSlug ? parentSlug + pageJSON.slug : pageJSON.slug
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
    console.log(`Error on parsing the pagr file ${pagesFilePath}`.red, e);
  }
};

export { renderPages };
