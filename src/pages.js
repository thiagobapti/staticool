import fs from "fs";
import path from "path";
import colors from "colors";
import settings from "./settings";
import config, { defaultConfig, localConfig } from "./config";

const loadJSONPageFile = (pageFilePath) => {
  console.log("loadJSONPageFile", pageFilePath);
  const pageFileBuffer = fs.readFileSync(pageFilePath);
  if (!pageFileBuffer.toString()) {
    return false;
  } else {
    try {
      console.log(`Page file ${pageFilePath} loaded successfully`.green);
      return true;
    } catch (e) {
      console.log(`Bad page file ${pageFilePath}`.red);
      return false;
    }
  }
};

const loadJSPageFile = (pageFilePath) => {
  console.log("loadJSPageFile", pageFilePath);
  return false;
};

const loadPageFile = (pageFilePath) => {
  const pageFileExtension = path.extname(pageFilePath);
  if (settings.allowedPageFileExtensions.includes(pageFileExtension)) {
    switch (pageFileExtension) {
      case ".json":
        return loadJSONPageFile(pageFilePath);
        break;
      case ".js":
        return loadJSPageFile(pageFilePath);
        break;
      default:
        console.log(
          `Skipping unknown page file extension ${pageFileExtension}`.yellow
        );
        return false;
        break;
    }
  } else {
    console.log(
      `Skipping unknown page file extension ${pageFileExtension}.`.yellow
    );
    return false;
  }
};

const loadPages = (pages) => {
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
};

export { loadPages };
