import fs from "fs";
import colors from "colors";
import settings from "./settings";
import config, { defaultConfig, localConfig } from "./config";

const loadPageFile = (pageFilePath) => {
  console.log("loadPageFile", pageFilePath);
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
