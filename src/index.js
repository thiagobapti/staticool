#!/usr/bin/env node
import colors from "colors";
import config, { defaultConfig, localConfig } from "./config";
import { loadPages } from "./pages";
import { logger } from "./logger";
import watch from "./watch";
// import browserSync from "./browser-sync";

// logger.verbose("defaultConfig", defaultConfig);
// logger.verbose("localConfig", localConfig);
// logger.verbose("config", config);

console.log("🆒", " Staticool ".bgBlue, "🆒");

if (process.argv.includes("--d") || process.argv.includes("dev")) {
  logger.log(`${localConfig ? "Custom-conf" : "Zero-conf"} mode`);
  loadPages();
  // browserSync();
}
