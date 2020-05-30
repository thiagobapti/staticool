import fs from "fs";
import path from "path";
import colors from "colors";
import settings from "./settings";
import config, { defaultConfig, localConfig } from "./config";

const loadJSONPageFile = (pageFilePath) => {
  console.log("loadJSONPageFile", pageFilePath);
};

const loadJSPageFile = (pageFilePath) => {
  console.log("loadJSPageFile", pageFilePath);
};

const loadPageFile = (pageFilePath) => {
  const pageFileExtension = path.extname(pageFilePath);
  if (settings.allowedPageFileExtensions.includes(pageFileExtension)) {
    switch (pageFileExtension) {
      case ".json":
        loadJSONPageFile(pageFilePath);
        break;
      case ".js":
        loadJSPageFile(pageFilePath);
        break;
      default:
        console.log(
          `Skipping unknown page file extension ${pageFileExtension}`.yellow
        );
        break;
    }
  } else {
    console.log(
      `Skipping unknown page file extension ${pageFileExtension}.`.yellow
    );
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
    existingPageFilePaths.forEach((pageFilePath) => {
      loadPageFile(`${process.cwd()}/${pageFilePath}`);
    });
  }
};

export { loadPages };
