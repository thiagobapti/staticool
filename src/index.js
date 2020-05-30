#!/usr/bin/env node
import colors from "colors";
import config from "./config";

if (process.argv.includes("-d") || process.argv.includes("dev")) {
  if (config._custom) console.log("Using custom config file".yellow);
  else console.log("Using default config file".yellow);

  console.log("config:", config);
}
