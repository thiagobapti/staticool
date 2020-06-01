import fs from "fs";
import path from "path";
import colors from "colors";
import settings from "./settings";
import config, { defaultConfig, localConfig } from "./config";

const renderPages = (pagesFileBuffer, pagesFilePath) => {
  let pagesJSON;
  try {
    pagesJSON = JSON.parse(pagesFileBuffer);
  } catch (e) {
    console.log(`Error on parsing the page file ${pagesFilePath}`.red);
  }
};

export { renderPages };
