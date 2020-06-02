import fs from "fs-extra";
import path from "path";
import colors from "colors";
import settings from "./settings";
import config, { defaultConfig, localConfig } from "./config";
import { renderPages } from "./render";
import browserSync from "./browser-sync";

const loadJSONPageFile = (pageFilePath) => {
  console.log("loadJSONPageFile", pageFilePath);
  const pageFileBuffer = fs.readFileSync(pageFilePath);
  if (!pageFileBuffer.toString()) {
    return false;
  } else {
    try {
      console.log(`Page file ${pageFilePath} loaded successfully`.green);
      renderPages(pageFileBuffer, pageFilePath);
      return true;
    } catch (e) {
      console.log(`Bad page file ${pageFilePath}`.red);
      return false;
    }
  }
};

const loadJSPageFile = (pageFilePath) => {
  // TODO
};

const loadPageFile = (pageFilePath) => {
  const pageFileExtension = path.extname(pageFilePath);
  if (settings.allowedPageFileExtensions.includes(pageFileExtension)) {
    switch (pageFileExtension) {
      case ".json":
        return loadJSONPageFile(pageFilePath);
      case ".js":
        return loadJSPageFile(pageFilePath);
      default:
        console.log(
          `Skipping unknown page file extension ${pageFileExtension}`.yellow
        );
        return false;
    }
  } else {
    console.log(
      `Skipping unknown page file extension ${pageFileExtension}`.yellow
    );
    return false;
  }
};

const loadPages = (pages) => {
  console.log("Load pages");
  fs.emptyDirSync(`${process.cwd()}/${settings.buildDir}`);
  if (!Array.isArray(config.pageFiles) || !config.pageFiles.length) {
    console.log("No page files provided".red);
    process.exit();
  }

  const existingPageFilePaths = config.pageFiles.filter((pageFile) => {
    const pageFilePath = `${process.cwd()}/${pageFile}`;
    return fs.existsSync(pageFilePath);
  });

  if (!existingPageFilePaths.length) {
    if (localConfig && localConfig.pageFiles) {
      console.log(
        "Page files not found".red,
        colors.red(localConfig.pageFiles)
      );
      process.exit();
    } else {
      loadPageFile(`${__dirname}/${settings.defaultPageFilePath}`);
    }
  } else {
    const validpageFileExtensions = existingPageFilePaths.filter(
      (pageFilePath) => {
        return loadPageFile(`${process.cwd()}/${pageFilePath}`);
      }
    );

    if (!validpageFileExtensions.length) {
      console.log("No valid page files".red);
      process.exit();
    }
  }

  // browserSync.reload();
};

export { loadPages };
