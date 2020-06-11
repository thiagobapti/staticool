#!/usr/bin/env node
import fs from "fs";
import colors from "colors";

import config, { defaultConfig, localConfig } from "./config";
import { loadPages } from "./pages";
import watch from "./watch";
// import browserSync from "./browser-sync";

console.log("config", config);
console.log("defaultConfig", defaultConfig);
console.log("localConfig", localConfig);

if (process.argv.includes("--d") || process.argv.includes("dev")) {
  localConfig
    ? console.log("Using custom config file".gray)
    : console.log("Using default config file".gray);
  loadPages();
  // browserSync();
}
